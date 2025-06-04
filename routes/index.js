'use strict';

const authRoutes = require('./authRoutes.js');
const userrecommendationRoutes = require('./userrecommendationRoutes.js');
const userRoutes = require('./userRoutes.js');
const menuRecommendationRoutes = require('./menuRecommendationRoutes.js');

const allRoutes = [
  ...authRoutes,
  ...userrecommendationRoutes,
  ...userRoutes,
  ...menuRecommendationRoutes
];

module.exports = allRoutes;
