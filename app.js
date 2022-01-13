var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var nocache = require('nocache');
require("dotenv").config();

var indexRouter = require('./routes/index');
const openDBConnection = require("./helpers/db");

const uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

async function main() {
    try {
        // koneksi ke database
        await openDBConnection(uri);

        const app = express();
        app.use(logger('dev'));
        app.use(express.json());
        app.use(cors());
        app.use(nocache());
        app.use(express.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(indexRouter);
    
        app.listen(port, () => {
            console.log("server is listening on port", port);
        })
    } catch(error) {
        console.log("Error :", error);
    }
    
}

main();