'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Nutrition extends Model {
    static associate(models) {
      // Asosiasi bisa ditambahkan di sini jika diperlukan
    }
  }

  Nutrition.init({
    food: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    carbs: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Nutrition',
    tableName: 'nutritions',
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  return Nutrition;
};