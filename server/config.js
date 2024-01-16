"use strict";

const crypto = require("crypto");
require("dotenv").config();
require("colors");

const generateRandomString = (length) => {
    return crypto.randomBytes(length).toString('hex');
};

const SECRET_KEY = process.env.SECRET_KEY || generateRandomString(32);

const PORT = +process.env.PORT || 3001;

function getDatabaseUri() {
    return (process.env.NODE_ENV === "test")
        ? `postgres://krissy:blink@localhost:5432/swift-test`
        : process.env.DATABASE_URL || `postgres://krissy:blink@localhost:5432/sswift`;
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Swift Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
};

