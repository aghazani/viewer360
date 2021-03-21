import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "src/viewer360.ts",
    output: [
      {
        // ESM Module
        file: "dist/viewer360.esm.js",
        format: "esm",
      },
      {
        // ESM Module
        file: "dist/viewer360.cjs.js",
        exports: "default",
        format: "cjs",
      },
      {
        // UMD global Variable viewer360
        file: "dist/viewer360.umd.js",
        format: "umd",
        name: "viewer360",
        globals: {
          viewer360: "viewer360",
        },
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      terser({ output: { comments: false } }),
      postcss({
        plugins: [],
      }),
    ],
  },
];
