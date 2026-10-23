import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'public/uploads';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
let before = 0, after = 0;

for (const file of files) {
  const input = path.join(dir, file);
  const tmp = path.join(dir, `.tmp-${file}`);
  try {
    const b = fs.statSync(input).size;
    await sharp(input)
      .resize({ width: 1400, fit: 'inside', withoutEnlargement: true })
      .png({ palette: true, quality: 85, effort: 10, compressionLevel: 9 })
      .toFile(tmp);
    fs.renameSync(tmp, input);
    const a = fs.statSync(input).size;
    before += b; after += a;
    console.log(`✓ ${file}: ${(b/1024).toFixed(0)}K → ${(a/1024).toFixed(0)}K (-${((1-a/b)*100).toFixed(0)}%)`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  }
}
console.log(`\nTOTAL: ${(before/1024/1024).toFixed(1)}M → ${(after/1024/1024).toFixed(1)}M (${((1-after/before)*100).toFixed(0)}% reduction)`);
