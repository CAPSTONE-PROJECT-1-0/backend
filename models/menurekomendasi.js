'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MenuRekomendasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definisikan asosiasi di sini
      // Contoh:
      // MenuRekomendasi.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      // MenuRekomendasi.hasMany(models.Post, { foreignKey: 'authorId', as: 'posts' });
    }
  }
  MenuRekomendasi.init({
    // Kolom 'id' standar, umumnya dibutuhkan
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    // Tambahkan definisi atribut (kolom) lain untuk model MenuRekomendasi di sini:
    // Contoh:
    // namaAttribute: {
    //   type: DataTypes.STRING,
    //   allowNull: false, // atau true jika opsional
    //   unique: true, // jika nilainya harus unik
    //   validate: { // contoh validasi
    //     notEmpty: {
    //       msg: 'Nama attribute tidak boleh kosong'
    //     },
    //     len: {
    //       args: [3, 255],
    //       msg: 'Nama attribute harus antara 3 dan 255 karakter'
    //     }
    //   }
    // },
    // attributeLain: {
    //   type: DataTypes.TEXT,
    //   defaultValue: 'Nilai default jika ada'
    // }
    // Anda bisa menghapus contoh 'id' di atas jika model Anda tidak memerlukan 'id'
    // atau jika Anda ingin mendefinisikannya secara berbeda.
  }, {
    sequelize,
    modelName: 'MenuRekomendasi', // Nama model (singular, PascalCase)
    tableName: 'menurekomendasis', // Nama tabel di database (plural, snake_case atau sesuai konvensi Anda)
    timestamps: true,      // Secara otomatis menambahkan kolom createdAt dan updatedAt
    // paranoid: true,     // Uncomment jika ingin menggunakan soft deletes (menambahkan kolom deletedAt)
    // underscored: true,  // Uncomment jika ingin nama kolom otomatis menjadi snake_case (misal, userId bukan userId)
  });
  return MenuRekomendasi;
};