const { MenuRekomendasi } = require('../models');
const fs = require('fs');
const path = require('path');

async function updateImages() {
  const menus = await MenuRekomendasi.findAll();
  for (const menu of menus) {
    // Ambil nama menu utama (sebelum koma), trim, lowercase, TANPA underscore
    const mainMenuName = menu.menu_rekomendasi.split(',')[0].trim().toLowerCase();
    // Coba beberapa ekstensi gambar umum
    const possibleExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    let imagePath = null;
    for (const ext of possibleExtensions) {
      // Ganti 'food_picture' menjadi 'food pictures'
      const candidate = path.join(__dirname, './dataset/Food Picture', `${mainMenuName}${ext}`);
      if (fs.existsSync(candidate)) {
        imagePath = candidate;
        break;
      }
    }
    if (imagePath) {
      const buffer = fs.readFileSync(imagePath);
      const base64 = buffer.toString('base64');
      await menu.update({ image: base64 });
      console.log(`Updated image for menu: ${mainMenuName}`);
    } else {
      console.warn(`Image not found for menu: ${mainMenuName}`);
    }
  }
  console.log('Done updating images.');
}

updateImages().then(() => process.exit(0));
