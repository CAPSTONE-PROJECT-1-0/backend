'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menu_rekomendasi', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      kategori: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bahan_makanan: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      menu_rekomendasi: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('menu_rekomendasi');
  },
};