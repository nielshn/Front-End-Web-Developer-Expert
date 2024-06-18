const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

fs.readdirSync(target).forEach((image) => {
  const imageName = image.split('.').slice(0, -1).join('.');

  // Generate large version (800px wide)
  sharp(`${target}/${image}`)
    .resize(800)
    .jpeg({ quality: 80, progressive: true })
    .toFile(path.resolve(destination, `${imageName}-large.jpg`));

  // Generate small version (480px wide)
  sharp(`${target}/${image}`)
    .resize(480)
    .jpeg({ quality: 80, progressive: true })
    .toFile(path.resolve(destination, `${imageName}-small.jpg`));
});
