'use strict';

const NutritionMenuController = require('../controllers/NutritionMenuController');
const Joi = require('joi');

module.exports = [
  {
    method: 'GET',
    path: '/nutrition/{foodName}',
    handler: NutritionMenuController.getNutritionByFoodName,
    options: {
      description: 'Get nutrition data by food name',
      notes: 'Returns nutrition information for the specified food',
      tags: ['api', 'nutrition'],
      validate: {
        params: Joi.object({
          foodName: Joi.string().required().description('Name of the food to search for')
        })
      },
      response: {
        schema: Joi.object({
          status: Joi.string().valid('success', 'fail', 'error').required(),
          data: Joi.object({
            nutrition: Joi.object({
              id: Joi.number().integer(),
              food: Joi.string(),
              calories: Joi.number(),
              fat: Joi.number(),
              carbs: Joi.number(),
              protein: Joi.number(),
              created_at: Joi.date(),
              updated_at: Joi.date()
            }).optional()
          }).optional(),
          message: Joi.string().optional()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/nutritions',
    handler: NutritionMenuController.getAllNutrition,
    options: {
      description: 'Get all nutrition data',
      notes: 'Returns all nutrition information in the database',
      tags: ['api', 'nutrition'],
      response: {
        schema: Joi.object({
          status: Joi.string().valid('success', 'fail', 'error').required(),
          data: Joi.object({
            nutritions: Joi.array().items(
              Joi.object({
                id: Joi.number().integer(),
                food: Joi.string(),
                calories: Joi.number(),
                fat: Joi.number(),
                carbs: Joi.number(),
                protein: Joi.number(),
                created_at: Joi.date(),
                updated_at: Joi.date()
              })
            )
          }),
          message: Joi.string().optional()
        })
      }
    }
  }
];