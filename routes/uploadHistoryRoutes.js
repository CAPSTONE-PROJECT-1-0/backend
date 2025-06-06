const UploadHistoryController = require('../controllers/UploadHistoryController');
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/upload-history',
    handler: UploadHistoryController.createUploadHistory,
    options: {
      auth: 'jwt',
      validate: {
        payload: Joi.object({
          email: Joi.string().email().optional(),
          nama_lengkap: Joi.string().optional(),
          imageUrl: Joi.string().uri().required(),
          analysisResult: Joi.string().optional(),
          recommendation: Joi.string().optional()
        }).or('email', 'nama_lengkap') // salah satu wajib ada
      }
    }
  },
  {
    method: 'GET',
    path: '/upload-history/user/{userId}',
    handler: UploadHistoryController.getUserUploadHistory,
    options: {
      auth: 'jwt',
      validate: {
        params: Joi.object({
          userId: Joi.number().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/upload-history/{id}',
    handler: UploadHistoryController.getUploadHistoryDetail,
    options: {
      auth: 'jwt',
      validate: {
        params: Joi.object({
          id: Joi.number().required()
        })
      }
    }
  }
];