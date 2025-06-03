'use strict';

const appConfig = require('../config');

module.exports = {
  development: {
    username: appConfig.environments.development.username,
    password: appConfig.environments.development.password,
    database: appConfig.environments.development.database,
    host: appConfig.environments.development.host,
    port: appConfig.environments.development.port,
    dialect: appConfig.environments.development.dialect,
    logging: appConfig.environments.development.logging,
  },
  test: {
    username: appConfig.environments.test.username,
    password: appConfig.environments.test.password,
    database: appConfig.environments.test.database,
    host: appConfig.environments.test.host,
    port: appConfig.environments.test.port,
    dialect: appConfig.environments.test.dialect,
    logging: appConfig.environments.test.logging,
  },
  production: {
    username: appConfig.environments.production.username,
    password: appConfig.environments.production.password,
    database: appConfig.environments.production.database,
    host: appConfig.environments.production.host,
    port: appConfig.environments.production.port,
    dialect: appConfig.environments.production.dialect,
    logging: appConfig.environments.production.logging,
    // Jika Anda menggunakan dialectOptions untuk production (misalnya SSL)
    // dialectOptions: appConfig.environments.production.dialectOptions || {},
  }
};