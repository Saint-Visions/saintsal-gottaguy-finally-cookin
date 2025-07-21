#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files and directories to clean up
const cleanupTargets = [
  'dist',
  '.next',
  'node_modules/.cache',
  '.vercel',
  'out'
];

console.log('🧹 Cleaning up build artifacts...');

cleanupTargets.forEach(target => {
  const targetPath = path.join(process.cwd(), target);
  
  try {
    if (fs.existsSync(targetPath)) {
      fs.rmSync(targetPath, { recursive: true, force: true });
      console.log(`✅ Removed: ${target}`);
    }
  } catch (error) {
    console.warn(`⚠️  Could not remove ${target}:`, error.message);
  }
});

console.log('✨ Build cleanup complete!');
