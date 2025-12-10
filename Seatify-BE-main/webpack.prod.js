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
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: {
      type: "commonjs2"
    }
  },
  experiments: {
    outputModule: false,
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
                targets: {
                  "node": "current"
                }
              }]
            ]
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js"],
    alias: {
      'bcrypt': 'bcryptjs'
    }
  },
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2020,
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
  plugins: []
} 