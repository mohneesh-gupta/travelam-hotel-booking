// here we will write the code of initialization

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
require('dotenv').config({ path: '../.env' }); // Load env vars from parent directory if running from init folder, or handle logically. 
// Actually, safer to just try standard config or assume running from server dir? 
// Let's use a robust path lookup or just simple config assuming execution from 'server' folder.
// user runs `node init/index.js` from `server/` usually.
// But let's stick to simple config and I will run it correctly.

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to DB");
})
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

// write a function to initialize database

const initDB = async () => {
    await Listing.deleteMany({});   //deleting all existing data before initializing
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "68bd89d2282d4aa93dc13471" })); // adding owner field in all data
    await Listing.insertMany(initData.data);    // inserting the data key of data.js file
    console.log("data initialized");
}

initDB();   //calling the function
// to run this go to teriminal and change dir to init and then run node index.js