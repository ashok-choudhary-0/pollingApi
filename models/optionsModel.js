const sequelize = require("../dbConnection/dbConnection")
const { DataTypes } = require('sequelize');
const options = sequelize.define('options', {
  optionTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poll_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'poll',
      key: 'id'
    }
  },
  markOption:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }
}, {
  tableName: 'options',
  timestamps: false
});
module.exports = options