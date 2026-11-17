import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from "vitest";
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { AddressInfo } from "node:net";
import { sendOutbox, scrub } from "../../src/gh/send.ts";

interface Req { method: string, url: string, headers: http.IncomingHttpHeaders, body: Buffer }
type Answer = [number, Record<string, string>, string?];

const hook = (port: number): string => "http://127.0.0.1:" + port + "/api/webhooks/1/SECRETTOKEN";
const payload = { content: "📊 nightly", embeds: [], allowed_mentions: { parse: [] }, attachments: [{ id: 0, filename: "overview.png" }, { id: 1, filename: "core.md" }] };

let server: http.Server;
let port = 0;
let reqs: Req[] = [];
let answers: Answer[] = [];
let tmp = "";
let outbox = "";
let summaryFile = "";

const read = (f: string): string => (fs.existsSync(f) ? fs.readFileSync(f, "utf8") : "");
const readAll = (d: string): string => fs.readdirSync(d).map((f: string) => fs.readFileSync(path.join(d, f)).toString("latin1")).join("\n");

beforeAll(async () => {
  server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => {
      reqs.push({ method: req.method || "", url: req.url || "", headers: req.headers, body: Buffer.concat(chunks) });
      const a: Answer = answers.shift() || [200, {}, "{}"];
      res.writeHead(a[0], a[1]);
      res.end(a[2] === undefined ? "{}" : a[2]);
    });
  });
  await new Promise<void>((r: () => void) => server.listen(0, "127.0.0.1", r));
  port = (server.address() as AddressInfo).port;
});
afterAll(async () => {
  await new Promise<void>((r: () => void) => server.close(() => r()));
});
beforeEach(() => {
  reqs = [];
  answers = [];
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), "send-"));
  outbox = path.join(tmp, "outbox");
  fs.mkdirSync(outbox);
  fs.writeFileSync(path.join(outbox, "payload.json"), JSON.stringify(payload, null, 2) + "\n");
  fs.writeFileSync(path.join(outbox, "files.txt"), "overview.png\ncore.md\n");
  fs.writeFileSync(path.join(outbox, "overview.png"), Buffer.from([137, 80, 78, 71]));
  fs.writeFileSync(path.join(outbox, "core.md"), "# core");
  summaryFile = path.join(tmp, "summary.md");
});
afterEach(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe("sendOutbox", () => {
  test("posts payload_json and files[i] as multipart to ?wait=true", async () => {
    await sendOutbox(outbox, { webhook: hook(port), envName: "PERF_DISCORD_WEBHOOK", dry: false });
    expect(reqs[0].method).toBe("POST");
    expect(reqs[0].url).toBe("/api/webhooks/1/SECRETTOKEN?wait=true");
    const fd = await new Response(reqs[0].body, { headers: { "content-type": reqs[0].headers["content-type"] as string } }).formData();
    expect(typeof fd.get("payload_json")).toBe("string");
    expect(JSON.parse(fd.get("payload_json") as string)).toEqual(payload);
    const raw = reqs[0].body.toString("latin1");
    const part = raw.split("\r\n").find((l: string) => l.includes('name="payload_json"')) as string;
    expect(part).toContain("Content-Disposition: form-data");
    expect(part).not.toContain("filename=");
    expect((fd.get("files[0]") as File).name).toBe("overview.png");
    expect(Buffer.from(await (fd.get("files[1]") as File).arrayBuffer()).toString()).toBe("# core");
  });

  test("429: waits Retry-After + 1 s, at most 4 tries", async () => {
    answers = [[429, { "retry-after": "2" }], [429, { "retry-after": "x" }], [200, {}]];
    const slept: number[] = [];
    await sendOutbox(outbox, { webhook: hook(port), envName: "E", dry: false, sleep: async (ms: number) => { slept.push(ms); } });
    expect(slept).toEqual([3000, 6000]);
    answers = [[429, {}], [429, {}], [429, {}], [429, {}], [200, {}]];
    await expect(sendOutbox(outbox, { webhook: hook(port), envName: "E", dry: false, sleep: async () => {} })).rejects.toThrow("posting failed: HTTP 429");
    expect(reqs.length).toBe(4 + 3);
  });

  test("another error ends the tries", async () => {
    answers = [[404, {}, '{"message": "Unknown Webhook"}']];
    await expect(sendOutbox(outbox, { webhook: hook(port), envName: "E", dry: false })).rejects.toThrow('posting failed: HTTP 404: {"message": "Unknown Webhook"}');
    expect(reqs.length).toBe(1);
  });

  test("the webhook reaches no output, no error and no file", async () => {
    const lines: string[] = [];
    const errs: string[] = [];
    for (const w of [hook(port), "http://127.0.0.1:1/api/webhooks/1/SECRETTOKEN"]) {
      answers = [[500, {}, "oops"]];
      try { await sendOutbox(outbox, { webhook: w, envName: "E", dry: false, log: (l: string) => lines.push(l), summary: summaryFile }); } catch(e) { errs.push(String((e as Error).message)); }
    }
    expect(errs.length).toBe(2);
    expect(lines.concat(errs).join("\n") + read(summaryFile) + readAll(outbox)).not.toContain("SECRETTOKEN");
    expect(scrub("x http://h/api/webhooks/1/SECRETTOKEN?wait=true y", "http://h/api/webhooks/1/SECRETTOKEN")).toBe("x <webhook>?wait=true y");
  });

  test("an error body that echoes the webhook is scrubbed", async () => {
    answers = [[400, {}, "bad " + hook(port)]];
    await expect(sendOutbox(outbox, { webhook: hook(port), envName: "E", dry: false })).rejects.toThrow("posting failed: HTTP 400: bad <webhook>");
  });

  test("a missing or empty webhook", async () => {
    await expect(sendOutbox(outbox, { envName: "PERF_DISCORD_WEBHOOK", dry: false })).rejects.toThrow("PERF_DISCORD_WEBHOOK is not set");
    await expect(sendOutbox(outbox, { webhook: "", envName: "PERF_DISCORD_WEBHOOK", dry: false })).rejects.toThrow("PERF_DISCORD_WEBHOOK is not set");
  });

  test("an attachment name outside the outbox or a symlink is refused before any request, dry runs too", async () => {
    for (const bad of ["../../../../proc/self/environ", "/etc/passwd", ".hidden", "sub/x"]) {
      fs.writeFileSync(path.join(outbox, "files.txt"), "overview.png\n" + bad + "\n");
      await expect(sendOutbox(outbox, { webhook: hook(port), envName: "E", dry: false })).rejects.toThrow("bad attachment name: ");
      await expect(sendOutbox(outbox, { envName: "E", dry: true, log: () => {} })).rejects.toThrow("bad attachment name: ");
    }
    fs.writeFileSync(path.join(tmp, "secret.txt"), "s");
    fs.symlinkSync(path.join(tmp, "secret.txt"), path.join(outbox, "link.txt"));
    fs.writeFileSync(path.join(outbox, "files.txt"), "link.txt\n");
    await expect(sendOutbox(outbox, { webhook: hook(port), envName: "E", dry: false })).rejects.toThrow('bad attachment name: "link.txt"');
    fs.writeFileSync(path.join(outbox, "files.txt"), "missing.png\n");
    await expect(sendOutbox(outbox, { webhook: hook(port), envName: "E", dry: false })).rejects.toThrow("bad attachment name");
    expect(reqs.length).toBe(0);
  });

  test("a symlinked payload.json or files.txt is refused; an unparsable payload is an infra error", async () => {
    fs.writeFileSync(path.join(tmp, "p.json"), "{}");
    fs.rmSync(path.join(outbox, "payload.json"));
    fs.symlinkSync(path.join(tmp, "p.json"), path.join(outbox, "payload.json"));
    await expect(sendOutbox(outbox, { webhook: hook(port), envName: "E", dry: false })).rejects.toThrow("bad outbox file: payload.json");
    fs.rmSync(path.join(outbox, "payload.json"));
    fs.writeFileSync(path.join(outbox, "payload.json"), "{ nope");
    await expect(sendOutbox(outbox, { webhook: hook(port), envName: "E", dry: false })).rejects.toThrow("bad payload.json");
    expect(reqs.length).toBe(0);
  });

  test("allowed_mentions is forced to parse nothing", async () => {
    fs.writeFileSync(path.join(outbox, "payload.json"), JSON.stringify({ ...payload, allowed_mentions: { parse: ["everyone"] } }));
    await sendOutbox(outbox, { webhook: hook(port), envName: "E", dry: false });
    const fd = await new Response(reqs[0].body, { headers: { "content-type": reqs[0].headers["content-type"] as string } }).formData();
    expect(JSON.parse(fd.get("payload_json") as string).allowed_mentions).toEqual({ parse: [] });
  });

  test("a whitespace-only webhook counts as not set; a padded one is trimmed", async () => {
    await expect(sendOutbox(outbox, { webhook: "  \n", envName: "PERF_DISCORD_WEBHOOK", dry: false })).rejects.toThrow("PERF_DISCORD_WEBHOOK is not set");
    await sendOutbox(outbox, { webhook: hook(port) + "\n", envName: "E", dry: false });
    expect(reqs[0].url).toBe("/api/webhooks/1/SECRETTOKEN?wait=true");
  });

  test("dry: no request; the payload goes to the log and the step summary", async () => {
    const lines: string[] = [];
    await sendOutbox(outbox, { envName: "E", dry: true, log: (l: string) => lines.push(l), summary: summaryFile });
    expect(reqs.length).toBe(0);
    expect(lines.join("\n")).toContain("dry post: 2 files: overview.png, core.md");
    expect(read(summaryFile)).toContain("### Dry post");
    expect(read(summaryFile)).toContain('"content": "📊 nightly"');
  });
});
