// userRoutes.js
module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: (request, h) => {
      return 'User route works!';
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: (request, h) => {
      const { id } = request.params;
      return `User with id: ${id}`;
    },
  },
];
