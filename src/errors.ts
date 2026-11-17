// Wrong use of the program (a missing directory variable, an unknown or broken project): main answers with exit code 2.
export class UsageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UsageError";
  }
}

// A failure of the infrastructure (a build that did not install, a runner that did not start): the night posts it and
// exits with 3. `log` is a log file with the details, `what` the headline of the post.
export class InfraError extends Error {
  log: string | undefined;
  what: string;
  constructor(message: string, log?: string, what?: string) {
    super(message);
    this.name = "InfraError";
    this.log = log;
    this.what = what || "infrastructure failure";
  }
}
