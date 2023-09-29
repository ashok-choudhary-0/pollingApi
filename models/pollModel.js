const sequelize = require("../dbConnection/dbConnection")
const { DataTypes } = require('sequelize');
const options = require("./optionsModel")
const poll = sequelize.define('poll', {
  pollTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'poll',
  timestamps: false
});
poll.hasMany(options, { foreignKey: 'poll_id' })
module.exports = poll