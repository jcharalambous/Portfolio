import { defineConfig, devices } from "@playwright/test";

// A dedicated port, so these tests never touch a running `npm run dev`.
const port = 3100;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1512, height: 866 },
        // Full Chromium with software WebGL, so the 3D viewer really runs in tests.
        channel: "chromium",
        launchOptions: { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] },
      },
    },
    {
      name: "phone",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  // Tests run against a production build, the same thing Vercel serves.
  webServer: {
    command: `npm run build && npx next start -p ${port}`,
    url: `http://localhost:${port}/robots.txt`,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
