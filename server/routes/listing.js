const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { isLoggedIn, isOwner } = require("../middleware.js");

// JOI validation middleware

const validateListing = (req, res, next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};







// HAR JAGAH APP -> LISTING KAR DO [APP.JS -> LISTING.JS]





// creating home index route /listings
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});    //render index.ejs and parse allListings when there is a request at /listings-------->
    //  ejs files will be in views folder
});

/*<<------create views folder -> listings folder for listing related ejs files -> create index.ejs
        ->>> join, set and require ejs and path in top of this file------------->>  */



// NEW route for adding new listing
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});


// show route for showing a particular data-----------> create show.ejs in listings folder
router.get("/:id", wrapAsync(async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate: { path: "author"},}).populate("owner"); //gather info of the listing with help of id [populate-> id se data nikalna in review]
    if(!listing){
        req.flash("error", "Requested listing not found!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}));


/*<<-----add a button in the index.ejs page to add a new listing &&
                 create a new.ejs file in the views/listings folder---->>*/

//------------IMP-> new route ko show route se uper rakhna kyuki /new ko wo /id le rha hai------

//create route -> upload data to the database
router.post("/", isLoggedIn, wrapAsync( async (req, res, next) => {
        const newListing = new Listing(req.body.listing);//listing object banaya and uske keys hai title, desc etc...
        newListing.owner = req.user._id;
        await newListing.save();
        req.flash("success", "new listing created!");
        res.redirect("/listings");
})
);


/*<<-----add anchor tag in the show.ejs page to add edit the listing &&
                 create an edit.ejs file in the views/listings folder---->>*/

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Requested listing not found!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
}));
//to convert post method to update method we will install and require method-override package
//      -------> npm i method-override

//update route
router.put("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});    //deconstructing the values from this JS object
    //      (converting to individual values)
    req.flash("success", "listing updated!");
    res.redirect(`/listings/${id}`);
}));

//delete route -> create a button in show.ejs file
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async(req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted!");
    res.redirect("/listings");
}));


module.exports = router;