const mongoose = require("mongoose")
async function db_Connection(){
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log(`DATABASE IS CONNECTED SUCCESSFULLY`);
        
    } catch (error) {
        console.log(`DATABASE CONECTION FAILED`+ error);
    }
}

db_Connection()