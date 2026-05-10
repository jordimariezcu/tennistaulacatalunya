/**
 * Patch 1: @astrojs/vercel adapter - use nodejs20.x as fallback runtime.
 * @astrojs/vercel@7 falls back to nodejs18.x for unknown Node versions (22/24).
 * Since Node.js 18 is EOL and Vercel dropped it, patch fallback to nodejs20.x.
 *
 * Patch 2: @keystatic/core - make refresh_token fields optional in token schema.
 * GitHub OAuth Apps no longer reliably return refresh_token/expires_in, causing
 * Keystatic's strict schema validation to fail with "Authorization failed".
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- Patch 1: @astrojs/vercel runtime ---
const adapterPath = resolve(__dirname, '../node_modules/@astrojs/vercel/dist/serverless/adapter.js');
let adapterContent = readFileSync(adapterPath, 'utf8');

if (adapterContent.includes("return 'nodejs18.x'")) {
  adapterContent = adapterContent.replaceAll("return 'nodejs18.x'", "return 'nodejs20.x'");
  adapterContent = adapterContent.replaceAll(
    'Your project will use Node.js 18 as the runtime instead.',
    'Your project will use Node.js 20 as the runtime instead.'
  );
  adapterContent = adapterContent.replaceAll(
    'Consider switching your local version to 18.',
    'Consider switching your local version to 20.'
  );
  writeFileSync(adapterPath, adapterContent, 'utf8');
  console.log('✓ Patched @astrojs/vercel: fallback runtime nodejs18.x -> nodejs20.x');
} else if (adapterContent.includes("return 'nodejs20.x'")) {
  console.log('✓ @astrojs/vercel already patched');
} else {
  console.warn('⚠ @astrojs/vercel patch: unexpected format');
}

// --- Patch 2: @keystatic/core token schema ---
// Make expires_in, refresh_token, refresh_token_expires_in optional so that
// OAuth Apps without expiring tokens (or older GitHub responses) still work.
const keystatic_files = [
  '../node_modules/@keystatic/core/dist/keystatic-core-api-generic.node.js',
  '../node_modules/@keystatic/core/dist/keystatic-core-api-generic.js',
];

const oldTokenSchema = `const tokenDataResultType = s.type({
  access_token: s.string(),
  expires_in: s.number(),
  refresh_token: s.string(),
  refresh_token_expires_in: s.number(),
  scope: s.string(),
  token_type: s.literal('bearer')
});`;

const newTokenSchema = `const tokenDataResultType = s.type({
  access_token: s.string(),
  expires_in: s.optional(s.number()),
  refresh_token: s.optional(s.string()),
  refresh_token_expires_in: s.optional(s.number()),
  scope: s.string(),
  token_type: s.optional(s.string())
});`;

for (const relPath of keystatic_files) {
  const filePath = resolve(__dirname, relPath);
  try {
    let content = readFileSync(filePath, 'utf8');
    if (content.includes(oldTokenSchema)) {
      content = content.replace(oldTokenSchema, newTokenSchema);
      writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Patched @keystatic/core token schema: ${relPath.split('/').pop()}`);
    } else if (content.includes('expires_in: s.optional')) {
      console.log(`✓ @keystatic/core already patched: ${relPath.split('/').pop()}`);
    } else {
      console.warn(`⚠ @keystatic/core patch: schema not found in ${relPath.split('/').pop()}`);
    }
  } catch (e) {
    // File might not exist, skip
  }
}
