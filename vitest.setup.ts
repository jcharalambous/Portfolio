import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount rendered components between tests so one test's DOM never leaks into the next.
afterEach(cleanup);
