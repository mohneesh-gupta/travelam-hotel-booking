class ExpressError extends Error {
    constructor(statusCode, message){
        super();
        this.statusCode=statusCode;
        this.message=message;
    }
}

module.exports = ExpressError;

// require it in app.js