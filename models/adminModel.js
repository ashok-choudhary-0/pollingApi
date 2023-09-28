const sequelize = require("../dbConnection/dbConnection")
const { DataTypes } = require('sequelize');
const admin = sequelize.define('admin', {
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull:false
  },
  username:{
    type:DataTypes.STRING(100),
    unique:true,
    allowNull:false
  },
  password:{
    type:DataTypes.STRING(100),
    allowNull:false
  },
  confirmPassword:{
    type:DataTypes.STRING(100),
    allowNull:true
  },
  email:{
    type:DataTypes.STRING(100),
    unique:true,
    allowNull:false
  },
  isAdmin:{
    type:DataTypes.BOOLEAN,
    defaultValue:false,
  },
  authenticationToken:{
    type:DataTypes.STRING,
    allowNull:true
  }
},{
  tableName:'admin',
  timestamps:false
});
module.exports = admin;