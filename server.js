'use strict';

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const appConfig = require('./config');
const db = require('./models');
const allAppRoutes = require('./routes');
const { isTokenBlacklisted } = require('./controllers/AuthController');
const Joi = require('@hapi/joi');

const init = async () => {
  const server = Hapi.server({
    port: appConfig.server.port,
    host: appConfig.server.host,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(Jwt);

  server.validator(Joi);

  server.auth.strategy('jwt', 'jwt', {
    keys: appConfig.jwt.secret,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: appConfig.jwt.maxAgeSec,
      timeSkewSec: 15
    }, validate: async (artifacts, request, h) => {
      try {
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          if (isTokenBlacklisted(token)) {
            return {
              isValid: false,
              errorMessage: 'Token has been invalidated'
            };
          }
        }
        const { userId, email, name } = artifacts.decoded.payload;
        return {
          isValid: true,
          credentials: {
            userId,
            email,
            name
          }
        };
      } catch (err) {
        console.error('JWT validate error:', err);
        return { isValid: false };
      }
    }
  });

  if (allAppRoutes && allAppRoutes.length > 0) {
    server.route(allAppRoutes);
    console.log(`✅ ${allAppRoutes.length} route berhasil didaftarkan dari routes/index.js`);
  } else {
    console.warn("⚠️ Tidak ada route yang ditemukan atau didaftarkan dari routes/index.js.");
  }

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return { message: `Selamat datang di Hapi.js Project Saya! (Env: ${appConfig.env})` };
    }
  });

  if (appConfig.env !== 'production' || process.env.RUN_DB_AUTH_IN_PROD === 'true') { // Hati-hati dengan db 
    try {
      await db.sequelize.authenticate();
      console.log(`Koneksi database ke '${appConfig.database.database}' di host '${appConfig.database.host}' berhasil.`);
    } catch (error) {
      console.error(`Tidak dapat terhubung ke database '${appConfig.database.database}':`, error.message);
    }
  }


  await server.start();
  console.log(`Server berjalan pada http://${appConfig.server.host}:${appConfig.server.port}`);
  console.log(`Lingkungan saat ini: ${appConfig.env}`);
};

process.on('unhandledRejection', (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

init();