import path from "path";
import { fileURLToPath } from "url";
import nodeExternals from "webpack-node-externals";
import TerserPlugin from "terser-webpack-plugin";
import ESMWebpackPlugin from "./esm-webpack-plugin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./server.js",
  target: "node",
  externalsPresets: { node: true },
  externals: [nodeExternals({
    importType: 'module'
  })],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    module: true,
    library: {
      type: "module"
    },
    chunkFormat: 'module',
    environment: {
      module: true
    }
  },
  experiments: {
    outputModule: true,
  },
  module: {
    parser: {
      javascript: {
        importMeta: true,
        url: true
      }
    },
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", {
                modules: false,
                targets: {
                  "node": "current"
                }
              }]
            ],
            plugins: []
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    fullySpecified: true,
  },
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2020,
          module: true,
          keep_classnames: true,
          keep_fnames: true,
          format: {
            ecma: 2020,
          },
          mangle: false
        },
      }),
    ],
  },
  plugins: [
    new ESMWebpackPlugin()
  ]
}
