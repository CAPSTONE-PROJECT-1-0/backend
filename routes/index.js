'use strict';

const authRoutes = require('./authRoutes.js');
const userrecommendationRoutes = require('./userrecommendationRoutes.js');
const userRoutes = require('./userRoutes.js');
const menuRecommendationRoutes = require('./menuRecommendationRoutes.js');
const nutritionMenuRoutes = require('./nutritionMenuRoutes.js');
const uploadHistoryRoutes = require('./uploadHistoryRoutes.js');

const allRoutes = [
  ...authRoutes,
  ...userrecommendationRoutes,
  ...userRoutes,
  ...menuRecommendationRoutes,
  ...nutritionMenuRoutes,
  ...uploadHistoryRoutes,
];

module.exports = allRoutes;
