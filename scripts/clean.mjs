import { lstat, realpath, rm } from "node:fs/promises";
import path from "node:path";

// Only remove the generated directory beside this repository's scripts folder.
// Refuse symlinks/junctions so a local override cannot redirect cleanup elsewhere.
const root = await realpath(new URL("../", import.meta.url));
const output = path.join(root, "_site");
try {
  const info = await lstat(output);
  if (info.isSymbolicLink() || path.dirname(await realpath(output)) !== root) {
    throw new Error(`Refusing to clean an output directory outside the checkout: ${output}`);
  }
  await rm(output, { recursive: true });
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
