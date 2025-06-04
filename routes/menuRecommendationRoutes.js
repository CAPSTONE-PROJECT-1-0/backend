const MenuRecommendationController = require('../controllers/MenuRecommendationController');
const Joi = require('@hapi/joi');

const routes = [
  {
    method: 'GET',
    path: '/menurecommendations',
    handler: MenuRecommendationController.getRecommendation,
    options: {
      description: 'Get food recommendations based on ingredients',
      notes: 'Returns recommended menus that have similar ingredients',
      tags: ['api', 'recommendations'],
      validate: {
        query: {
          makanan: Joi.string().required().description('Nama makanan yang ingin dicari rekomendasinya'),
        },
      },
    },
  },
  {
    method: 'GET',
    path: '/api/menus',
    handler: MenuRecommendationController.getAllMenu,
    options: {
      description: 'Get all menu data',
      notes: 'Returns all menu data from database',
      tags: ['api', 'menus'],
    },
  },
];

module.exports = routes;