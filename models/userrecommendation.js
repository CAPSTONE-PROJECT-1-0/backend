'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRecommendation extends Model {
    static associate(models) {
      UserRecommendation.belongsTo(models.User, {
        foreignKey: 'id_user',
        as: 'user', 
      });
    }
  }
  UserRecommendation.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_user: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    gambar: { 
      type: DataTypes.TEXT, 
      allowNull: true,
    },
    prediksi: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'UserRecommendation',
    tableName: 'user_recommendations',
    timestamps: true,
  });
  return UserRecommendation;
};