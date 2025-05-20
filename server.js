'use strict';

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const auth = require('./auth');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

        // Registrasi plugin JWT
    await server.register(Jwt);

    // Setup strategi autentikasi JWT
    server.auth.strategy('jwt', 'jwt', {
        keys: 'your_super_secret_key', // Harus sama dengan key yang digunakan untuk generate token
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 3600, // 1 jam
            timeSkewSec: 15
        },
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: {
                    userId: artifacts.decoded.payload.userId,
                    username: artifacts.decoded.payload.username,
                    name: artifacts.decoded.payload.name
                }
            };
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello Hapi!';
        }
    });

        // Route autentikasi
    server.route([
        {
            method: 'POST',
            path: '/register',
            handler: auth.register,
            options: {
                auth: false // Tidak perlu autentikasi untuk register
            }
        },
        {
            method: 'POST',
            path: '/login',
            handler: auth.login,
            options: {
                auth: false // Tidak perlu autentikasi untuk login
            }
        },
        {
            method: 'POST',
            path: '/logout',
            handler: auth.logout,
            options: {
                auth: 'jwt' // Membutuhkan autentikasi JWT
            }
        },
        {
            method: 'GET',
            path: '/profile',
            handler: auth.getUserProfile,
            options: {
                auth: 'jwt' // Membutuhkan autentikasi JWT
            }
        }
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();