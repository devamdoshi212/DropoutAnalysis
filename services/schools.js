const schoolModel=require("../Models/SchoolModel")

async function getschool(req,res){

let data=await schoolModel.find({})
return data;
}

async function addschool(req,res){

    let data=new schoolModel(req.body)
    await data.save()
    return data;
}

module.exports={
    getschool,
    addschool
}