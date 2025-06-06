'use strict';

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

module.exports = {
  up: async (queryInterface) => {
    const nutritionData = [];
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.resolve(__dirname, './../dataset/menu_nutrition.csv')) // gunakan nama file yang benar
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => nutritionData.push({
          food: row.Food,
          calories: parseFloat(row['Calories (kcal)']),
          fat: parseFloat(row['Fat (g)']),
          carbs: parseFloat(row['Carbs (g)']),
          protein: parseFloat(row['Protein (g)']),
          created_at: new Date(),
          updated_at: new Date(),
        }))
        .on('end', async () => {
          try {
            await queryInterface.bulkInsert('nutritions', nutritionData);
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => reject(error));
    });
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('nutritions', null, {});
  },
};