const sequelize = require("../dbConnection/dbConnection")
const { DataTypes } = require('sequelize');
const options = sequelize.define('options', {
  optionTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'options',
  timestamps: false
});
module.exports = options