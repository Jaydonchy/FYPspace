//Require Model
const userModel = require('../models/user');


//Methods
const test = (req,res) =>{
    userModel.add("insert via knex")
    .then(id => {
        res.status(200).json(id);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({message:"cannot add post"});
    });
};

//Exports
module.exports ={
    //Method name
    test,
}
