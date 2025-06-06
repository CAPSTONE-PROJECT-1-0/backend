const { MenuRekomendasi } = require('../models');
const fs = require('fs');
const path = require('path');

// Fungsi utilitas konversi file gambar ke base64
function imageFileToBase64(filename) {
  const filePath = path.join(__dirname, '../food_picture', filename);
  if (!fs.existsSync(filePath)) return null;
  const buffer = fs.readFileSync(filePath);
  return buffer.toString('base64');
}

class MenuRecommendationController {
  static async getRecommendation(request, h) {
    try {
      const { makanan } = request.query;
      
      if (!makanan) {
        return h.response({
          status: 'fail',
          message: 'Parameter makanan diperlukan',
        }).code(400);
      }

      // Cari semua menu yang mengandung bahan makanan yang sama
      const allMenus = await MenuRekomendasi.findAll();
      
      // Filter menu yang memiliki bahan makanan yang mirip
      const recommendations = allMenus.filter(menu => {
        const bahanArray = menu.bahan_makanan.split(', ').map(b => b.trim().toLowerCase());
        return bahanArray.some(bahan => makanan.toLowerCase().includes(bahan) || bahan.includes(makanan.toLowerCase()));
      });

      if (recommendations.length === 0) {
        return h.response({
          status: 'fail',
          message: 'Tidak ditemukan rekomendasi untuk makanan tersebut',
        }).code(404);
      }

      // Format output
      const result = recommendations.map(menu => ({
        kategori: menu.kategori,
        bahan_makanan: menu.bahan_makanan.split(', '),
        rekomendasi: menu.menu_rekomendasi.split(', '),
        deskripsi: menu.deskripsi,
        image: menu.image
      }));

      return h.response({
        status: 'success',
        data: result,
      }).code(200);
      
    } catch (error) {
      console.error(error);
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan server',
      }).code(500);
    }
  }

  static async getAllMenu(request, h) {
    try {
      const allMenus = await MenuRekomendasi.findAll({
        attributes: ['id', 'kategori', 'bahan_makanan', 'menu_rekomendasi', 'deskripsi', 'image']
      });
      
      return h.response({
        status: 'success',
        data: allMenus,
      }).code(200);
      
    } catch (error) {
      console.error(error);
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan server',
      }).code(500);
    }
  }

  // Contoh method untuk menambah menu baru dengan gambar base64
  static async addMenuWithImage(request, h) {
    try {
      const { kategori, bahan_makanan, menu_rekomendasi, deskripsi, imageFilename } = request.payload;
      // Konversi gambar ke base64
      const imageBase64 = imageFileToBase64(imageFilename);

      const newMenu = await MenuRekomendasi.create({
        kategori,
        bahan_makanan,
        menu_rekomendasi,
        deskripsi,
        image: imageBase64 // simpan base64 ke kolom image
      });

      return h.response({
        status: 'success',
        data: newMenu
      }).code(201);
    } catch (error) {
      console.error(error);
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan server',
      }).code(500);
    }
  }
}

module.exports = MenuRecommendationController;