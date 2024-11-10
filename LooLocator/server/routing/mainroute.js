const express = require('express');
const router = express.Router();
const database = require('../../private/db')
const path = require('path');
const nodemailer = require('nodemailer');

router.post('/newreview', async (req, res) => {
    const {username, rating, comment, name, address} = req.body;
    const qualifier = name + address;
    let users, bathrooms;
    //create facility first then create a review on that facility
    database.query('INSERT IGNORE INTO facilities (LOCATIONA, ACCESSIBILITY, DIAPER_STATION, RATING, NUMRATINGS) VALUES (?,?,?,?,?)', [qualifier, false, false, rating, 1], (err, result) => {
        if(err){
            console.log(`error creating facility ${qualifier}`);
        }
        database.query(`SELECT USERID FROM users WHERE (USERNAME = '${username}')`, (err, results) => {
            console.log(results);
            if(results[0] == undefined){
                console.log(`couldn't retrieve user ${username}`);
                res.status(200).send({
                    message: 'User is not signed in.'
                });
            }
            users = results[0]["USERID"]
            database.query(`SELECT BATHROOMID FROM facilities WHERE (LOCATIONA = '${qualifier}')`, (err, results) => {
                console.log(results);
                if(results[0] == undefined){
                    console.log(`couldn't retrieve facility ${qualifier}`);
                    return;
                }
                bathrooms = results[0]["BATHROOMID"]
                database.query(`INSERT IGNORE INTO reviews (USERID, FACILITYID, COMMENT) VALUES (?, ?, ?)`, [users, bathrooms, comment], (err) => {
                    if(err){
                        console.log(err);
                    }else{
                        res.status(200).send({
                            success:true
                        });
                    }
                });
            });
        });
    });
});


router.get('/seereview', async (req, res) => {
    const {name, address} = req.query;
    const qualifier = name + address;
    database.query(`SELECT BATHROOMID FROM facilities WHERE (LOCATIONA = '${qualifier}')`, (err, results) => {
        const bathroomid = results[0]["BATHROOMID"];
        if(bathroomid == undefined){
            console.log(`error retrieving reviews for facility ${qualifier}`);
            return;
        }else{
            database.query(`SELECT * FROM reviews WHERE (FACILITYID = ${bathroomid})`, (err, results) => {
                if(results.length == 0){
                    res.status(200).send({
                        message: `No reviews found for facility ${qualifier}`,
                    });
                }else{
                    const userID = results[0]["USERID"];
                    const reviewObj = results[0]["COMMENT"];
                    database.query(`SELECT USERNAME FROM users WHERE (USERID = ${userID})`, (err, results) => {
                        const Username = results[0]["USERNAME"];
                        if(results.length == 0){
                            //bad
                            res.status(500).send({
                                message: 'bad'
                            });
                        }else{
                            database.query(`SELECT RATING FROM facilities WHERE (LOCATIONA = '${qualifier}')`, (err, results) => {
                                const rating = results[0]["RATING"];
                                const data = `[{"username" : "${Username}", "rating": ${rating}, "comment": "${reviewObj}", "name": "${name}", "address": "${address}"}]`;
                                const parsed = JSON.parse(data);
                                console.log(parsed);
                                res.status(200).send(JSON.parse(data));
                            });
                        }
                        
                    });
                }
            });
        }
    });
});

//contact us via email
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Configure the transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // You can use other email services
        auth: {
        user: 'your-email@gmail.com', // Your email address - placeholder
        pass: 'your-email-password'    // Your email password (consider using environment variables for security) - placeholder
        }
    });

    // Configure the email options
    const mailOptions = {
        from: email, // The sender's email address (user's email)
        to: 'destination-email@example.com', // The predetermined email address
        subject: 'Contact Us Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email. Please try again later.' });
    }
});

router.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    // exit and return error if there is a user already with the same credentials
    const check = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM users WHERE (USERNAME = '${username}' OR EMAIL = '${email}')`;    //SQL INJECTION WOHOHOHOHOHOHOHOHOH
        const exists = database.query(query, (err, results) => {
            if(err){
                console.log(`error: ${err}`);
                reject(err);
            }else{
                resolve(results);
                if(results.length != 0){
                    console.log("Username taken");
                    res.status(500).send({
                        success:false,
                        message: 'That username/email is taken.'
                    });
                }else{  
                    console.log("Created");
                    a = false;
                }
            }
        });
    })
    if(check.length != 0){
        return;
    }

    const DATE = new Date();
    const USER = database.query('INSERT INTO users (USERNAME, PWD, EMAIL, JOIN_DATE) VALUES (?,?,?,?)', 
        [username, password, email, DATE] , (error) => {
        if(error){
            console.log(`error creating user: ${username} : ${error}`.bgBlack.red);
            res.status(500).send({
                success:false,
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

router.get(['/login', '/signup', '/contact', '/about', '/mainpage', '/reviews', '/seereview', '/newreview'], async (req, res) => {
    try{
        res.sendFile(path.join(__dirname, '../../dist/index.html'));
    }catch(error){
        console.log(`ERROR IN SENDING VUE PAGE: ${error}`);
        return;
    }
});

module.exports = router;