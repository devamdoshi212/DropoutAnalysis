const userModel=require("../Models/UserModel")

async function getUser(req,res){

let data=await userModel.find({})
return data
}

async function addUser(req,res){

    let data=new userModel(req.body)
    await data.save()
    return data
}

module.exports={
    getUser,
    addUser
}