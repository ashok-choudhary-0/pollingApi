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
  totalVoted: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
}, {
  tableName: 'options',
  timestamps: false
});
module.exports = options