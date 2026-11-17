import * as fs from "node:fs";
import * as path from "node:path";
import { UsageError, InfraError } from "../errors.ts";

export interface SendOptions {
  webhook?: string;
  envName: string;
  dry: boolean;
  fetch?: typeof fetch;
  sleep?: (ms: number) => Promise<void>;
  tryMs?: number;
  log?: (line: string) => void;
  summary?: string;
}

const TRIES = 4;

// Replaces the webhook URL, and its path after /webhooks/ (the id and the token), with <webhook>.
export function scrub(text: string, webhook: string): string {
  if (!webhook) return text;
  let res = text.split(webhook).join("<webhook>");
  const i = webhook.indexOf("/webhooks/");
  if (i >= 0) {
    const tail = webhook.substring(i + "/webhooks/".length).split("?")[0];
    if (tail) res = res.split(tail).join("<webhook>");
    const token = tail.split("/").pop();
    if (token && token !== tail) res = res.split(token).join("<webhook>");
  }
  return res;
}

function messageOf(e: unknown): string {
  const err = e as { message?: string, cause?: { message?: string } };
  return String((err && err.message) || e) + (err && err.cause && err.cause.message ? ": " + err.cause.message : "");
}

function isRegular(file: string): boolean {
  try {
    return fs.lstatSync(file).isFile();
  } catch(e) {
    return false;
  }
}

function readRegular(dir: string, name: string): Buffer {
  const file = path.join(dir, name);
  if (!isRegular(file)) throw new InfraError("bad outbox file: " + name);
  return fs.readFileSync(file);
}

// Posts a Discord outbox (payload.json, files.txt, the files) to the webhook with fetch: up to 4 tries, a wait on HTTP
// 429, a 5-minute limit per try. The webhook never reaches a log line, an error message or a file. A dry run posts
// nothing and prints the payload instead.
export async function sendOutbox(dir: string, o: SendOptions): Promise<void> {
  const log = o.log || ((line: string): void => { console.log(line); });
  const names = readRegular(dir, "files.txt").toString("utf8").split(/\r?\n/).filter((s: string) => !!s);
  for (const name of names) {
    if (name !== path.basename(name) || name.startsWith(".") || !isRegular(path.join(dir, name))) {
      throw new InfraError("bad attachment name: " + JSON.stringify(name).substring(0, 100));
    }
  }
  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(readRegular(dir, "payload.json").toString("utf8")) as Record<string, unknown>;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
  } catch(e) {
    throw new InfraError("bad payload.json: " + messageOf(e));
  }
  parsed.allowed_mentions = { parse: [] };
  const payloadText = JSON.stringify(parsed);
  if (o.dry) {
    log("dry post: " + names.length + " files: " + names.join(", "));
    const shown = JSON.stringify(parsed, null, 2);
    log(shown);
    if (o.summary) fs.appendFileSync(o.summary, "### Dry post\n\n```json\n" + shown + "\n```\n");
    return;
  }
  const webhook = (o.webhook || "").trim();
  if (!webhook) throw new UsageError(o.envName + " is not set");
  const doFetch = o.fetch || fetch;
  const sleep = o.sleep || ((ms: number): Promise<void> => new Promise<void>((r: () => void) => setTimeout(r, ms)));
  const url = webhook + (webhook.includes("?") ? "&" : "?") + "wait=true";
  for (let attempt = 1; attempt <= TRIES; attempt++) {
    const form = new FormData();
    form.append("payload_json", payloadText);
    for (let i = 0; i < names.length; i++) form.append("files[" + i + "]", new Blob([fs.readFileSync(path.join(dir, names[i]))]), names[i]);
    let res: Response;
    try {
      res = await doFetch(url, { method: "POST", body: form, signal: AbortSignal.timeout(o.tryMs || 300000) });
    } catch(e) {
      throw new InfraError("posting failed: " + scrub(messageOf(e), webhook));
    }
    const body = await res.text().catch(() => "");
    if (res.ok) {
      log("posted: HTTP " + res.status);
      return;
    }
    const failure = new InfraError("posting failed: HTTP " + res.status + ": " + scrub(body, webhook).substring(0, 500));
    if (res.status !== 429 || attempt === TRIES) throw failure;
    await sleep(((parseInt(res.headers.get("retry-after") || "", 10) || 5) + 1) * 1000);
  }
  throw new InfraError("posting failed");
}
