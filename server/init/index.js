const Listing = require("../models/listing");
const { data: sampleListings } = require("./data");

/**
 * Seed database with initial listings
 * This function assumes MongoDB is already connected
 */
const seedDB = async () => {
  try {
    // Clear existing listings
    await Listing.deleteMany({});

    // Add owner field to each listing
    const listings = sampleListings.map((listing) => ({
      ...listing,
      owner: "68bd89d2282d4aa93dc13471", // existing user ObjectId
    }));

    // Insert new listings
    await Listing.insertMany(listings);

    console.log("🌱 Database seeded successfully");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    throw err;
  }
};

module.exports = seedDB;
