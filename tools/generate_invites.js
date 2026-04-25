// Node script: generate randomized tokens for invites
// Usage: node tools/generate_invites.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const inPath = path.join(__dirname, '..', 'data', 'invite_list.json');
const outPath = path.join(__dirname, '..', 'js', 'invites.js');

function genToken() {
  return crypto.randomBytes(8).toString('hex');
}

function main() {
  if (!fs.existsSync(inPath)) {
    console.error('Missing data/invite_list.json. Create it with entries: [{"name":"...","role":"guest|entourage|sponsor"}, ...]');
    process.exit(1);
  }

  const list = JSON.parse(fs.readFileSync(inPath, 'utf8'));
  const mapping = {};

  list.forEach(item => {
    let token;
    do {
      token = genToken();
    } while (mapping[token]);
    mapping[token] = { role: item.role, name: item.name, nickname: item.nickname || '' };
  });

  const content = `// Generated invites (do not edit directly if using tools/generate_invites.js)\n` +
    `// Tokens are randomized. Regenerate by running: node tools/generate_invites.js\n` +
    `const INVITE_TOKENS = ${JSON.stringify(mapping, null, 2)};\n\n` +
    `function getInviteByToken(token) {\n  if (!token) return null;\n  return INVITE_TOKENS[token] || null;\n}\n\n` +
    `// For debugging: print mapping to console when loaded in Node environment\n` +
    `if (typeof module !== 'undefined' && module.exports) { module.exports = { INVITE_TOKENS, getInviteByToken }; }\n`;

  fs.writeFileSync(outPath, content, 'utf8');
  console.log('Wrote', outPath);
  console.log('Generated tokens:');
  Object.keys(mapping).forEach(t => console.log(t, '->', mapping[t].role, '/', mapping[t].name, '/', mapping[t].nickname));
}

main();
