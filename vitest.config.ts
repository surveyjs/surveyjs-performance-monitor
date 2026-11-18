import { defineConfig } from "vitest/config";

// The unit tests of the monitor. Nothing here measures: the suites run in survey-library.
export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    environment: "node",
    globals: false,
    testTimeout: 120000,
    hookTimeout: 120000,
  },
});
