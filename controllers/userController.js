const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const register = async(req, res) => {
  const{firstName,lastName,username,password,confirmPassword,email,isAdmin} = req.body;
  try{
    if(password === confirmPassword){
      if(!firstName || !lastName || !username || !password || !confirmPassword || !email){
        res.status(404).send({message:"Please fill all the required fields"})
      }else{
        const hashedPassword = bcrypt.hashSync(password, 10);
        const addUser= await userModel.create({firstName,lastName,username,password:hashedPassword,email,isAdmin})
        res.status(200).send(addUser)
      }
    }else{
      res.status(401).send({message:"Password and confirmPassword should be same"})
    }
  }catch(err){
    res.status(500).send(err)
  }
}
module.exports = { register }