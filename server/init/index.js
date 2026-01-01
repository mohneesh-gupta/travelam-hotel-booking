const mongoose = require("mongoose");
const Listing = require("../models/listing");
const data = require("./data");

const MONGO_URL = process.env.MONGO_URL;

const seedDB = async () => {
  await Listing.deleteMany({});
  const listings = data.map((obj) => ({
    ...obj,
    owner: "68bd89d2282d4aa93dc13471", // existing user id
  }));

  await Listing.insertMany(listings);
  console.log("✅ Database seeded");
};

const runSeed = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Mongo connected (seed)");
    await seedDB();
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
};

module.exports = runSeed;
