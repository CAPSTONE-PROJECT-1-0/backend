// userrecommendationroutes.js
const UserRecommendationController = require('../controllers/UserRecommendationController');

const userRecommendationRoutes = [
  {
    method: 'GET',
    path: '/recommendations',
    handler: UserRecommendationController.index
  },
  {
    method: 'POST',
    path: '/recommendations',
    handler: UserRecommendationController.store
  },
  {
    method: 'GET',
    path: '/recommendations/{id}',
    handler: UserRecommendationController.show
  },
  {
    method: ['PUT', 'PATCH'],
    path: '/recommendations/{id}',
    handler: UserRecommendationController.update
  },
  {
    method: 'DELETE',
    path: '/recommendations/{id}',
    handler: UserRecommendationController.destroy
  }
];

module.exports = userRecommendationRoutes;