// scripts/toggle-pkg-mode.ts
import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { resolve, dirname } from 'path';

const packages = ['base', 'styled'];

// Production fields we want to remove/add
const prodFields = {
  main: "./dist/index.umd.js",
  module: "./dist/index.mjs",
  types: "./dist/types/index.d.ts",
  exports: {
    ".": {
      import: "./dist/index.mjs",
      require: "./dist/index.umd.js"
    }
  }
};

function togglePackageMode(mode: 'dev' | 'prod') {
  packages.forEach(pkgName => {
    const pkgPath = resolve(dirname(""), `packages/${pkgName}/package.json`);
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

    // Create backup if it doesn't exist
    const backupPath = pkgPath.replace('package.json', 'package.prod.json');
    if (mode === 'dev' && !pkg._isDevMode) {
      copyFileSync(pkgPath, backupPath);
    }

    if (mode === 'dev') {
      // Remove production fields
      Object.keys(prodFields).forEach(field => {
        delete pkg[field];
      });
      pkg._isDevMode = true;
    } else {
      // Restore production fields
      try {
        const prodPkg = JSON.parse(readFileSync(backupPath, 'utf-8'));
        Object.keys(prodFields).forEach(field => {
          pkg[field] = prodPkg[field];
        });
        delete pkg._isDevMode;
      } catch (err) {
        // If no backup exists, use default prod fields
        Object.entries(prodFields).forEach(([key, value]) => {
          pkg[key] = value;
        });
      }
    }

    // Write updated package.json with proper formatting
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

    console.log(`📦 Updated ${pkgName} to ${mode} mode`);
  });
}

// Get mode from command line argument
const mode = process.argv[2] as 'dev' | 'prod';
if (!mode || !['dev', 'prod'].includes(mode)) {
  console.error('Please specify mode: dev or prod');
  process.exit(1);
}

togglePackageMode(mode);