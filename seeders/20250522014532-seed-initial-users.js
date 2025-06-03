'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const hashedPassword1 = await bcrypt.hash('password123', 10);
   const hashedPassword2 = await bcrypt.hash('password456', 10);
   
    await queryInterface.bulkInsert('users', [{
      nama_lengkap: 'John Doe',
      email: 'john.doe@gmail.com',
      password: hashedPassword1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nama_lengkap: 'Jane Smith',
      email: 'jane.smith@gmail.com',
      password: hashedPassword2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
