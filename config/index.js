'use strict';

require('dotenv').config();

const appConfig = {
  // Lingkungan Aplikasi
  env: process.env.NODE_ENV || 'development',

  // Konfigurasi Server Hapi.js
  server: {
    port: parseInt(process.env.PORT, 10) || 3000, // Pastikan port adalah integer
    host: process.env.HOST || 'localhost',
  },

  // Konfigurasi Database Utama (digunakan oleh aplikasi)
  database: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || null, // Harusnya diisi dari .env
    database: process.env.DB_NAME || 'hapi_project_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    dialect: 'postgres', // Atau bisa juga dari process.env.DB_DIALECT
    logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    // Untuk koneksi Sequelize langsung, tambahkan dialectOptions jika perlu
    // dialectOptions: {
    //   ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false,
    // },
  },

  // Kredensial untuk lingkungan spesifik jika diperlukan oleh Sequelize CLI
  // (database/config.js akan merujuk ke sini atau langsung ke process.env untuk override)
  environments: {
    development: {
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_NAME || 'backend_capstone',
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      dialect: 'postgres',
      logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    },
    test: {
      username: process.env.DB_USERNAME_TEST || process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD_TEST || process.env.DB_PASSWORD || null,
      database: process.env.DB_NAME_TEST || `${process.env.DB_NAME || 'hapi_project_dev'}_test`,
      host: process.env.DB_HOST_TEST || process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT_TEST, 10) || 5432,
      dialect: 'postgres',
      logging: false,
    },
    production: {
      username: process.env.DB_USERNAME_PROD, // Wajib dari env var di production
      password: process.env.DB_PASSWORD_PROD, // Wajib dari env var di production
      database: process.env.DB_NAME_PROD,     // Wajib dari env var di production
      host: process.env.DB_HOST_PROD,         // Wajib dari env var di production
      port: parseInt(process.env.DB_PORT_PROD, 10) || 5432,
      dialect: 'postgres',
      logging: false,
      // dialectOptions: {
      //   ssl: { // Contoh jika production PostgreSQL Anda menggunakan SSL
      //     require: true,
      //     rejectUnauthorized: false // Sesuaikan dengan konfigurasi server Anda
      //   }
      // }
    }
  },
  // Tambahkan konfigurasi lain di sini jika perlu JWT
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION || '1h', // Atau bisa diatur dari .env
    maxAgeSec: parseInt(process.env.JWT_MAX_AGE_SEC, 10) || 3600, // Default 1 jam
  },
};

if (!appConfig.database.password && appConfig.env !== 'test') { // Password mungkin null untuk user OS di dev, tapi peringatkan
  console.warn("⚠️  PERINGATAN: Password database (DB_PASSWORD) tidak diatur di file .env atau environment variables.");
}
if (appConfig.env === 'production' && (!appConfig.environments.production.username || !appConfig.environments.production.password || !appConfig.environments.production.database || !appConfig.environments.production.host)) {
    console.error("❌ KESALAHAN: Kredensial database produksi (DB_USERNAME_PROD, DB_PASSWORD_PROD, DB_NAME_PROD, DB_HOST_PROD) wajib diatur di environment variables untuk mode production!");
    // process.exit(1); // Anda mungkin ingin keluar jika konfigurasi penting tidak ada di production
}


module.exports = appConfig;