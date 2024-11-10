// server.js or app.js (your backend file)
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/contact', async (req, res) => {
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
