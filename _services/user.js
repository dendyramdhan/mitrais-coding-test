const User = require('../_models/index').User;
const config = require('../_configs/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  async authenticate({ email, password }) {
    const user = await User.findOne({ 
      where: { email },
      attributes: ['id', 'email', 'password']
    });
    
    if (user && bcrypt.compareSync(password, user.dataValues.password)) {
      const token = jwt.sign({ sub: user.id }, config.secret);
      return {
          token
      };
    }
  },
  async getAll() {
    return await User
      .findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
      });
  },
  async getById(id) {
    return await User.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    });
  },
  async create(userParam) {
      // validate
      if (await User.findOne({ 
        where: { email: userParam.email },
        attributes: ['email']
      })) throw 'Email "' + userParam.email + '" is already taken';

      // hash password
      if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
      }

      // save user
      return await User.create(userParam);
  }
};