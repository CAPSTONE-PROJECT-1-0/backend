'use strict';

const Nutrition = require('../models').Nutrition;
const { Op } = require('sequelize'); // pastikan sudah ada
const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse/sync');

class NutritionMenuController {
  async getNutritionByFoodName(request, h) {
    try {
      const { foodName } = request.params;
      const nutrition = await Nutrition.findOne({
        where: {
          food: {
            [Op.iLike]: `%${foodName}%`
          }
        }
      });

      if (!nutrition) {
        return h.response({
          status: 'fail',
          message: 'Nutrition data not found for the specified food'
        }).code(404);
      }

      // Pastikan response sesuai schema Joi
      return h.response({
        status: 'success',
        data: {
          nutrition: {
            id: nutrition.id,
            food: nutrition.food,
            calories: nutrition.calories,
            fat: nutrition.fat,
            carbs: nutrition.carbs,
            protein: nutrition.protein,
            created_at: nutrition.created_at || new Date(),
            updated_at: nutrition.updated_at || new Date()
          }
        }
      }).code(200);
    } catch (error) {
      console.error('Error getting nutrition data:', error);
      return h.response({
        status: 'error',
        message: error.message || 'Internal server error'
      }).code(500);
    }
  }

  async getAllNutrition(request, h) {
    try {
      const nutritions = await Nutrition.findAll({
        order: [['food', 'ASC']]
      });

      // Pastikan setiap item memiliki semua field yang diharapkan
      const result = (nutritions || []).map(nutrition => ({
        id: nutrition.id,
        food: nutrition.food,
        calories: nutrition.calories,
        fat: nutrition.fat,
        carbs: nutrition.carbs,
        protein: nutrition.protein,
        created_at: nutrition.created_at || new Date(),
        updated_at: nutrition.updated_at || new Date()
      }));

      return h.response({
        status: 'success',
        data: {
          nutritions: result
        }
      }).code(200);
    } catch (error) {
      console.error('Error getting all nutrition data:', error);
      return h.response({
        status: 'error',
        message: error.message || 'Internal server error'
      }).code(500);
    }
  }

  async getNutritionInfo(request, h) {
    try {
      const { foodName } = request.params;
      // Path ke CSV
      const csvPath = path.join(__dirname, './../dataset/menu_nutrition.csv');
      const csvData = fs.readFileSync(csvPath, 'utf8');
      const records = csvParse.parse(csvData, {
        columns: true,
        skip_empty_lines: true,
        delimiter: ';'
      });

      // Cari food (case-insensitive)
      const found = records.find(
        r => r.Food && r.Food.toLowerCase() === foodName.toLowerCase()
      );

      if (!found) {
        return h.response({
          status: 'fail',
          message: 'Food not found'
        }).code(404);
      }

      // Kembalikan data nutrisi
      return h.response({
        status: 'success',
        data: {
          food: found.Food,
          calories: found['Calories (kcal)'],
          fat: found['Fat (g)'],
          carbs: found['Carbs (g)'],
          protein: found['Protein (g)']
        }
      });
    } catch (err) {
      console.error('Get Nutrition Info Error:', err);
      return h.response({
        status: 'fail',
        message: err.message || 'Internal server error'
      }).code(500);
    }
  }
}

module.exports = new NutritionMenuController();