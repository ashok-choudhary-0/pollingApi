const sequelize = require("../dbConnection/dbConnection")
const { DataTypes } = require('sequelize');

const vote = sequelize.define('vote', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
  },
  pollId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'poll',
      key: 'id',
    },
  },
  optionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'options',
      key: 'id',
    },
  },
}, {
  tableName: 'vote',
  timestamps: false
});
module.exports = vote