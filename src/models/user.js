const db = require('../Helper/knex-connection');

module.exports ={
    add,

}

async function add(data){
    const [id] = await db("posts").insert({title: data});
    return id;
}