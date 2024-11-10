const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connection = require('../private/db');
const mainrouter = require('./routing/mainroute');
const path = require('path');
const fs = require('fs');
const https = require('https');

dotenv.config({
    path: '../private/.env'
});

const io = express();
const options = {
    key: fs.readFileSync(path.join(__dirname, '../private/server.key')),
    cert: fs.readFileSync(path.join(__dirname, '../private/server.crt'))
};


//middlewares
io.use(morgan("dev"));
io.use(express.json());
io.set('view engine', 'vue');
io.use(express.static('../dist'));
io.use(express.static('../public'));

//load env variables
const PORT = process.env.PORT;
const IP = process.env.IP;

//setup

https.createServer(options, io).listen(PORT, IP ,() => {
    console.log(`server on port ${PORT} on ip ${IP}`.bgBlack.green);
});

//attempt to connect
connection.connect(error => {
    if(error){
        console.log(`error connecting to sql db ${error}`.bgBlack.red);
        return;
    }else{
        console.log("connected to local sql instance".bgBlack.green);
    }
});

//load/crate tables
(async function startSQL() {
    const script = await fs.promises.readFile(path.join(__dirname, './scripts/create.sql'), 'utf-8');

    connection.query(script, (error, results) => {
        if(error){
            console.log(`error creating/loading database: ${error}`.bgBlack.red);
            return;
        }else{
            console.log('connected database successfully'.bgBlack.green);
        }
        // console.log(results);
    });
})();

//send all requests to the main router
io.use('/', mainrouter);