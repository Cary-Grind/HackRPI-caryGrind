const express = require('express');
const router = express.Router();
const database = require('../../private/db')
const path = require('path');

router.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    const DATE = new Date();
    const USER = database.query('INSERT INTO users (USERNAME, PWD, EMAIL, JOIN_DATE) VALUES (?,?,?,?)', 
        [username, email, password, DATE] , (error) => {
        if(error){
            console.log(`error creating user: ${username} : ${error}`.bgBlack.red);
            res.status(500).send({
                success:false
            });
        }else{
            console.log(`created user ${username} successfully`.bgBlack.green);
            res.status(304).send({
                success:true
            });
        }
    });  //dont do this vulnerable to sql injection
});

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html')); //default main page
    // res.sendFile(path.join(__dirname, '<REPLACE WITH ABSOLUTE PATH TO THE STATIC HOMEPAGE>'));
});

router.get('/login', async (req, res) => {
    try{
        res.sendFile(path.join(__dirname, '../../dist/index.html'));
    }catch(error){
        console.log(`ERROR IN SENDING VUE PAGE: ${error}`);
        return;
    }
    // res.sendFile(path.join(__dirname, '../../dist/index.html'));
    // res.render(path.join(__dirname, 'index.html'));
    // res.sendFile(path.join(__dirname, '<REPLACE WITH ABSOLUTE PATH TO THE STATIC HOMEPAGE>'));
});

module.exports = router;