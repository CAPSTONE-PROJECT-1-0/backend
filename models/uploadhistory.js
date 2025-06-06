'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UploadHistory extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }
  
  UploadHistory.init({
    userId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    analysisResult: DataTypes.TEXT,
    recommendation: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'UploadHistory',
  });
  
  return UploadHistory;
};