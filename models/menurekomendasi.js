'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MenuRekomendasi extends Model {
    static associate(models) {
      // associations can be defined here
    }
  }
  
  MenuRekomendasi.init({
    kategori: DataTypes.STRING,
    bahan_makanan: DataTypes.TEXT,
    menu_rekomendasi: DataTypes.TEXT,
    deskripsi: DataTypes.TEXT,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'MenuRekomendasi',
    tableName: 'menu_rekomendasi',
  });
  
  return MenuRekomendasi;
};