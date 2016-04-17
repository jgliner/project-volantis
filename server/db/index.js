'use strict';

const Sequelize = require('sequelize');
const path = require('path');
const sequelize = new Sequelize('gameofthrones', null, null, {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'gameofthrones.sqlite'),
});

const User = sequelize.define('User', {
  username: Sequelize.STRING,
  pw: Sequelize.STRING,
  score: Sequelize.INTEGER,
});

const Episode = sequelize.define('Episode', {
  code: Sequelize.INTEGER,
  name: Sequelize.STRING,
  lock: Sequelize.DATE,
  release: Sequelize.DATE,
});

const Prediction = sequelize.define('Prediction', {
  pointVal: Sequelize.INTEGER,
  outcome: Sequelize.INTEGER,
})

const Character = sequelize.define('Character', {
  name: Sequelize.STRING,
});

const Status = sequelize.define('Status', {
  status_condition: Sequelize.STRING,
});

User.belongsToMany(Prediction, { through: 'Users_Predictions' });
Prediction.belongsToMany(User, { through: 'Users_Predictions' });

Character.belongsToMany(Episode, { through: 'Characters_Episodes' });
Episode.belongsToMany(Character, { through: 'Characters_Episodes' });

Prediction.belongsToMany(Episode, { through: 'Predictions_Episodes' });
Episode.belongsToMany(Prediction, { through: 'Predictions_Episodes' });

Character.hasOne(Status);

module.exports = {
  User,
  Episode,
  Prediction,
  Character,
  Status,
  sequelize,
  Sequelize,
};
