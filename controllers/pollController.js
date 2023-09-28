const addNewPoll = (req,res) =>{
  const {title,options} = req.body;
  if(!title){
    res.status(404).send({message:"Poll title can not be empty"})
  }else if(options.length<2){
    res.status(404).send({message:"Poll options should be atleast 2"})
  }

}
module.exports = {addNewPoll}