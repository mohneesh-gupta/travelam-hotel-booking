const express = require("express");
const app = express();
const mongoose = require("mongoose");
//require listing.js data in this file
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const Review = require("./models/review.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
require('dotenv').config();


const session = require("express-session");
const flash = require("connect-flash");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public"))); //to use static files like css

// install express,ejs, mongoose ...

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

//session configuration
const sessionOptions = {
    secret : "mysupersecretcode",
    resave :false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly :true,
    }
};


app.get("/", (req, res) => {
    res.send("hi, I'm root.");
});

//setting up session and flash
app.use(session(sessionOptions));
app.use(flash());

//setting up passport
app.use(passport.initialize()); //initializing passport
app.use(passport.session()); //to use persistent login(user) in the same sessions
passport.use(new LocalStrategy(User.authenticate())); //setting up strategy for authentication
passport.serializeUser(User.serializeUser()); //how to store user in session (store user id in session)
passport.deserializeUser(User.deserializeUser()); //how to get user out of session (unstore user by id in session)





//middleware for flash
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user; //req.user is provided by passport and it contains the currently logged in user
    next();
});


// create models folder -> listing.js
//now creating route for listing


/*-----------creating a test listing data

app.get("/testListing", async (req, res) => {
let sampleListing = new Listing({
    title: "my new home",
    description: "welcome to this home",
    price: 1200,
    location: "Goa",
    country: "India",
});
 await sampleListing.save();
 console.log("sample was saved");
 res.send("successful");
})

----------------------*/


//create init folder -> data.js file -> includes some random data of listings
//create index.js inside init folder

/*--------------[[[  models -> listing.js me schema hai  -->>  data.js me data ka array hai  -->>
                     index.js me data import krke call krne pe data store ho jata hai database me]]]--------------------*/


//routes folder -> listing.js file -> all routes related to listings
//routes folder -> review.js file -> all routes related to reviews
// DESTRUCTURING
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);




//<<<----NOW we will start applying style. for that install and require ejs-mate, it helps in templating
// //set engine for using ejs-mate for templating------>>>>>>>

// create layouts folder in views folder ->  create a boilerplate.ejs file in layouts folder -> add header and footer in it

//create public->css folder and create style.css file -> join the static directory in app.js file
//write all the css in style.css file and link it in boilerplate.ejs file
// adding bootstrap to the project in boilerplate.ejs file

//create views-> includes -> navbar.ejs
// adding bootstrap and font awesome


//404 page route -> always keep it at the end of all routes
// app.all("*", (req, res, next) => {
//     next(new ExpressError("Page Not Found", 404));
// });

//middleware for error handling
app.use((err, req, res, next) => {
    let {statusCode=500, message="Something went wrong!"} =err;
    res.status(statusCode).send(message);
});

//create utils folder -> wrapAsync.js for utility packages, error class, wrapAsync etc

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});