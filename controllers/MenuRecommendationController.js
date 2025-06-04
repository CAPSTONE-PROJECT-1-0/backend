const { MenuRekomendasi } = require('../models');

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
        attributes: ['id', 'kategori', 'bahan_makanan', 'menu_rekomendasi']
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
}

module.exports = MenuRecommendationController;