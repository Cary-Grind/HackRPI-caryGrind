const express = require('express');
const router = express.Router();
const database = require('../../private/db')
const path = require('path');
const nodemailer = require('nodemailer');

//contact us emailer
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

router.get(['/login', '/signup', '/contact', '/about', '/mainpage', '/findtoilets'], async (req, res) => {
    try{
        res.sendFile(path.join(__dirname, '../../dist/index.html'));
    }catch(error){
        console.log(`ERROR IN SENDING VUE PAGE: ${error}`);
        return;
    }
});

module.exports = router;