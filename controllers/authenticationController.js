const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel');
const registerAdmin = async(req, res) => {
  const{firstName,lastName,username,password,confirmPassword,email,isAdmin} = req.body;
  try{
    if(password === confirmPassword){
      if(!firstName || !lastName || !username || !password || !confirmPassword || !email){
        res.status(404).send({message:"Please fill all the required fields"})
      }else{
        const hashedPassword = bcrypt.hashSync(password, 10);
        const addAdmin= await adminModel.create({firstName,lastName,username,password:hashedPassword,email,isAdmin})
        res.status(200).send({message:"Admin created successfully",addAdmin})
      }
    }else{
      res.status(401).send({message:"Password and confirmPassword should be same"})
    }
  }catch(err){
    res.status(500).send(err)
  }
}
module.exports = { registerAdmin}