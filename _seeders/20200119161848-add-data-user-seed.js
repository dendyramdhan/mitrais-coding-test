'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Dendy',
      lastName: 'Ramdhan',
      mobileNumber: '081289376509',
      dateOfBirth: '1998-01-18',
      gender: 'male',
      email: 'ramdhandendy@gmail.com',
      password: bcrypt.hashSync('test123', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
