import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Unmount rendered components between tests so one test's DOM never leaks into the next.
afterEach(cleanup);

// Browser APIs jsdom does not implement. Components that use them still render; the effects just do nothing.
window.matchMedia = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null);
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserverStub as unknown as typeof ResizeObserver;
