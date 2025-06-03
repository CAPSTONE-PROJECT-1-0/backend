const AuthController = require('../controllers/AuthController');

const authRoutes = [    {
        method: 'POST',
        path: '/login',
        handler: AuthController.login,
        options: {
            description: 'Login user',
            tags: ['api', 'auth'],
            auth: false // No auth required for login
        }
    },
    {
        method: 'POST',
        path: '/register',
        handler: AuthController.register,
        options: {
            description: 'Register user',
            tags: ['api', 'auth'],
            auth: false // No auth required for register
        }
    },
    {
        method: 'POST',
        path: '/logout',
        handler: AuthController.logout,
        options: {
            description: 'Logout user',
            tags: ['api', 'auth'],
            auth: 'jwt' // JWT auth required for logout
        }
    },
    {
        method: 'GET',
        path: '/profile',
        handler: AuthController.getUserProfile,
        options: {
            description: 'Get User Profile',
            tags: ['api', 'auth'],
            auth: 'jwt' // JWT auth required for profile
        }
    },
];

module.exports = authRoutes;