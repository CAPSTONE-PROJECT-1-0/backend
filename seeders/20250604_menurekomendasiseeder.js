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
    
    const menuData = records.map(record => ({
      id: parseInt(record.id),
      kategori: record.kategori,
      bahan_makanan: record['bahan makanan'],
      menu_rekomendasi: record['menu rekomendasi'],
      createdAt: now,
      updatedAt: now,
    }));

    await queryInterface.bulkInsert('menu_rekomendasi', menuData);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('menu_rekomendasi', null, {});
  },
};