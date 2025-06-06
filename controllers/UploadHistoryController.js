const { UploadHistory, User } = require('../models');
const Boom = require('@hapi/boom');

class UploadHistoryController {
  async createUploadHistory(req, res) {
    try {
      // Ambil name atau email dari payload
      const { name, email, imageUrl, analysisResult, recommendation } = req.payload;

      // Cari user berdasarkan name atau email
      let user;
      if (email) {
        user = await User.findOne({ where: { email } });
      } else if (name) {
        user = await User.findOne({ where: { name } });
      }

      if (!user) {
        return res.response({
          status: 'fail',
          message: 'User not found'
        }).code(404);
      }

      const history = await UploadHistory.create({
        userId: user.id,
        imageUrl,
        analysisResult: analys  isResult || 'Analysis in progress',
        recommendation: recommendation || 'Recommendation in progress'
      });

      return res.response({
        status: 'success',
        data: history
      }).code(201);
    } catch (error) {
      console.error('Error creating upload history:', error);
      return res.response({
        status: 'error',
        message: error.message || 'Internal server error'
      }).code(500);
    }
  }

  async getUserUploadHistory(req, res) {
    try {
      const { userId } = req.params;
      const userIdInt = parseInt(userId, 10);

      if (isNaN(userIdInt)) {
        return res.response({
          status: 'fail',
          message: 'Invalid userId'
        }).code(400);
      }

      const histories = await UploadHistory.findAll({
        where: { userId: userIdInt },
        order: [['createdAt', 'DESC']]
      });

      return res.response({
        status: 'success',
        data: histories
      });
    } catch (error) {
      console.error('Error getUserUploadHistory:', error);
      return res.response({
        status: 'error',
        message: error.message || 'Internal server error'
      }).code(500);
    }
  }

  async getUploadHistoryDetail(req, res) {
    try {
      const { id } = req.params;

      const history = await UploadHistory.findByPk(id);

      if (!history) {
        return Boom.notFound('Upload history not found');
      }

      return res.response({
        status: 'success',
        data: history
      });
    } catch (error) {
      return Boom.badImplementation(error.message);
    }
  }
}

module.exports = new UploadHistoryController();