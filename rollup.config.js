import typescript from "rollup-plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";

export default {
  input: "./src/preview-select.ts",
  output: {
    file: "dist/preview-select.js",
    format: "umd",
    sourcemap: true,
    name: "previewSelect"
  },
  plugins: [
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
      declaration: true
    }),
    sourceMaps()
  ]
};
