'use strict';
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Use absolute path for the CSV file
    const csvPath = path.join(__dirname, '../dataset/menu_recommendation.csv');
    const csvData = fs.readFileSync(csvPath, 'utf8');
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ';', // specify semicolon as delimiter
    });

    const now = new Date();
    const foodPicturesDir = path.join(__dirname, '../Food Pictures');

    const menuData = records.map(record => {
      // Nama file gambar diasumsikan sama dengan kategori, spasi diganti _
      const imageName = `${record.kategori.replace(/\s+/g, '_')}.jpg`;
      const imagePath = path.join(foodPicturesDir, imageName);

      let imageBase64 = null;
      if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        imageBase64 = imageBuffer.toString('base64');
      }

      return {
        id: parseInt(record.id),
        kategori: record.kategori,
        bahan_makanan: record['bahan makanan'],
        menu_rekomendasi: record['menu rekomendasi'],
        deskripsi: record['deskripsi'],
        image: imageBase64, // simpan base64 atau null jika tidak ada file
        createdAt: now,
        updatedAt: now,
      };
    });

    await queryInterface.bulkInsert('menu_rekomendasi', menuData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('menu_rekomendasi', null, {});
  },
};