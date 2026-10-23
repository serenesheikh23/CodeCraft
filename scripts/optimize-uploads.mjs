import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'public/uploads';
const MAX_DIM = 1800;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

let totalBefore = 0, totalAfter = 0;

for (const file of files) {
  const input = path.join(dir, file);
  const tmp = path.join(dir, `.tmp-${file}`);
  try {
    const beforeStat = fs.statSync(input);
    const beforeMeta = await sharp(input).metadata();

    await sharp(input)
      .resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(tmp);

    fs.renameSync(tmp, input);

    const afterStat = fs.statSync(input);
    const afterMeta = await sharp(input).metadata();
    totalBefore += beforeStat.size;
    totalAfter += afterStat.size;

    const pct = ((1 - afterStat.size / beforeStat.size) * 100).toFixed(0);
    console.log(`✓ ${file}: ${beforeMeta.width}x${beforeMeta.height} ${(beforeStat.size/1024/1024).toFixed(2)}M → ${afterMeta.width}x${afterMeta.height} ${(afterStat.size/1024).toFixed(0)}K (-${pct}%)`);
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`);
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  }
}

console.log(`\nTOTAL: ${(totalBefore/1024/1024).toFixed(1)}M → ${(totalAfter/1024/1024).toFixed(1)}M (${((1 - totalAfter/totalBefore) * 100).toFixed(0)}% reduction)`);
