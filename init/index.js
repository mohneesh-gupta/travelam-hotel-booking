// here we will write the code of initialization

const mongoose = require("mongoose");
const initData = require("./data.js"); // file in the same folder [[importing the data exported fromm other file]]
const Listing = require("../models/listing.js"); // file in the another folder... [[Listing is the schema]]

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then( () => {
    console.log("connected to DB");
    })
    .catch( (err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URL);
}

// write a function to initialize database

const initDB = async () => {
    await Listing.deleteMany({});   //deleting all existing data before initializing
    initData.data = initData.data.map((obj) => ({...obj, owner:"68bd89d2282d4aa93dc13471"})); // adding owner field in all data
    await Listing.insertMany(initData.data);    // inserting the data key of data.js file
    console.log("data initialized");
}

initDB();   //calling the function
// to run this go to teriminal and change dir to init and then run node index.js