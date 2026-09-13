/**
 * Vendors the Spline viewer into public/spline so the site serves it itself.
 *
 *   node scripts/vendor-spline.mjs            (uses the version below)
 *   node scripts/vendor-spline.mjs 2.0.46     (a specific version)
 *
 * What it does:
 *  1. Copies the viewer's build/*.js from the npm package, replacing the old set.
 *  2. Downloads the wasm modules the viewer fetches on demand from Spline's CDN.
 *  3. Points the viewer's hard-coded CDN URLs at our own folder.
 *  4. Downloads the hero scene.
 */
import { execSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  writeFileSync,
  copyFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const VERSION = process.argv[2] ?? "2.0.46";
const OUT = "public/spline";
const VIEWER_OUT = join(OUT, "viewer");
const PUBLIC_PATH = "/spline/viewer";
const SCENE_URL = "https://prod.spline.design/85ncNDchXqwFW2zI/scene.splinecode";
const SCENE_OUT = join(OUT, "nexbot.splinecode");

/** The wasm modules the viewer fetches on demand, all pinned to the viewer's version. */
const WASM = ["boolean.wasm", "process.wasm", "navmesh.wasm", "physics.wasm", "hana-ui.wasm"];
const CDN = `https://cdn.spline.design/@splinetool/runtime@${VERSION}/build`;

async function download(url, to) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  writeFileSync(to, Buffer.from(await res.arrayBuffer()));
}

// Start clean, so files from the previous version cannot linger.
rmSync(VIEWER_OUT, { recursive: true, force: true });
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
for (const file of WASM) {
  await download(`${CDN}/${file}`, join(VIEWER_OUT, file));
}

// 3. repoint the viewer at our folder. The version is either written out or
// built from a template; both forms end in /build/.
const viewerFile = join(VIEWER_OUT, "spline-viewer.js");
let js = readFileSync(viewerFile, "utf8");
const before = (js.match(/https:\/\/cdn\.spline\.design\/@splinetool\/runtime/g) ?? []).length;
js = js
  .replace(/https:\/\/cdn\.spline\.design\/@splinetool\/runtime@[\d.]+\/build\/?/g, (m) =>
    m.endsWith("/") ? `${PUBLIC_PATH}/` : PUBLIC_PATH,
  )
  .replace(
    /https:\/\/cdn\.spline\.design\/@splinetool\/runtime\$\{[\w$]+\?`@\$\{[\w$]+\}`:""\}\/build\//g,
    `${PUBLIC_PATH}/`,
  );
writeFileSync(viewerFile, js);

// 4. scene
await download(SCENE_URL, SCENE_OUT);

rmSync(tmp, { recursive: true, force: true });
console.log(
  `Vendored @splinetool/viewer@${VERSION}: ${before} CDN URLs repointed, ${WASM.length} wasm files, scene downloaded.`,
);
