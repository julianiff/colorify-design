import { build } from "esbuild";
import { litCssPlugin } from "esbuild-plugin-lit-css";
import rimraf from "rimraf";

const OUTPUT_DIR = "./lib";

// Cleanup Build Dir
rimraf.sync(OUTPUT_DIR);

//Watch Bundles
build({
  entryPoints: ["src/index.ts"],
  outdir: OUTPUT_DIR,
  bundle: true,
  minify: true,
  sourcemap: true,
  color: true,
  watch: {
    onRebuild(error, result) {
      if (error) console.error("watch build failed:", error);
      else console.log("watch build succeeded:", result);
    },
  },
  plugins: [litCssPlugin({ uglify: true })],
});

// Build Styling
build({
  entryPoints: ["./src/styling/design.css"],
  outfile: `${OUTPUT_DIR}/index.css`,
  bundle: false,
  minify: true,
  color: true,
  watch: {
    onRebuild(error, result) {
      if (error) console.error("css watch build failed:", error);
      else console.log("css watch build succeeded:", result);
    },
  },
});
