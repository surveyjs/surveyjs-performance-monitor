// Wrong use of the program (a missing option, an unknown or broken project): main answers with exit code 2.
export class UsageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UsageError";
  }
}

// A failure of the infrastructure (a build that did not install, a runner that did not start). `log` is a log file with
// the details.
export class InfraError extends Error {
  log: string | undefined;
  constructor(message: string, log?: string) {
    super(message);
    this.name = "InfraError";
    this.log = log;
  }
}
