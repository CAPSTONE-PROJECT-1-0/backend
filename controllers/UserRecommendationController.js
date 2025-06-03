'use strict';

// const { MenuRekomendasi } = require('../models'); // Uncomment dan sesuaikan jika model sudah ada

/**
 * Menampilkan daftar semua resource.
 * GET /resources
 */
const index = async (request, h) => {
  try {
    // const data = await MenuRekomendasi.findAll();
    // return h.response(data).code(200);
    return h.response({ message: `MenuRekomendasiController - Index: Tampilkan semua menurekomendasis` }).code(200);
    } catch (error) {
        console.error('Error di MenuRekomendasiController.index:', error);
        return h.response({ status: 'error', message: 'Terjadi kesalahan internal server' }).code(500);
    }
};
/**
 * Menyimpan resource baru.
 * POST /resources
 */
const store = async (request, h) => {
  try {
    // const newData = await MenuRekomendasi.create(request.payload);
    // return h.response(newData).code(201);
    return h.response({ message: `MenuRekomendasiController - Store: Buat MenuRekomendasi baru, data: request.payload` }).code(201);
    } catch (error) {
        console.error('Error di MenuRekomendasiController.store:', error);
        // Handle validation errors (jika ada dari Sequelize)
        if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(err => ({ field: err.path, message: err.message }));
        return h.response({ status: 'fail', message: 'Data tidak valid', errors }).code(400);
    }
    return h.response({ status: 'error', message: 'Terjadi kesalahan internal server' }).code(500);
    }
};
/**
 * Menampilkan resource spesifik berdasarkan ID.
 * GET /resources/{id}
 */
const show = async (request, h) => {
  try {
    const { id } = request.params;
    // const data = await MenuRekomendasi.findByPk(id);
    // if (!data) {
    //   return h.response({ message: 'MenuRekomendasi tidak ditemukan' }).code(404);
    // }
    // return h.response(data).code(200);
    return h.response({ message: `MenuRekomendasiController - Show: Tampilkan MenuRekomendasi dengan ID ${id}` }).code(200);
    } catch (error) {
        console.error('Error di MenuRekomendasiController.show:', error);
        return h.response({ status: 'error', message: 'Terjadi kesalahan internal server' }).code(500);
    }
};
/**
 * Memperbarui resource spesifik berdasarkan ID.
 * PUT /resources/{id}
 * PATCH /resources/{id}
 */
const update = async (request, h) => {
  try {
    const { id } = request.params;
    // const [updatedRows] = await MenuRekomendasi.update(request.payload, { where: { id } });
    // if (updatedRows === 0) {
    // return h.response({ message: 'MenuRekomendasi tidak ditemukan atau tidak ada perubahan' }).code(404);
    // }
    // const updatedData = await MenuRekomendasi.findByPk(id);
    // return h.response(updatedData).code(200);
    return h.response({ message: `MenuRekomendasiController - Update: Perbarui MenuRekomendasi dengan ID ${id}`, data: request.payload }).code(200);
    } catch (error) {
        console.error('Error di MenuRekomendasiController.update:', error);
        if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(err => ({ field: err.path, message: err.message }));
        return h.response({ status: 'fail', message: 'Data tidak valid', errors }).code(400);
    }
    return h.response({ status: 'error', message: 'Terjadi kesalahan internal server' }).code(500);
    }
};
/**
 * Menghapus resource spesifik berdasarkan ID.
 * DELETE /resources/{id}
 */
const destroy = async (request, h) => {
  try {
    const { id } = request.params;
    // const deletedRows = await MenuRekomendasi.destroy({ where: { id } });
    // if (deletedRows === 0) {
    //   return h.response({ message: 'MenuRekomendasi tidak ditemukan' }).code(404);
    // }
    // return h.response({ message: 'MenuRekomendasi berhasil dihapus' }).code(200); // atau 204 No Content
    return h.response({ message: `MenuRekomendasiController - Destroy: Hapus MenuRekomendasi dengan ID ${id}` }).code(200);
    } catch (error) {
        console.error('Error di MenuRekomendasiController.destroy:', error);
        return h.response({ status: 'error', message: 'Terjadi kesalahan internal server' }).code(500);
    }
};
module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};