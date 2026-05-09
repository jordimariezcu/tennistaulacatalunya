/**
 * Patches @astrojs/vercel adapter to use nodejs20.x as fallback runtime.
 * @astrojs/vercel@7 falls back to nodejs18.x when it encounters an unknown
 * Node.js version (like 22 or 24 on Vercel's build servers). Since Node.js 18
 * reached EOL and Vercel dropped it, we patch to fall back to nodejs20.x instead.
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const adapterPath = resolve(__dirname, '../node_modules/@astrojs/vercel/dist/serverless/adapter.js');

let content = readFileSync(adapterPath, 'utf8');

if (content.includes("return 'nodejs18.x'")) {
  // Replace ALL occurrences of nodejs18.x fallback with nodejs20.x
  content = content.replaceAll("return 'nodejs18.x'", "return 'nodejs20.x'");
  // Update the warning message text too
  content = content.replaceAll(
    'Your project will use Node.js 18 as the runtime instead.',
    'Your project will use Node.js 20 as the runtime instead.'
  );
  content = content.replaceAll(
    'Consider switching your local version to 18.',
    'Consider switching your local version to 20.'
  );
  writeFileSync(adapterPath, content, 'utf8');
  console.log('✓ Patched @astrojs/vercel: fallback runtime nodejs18.x -> nodejs20.x');
} else if (content.includes("return 'nodejs20.x'")) {
  console.log('✓ @astrojs/vercel already patched (nodejs20.x fallback in place)');
} else {
  console.warn('⚠ Unexpected adapter format - patch may need updating');
}
