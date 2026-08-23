require('dotenv').config();
const mongoose=require('mongoose');

const database=async ()=>{
    await mongoose.connect(`mongodb+srv://himanshuchaudhary586:${encodeURIComponent(process.env.PASSWORD)}@cluster0.5vhyl.mongodb.net/Devtinder?appName=Devtinder`);
};
// mongodb+srv://himanshuchaudhary586:*****@cluster0.5vhyl.mongodb.net/?appName=Cluster0

module.exports=database;