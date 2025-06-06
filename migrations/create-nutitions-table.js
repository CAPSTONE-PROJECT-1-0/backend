'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('nutritions', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      food: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      calories: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fat: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      carbs: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      protein: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('nutritions');
  },
};