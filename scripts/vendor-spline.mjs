/**
 * Vendors the Spline viewer into public/spline so the site serves it itself.
 *
 *   node scripts/vendor-spline.mjs            (uses the version below)
 *   node scripts/vendor-spline.mjs 1.9.82     (a specific version)
 *
 * What it does:
 *  1. Copies the viewer's build/*.js from the npm package.
 *  2. Downloads the wasm modules the viewer fetches on demand.
 *  3. Points the viewer's hard-coded unpkg URLs at our own folder.
 *  4. Downloads the hero scene.
 */
import { execSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, writeFileSync, copyFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const VERSION = process.argv[2] ?? "1.9.82";
const OUT = "public/spline";
const VIEWER_OUT = join(OUT, "viewer");
const PUBLIC_PATH = "/spline/viewer";
const SCENE_URL = "https://prod.spline.design/85ncNDchXqwFW2zI/scene.splinecode";
const SCENE_OUT = join(OUT, "nexbot.splinecode");

/** Package → wasm file the viewer fetches from it, all pinned to the viewer's version. */
const WASM = {
  "navmesh-wasm": "navmesh.wasm",
  "modelling-wasm": "process.wasm",
  "boolean-wasm": "boolean.wasm",
  "ui-wasm": "ui.wasm",
};

async function download(url, to) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  writeFileSync(to, Buffer.from(await res.arrayBuffer()));
}

mkdirSync(VIEWER_OUT, { recursive: true });

// 1. viewer js
const tmp = mkdtempSync(join(tmpdir(), "spline-"));
execSync(`npm pack @splinetool/viewer@${VERSION} --silent`, { cwd: tmp, stdio: "ignore" });
const tarball = readdirSync(tmp).find((f) => f.endsWith(".tgz"));
execSync(`tar -xzf ${tarball}`, { cwd: tmp });
const build = join(tmp, "package", "build");
for (const file of readdirSync(build).filter((f) => f.endsWith(".js"))) {
  copyFileSync(join(build, file), join(VIEWER_OUT, file));
}

// 2. wasm
for (const [pkg, file] of Object.entries(WASM)) {
  await download(`https://unpkg.com/@splinetool/${pkg}@${VERSION}/build/${file}`, join(VIEWER_OUT, file));
}

// 3. repoint the viewer at our folder
const viewerFile = join(VIEWER_OUT, "spline-viewer.js");
let js = readFileSync(viewerFile, "utf8");
const before = (js.match(/https:\/\/unpkg\.com\/@splinetool\//g) ?? []).length;
js = js.replace(/https:\/\/unpkg\.com\/@splinetool\/[a-z-]+@[\d.]+\/build\/?/g, (m) =>
  m.endsWith("/") ? `${PUBLIC_PATH}/` : PUBLIC_PATH,
);
writeFileSync(viewerFile, js);

// 4. scene
await download(SCENE_URL, SCENE_OUT);

rmSync(tmp, { recursive: true, force: true });
console.log(`Vendored @splinetool/viewer@${VERSION}: ${before} unpkg URLs repointed, ${Object.keys(WASM).length} wasm files, scene downloaded.`);
