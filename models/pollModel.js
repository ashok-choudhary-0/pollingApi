const sequelize = require("../dbConnection/dbConnection")
const { DataTypes } = require('sequelize');
const options = require("./optionsModel")
const poll = sequelize.define('poll', {
  pollTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pollOptions: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
    validate:{len:{args:2, message:"Min 2 option should be there to add a poll"}}
  },
}, {
  tableName: 'poll',
  timestamps: false
});
poll.hasMany(options,{foreignKey:id})
module.exports = poll