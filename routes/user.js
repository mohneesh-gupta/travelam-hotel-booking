const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const { authenticate } = require("passport");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

//render register form

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try{
        let {email, username, password} = req.body;
        const newUser = new User({email, username});
        let registeredUser = await User.register(newUser, password); //register method comes from passport-local-mongoose package[automatically checks for duplicate username]
        console.log(registeredUser);
        await req.login(registeredUser, (err) => { //login method comes from passport package
            if(err) return next(err);
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        });
        
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

//render login form
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), async (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect(res.locals.redirectUrl || "/listings");
});

//logout route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are Logged out!");
        res.redirect("/listings");
    });
});



module.exports = router;