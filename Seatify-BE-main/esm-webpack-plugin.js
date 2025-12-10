// ESM Webpack Plugin
export default class ESMWebpackPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // Hook into the emit phase
    compiler.hooks.emit.tapAsync('ESMWebpackPlugin', (compilation, callback) => {
      // Get all the assets
      for (const filename in compilation.assets) {
        // Only process JavaScript files
        if (!filename.endsWith('.js')) {
          continue;
        }

        // Get the content
        let content = compilation.assets[filename].source();
        
        // Replace CommonJS require with ES imports
        // Replace: const xyz = require('abc')
        content = content.replace(
          /(?:var|let|const)\s+([a-zA-Z0-9_$]+)\s*=\s*require\(['"]([^'"]+)['"]\)(\.([a-zA-Z0-9_$]+))?;?/g,
          (match, varName, moduleName, dot, propName) => {
            if (dot && propName) {
              return `import { ${propName} as ${varName} } from "${moduleName}";`;
            } else {
              return `import ${varName} from "${moduleName}";`;
            }
          }
        );

        // Replace: require('abc')
        content = content.replace(
          /require\(['"]([^'"]+)['"]\)/g,
          'import("$1")'
        );

        // Replace: exports.xyz = abc
        content = content.replace(
          /exports\.([a-zA-Z0-9_$]+)\s*=\s*([a-zA-Z0-9_$]+);?/g,
          'export const $1 = $2;'
        );

        // Replace: module.exports = xyz
        content = content.replace(
          /module\.exports\s*=\s*([a-zA-Z0-9_$]+);?/g,
          'export default $1;'
        );

        // Update the asset
        compilation.assets[filename] = {
          source: () => content,
          size: () => content.length
        };
      }

      callback();
    });
  }
} 