import { build } from "esbuild";
import { litCssPlugin } from "esbuild-plugin-lit-css";
import rimraf from "rimraf";
import { minifyTemplates, writeFiles } from "esbuild-minify-templates";

const OUTPUT_DIR = "./lib";

// Cleanup Build Dir
rimraf.sync(OUTPUT_DIR);

//Build Independent Bundles
build({
  entryPoints: ["src/index.ts"],
  outdir: OUTPUT_DIR,
  bundle: true,
  minify: true,
  color: true,
  plugins: [litCssPlugin({ uglify: true })],
  sourcemap: true,
  write: false,
})
  .then(minifyTemplates)
  .then(writeFiles)
  .catch((e) => {
    throw e;
  });

// Build Styling
build({
  entryPoints: ["./src/styling/design.css"],
  outfile: `${OUTPUT_DIR}/index.css`,
  bundle: false,
  minify: true,
  color: true,
});
