const {MongoClient} = require("mongodb");
const { ObjectId } = require("mongodb");

// mongoose.connect("mongodb+srv://uday246r:UDAY246ss@namastenode.uroqj.mongodb.net/student");

module.exports.connectMongo = async() =>{
    try{
        const client = new MongoClient("mongodb+srv://uday246r:UDAY246ss@namastenode.uroqj.mongodb.net/")
        await client.connect()
        const db = client.db("students");
        console.log("db connceted");
        return db;
    } catch(err){
        console.log(err);
    }
}