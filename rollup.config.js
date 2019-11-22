// Rollup plugins
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import pkjson from "./package.json";

const isDev = process.argv.splice(2).indexOf("--pub") < 0;
const plugins = isDev
  ? [
      babel({
        exclude: "node_modules/**"
      })
    ]
  : [
      babel({
        exclude: "node_modules/**"
      }),
      uglify()
    ];

const output = isDev
  ? { file: "build/particles-bg.js" }
  : { file: "build/particles-bg.min.js" };

export default {
  input: "src/index.js",
  output: {
    ...output,
    format: "umd",
    name: "particles-bg",
    sourcemap: true
  },
  plugins: plugins
};
