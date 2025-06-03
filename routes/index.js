'use strict';

const authRoutes = require('./authRoutes.js');
const userrecommendationRoutes = require('./userrecommendationRoutes.js');
const userRoutes = require('./userRoutes.js');

const allRoutes = [
  ...authRoutes,
  ...userrecommendationRoutes,
  ...userRoutes
];

module.exports = allRoutes;
