// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const nodemailer = require('nodemailer');

app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', {
  username: String,
  password: String,
});

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
  try {
    // To get username and password
    const { username, password } = req.body;

    // search user from database
    const user = await User.findOne({ username });

    // check user exist and password correct
    if (user && user.password === password) {
      res.send({ success: true, message: "Login successful!" });
    } else {
      res.status(400).send({ success: false, message: "Incorrect username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ success: false, message: "Error during login." });
  }
});

app.post('/register', async (req, res) => {
  console.log("Received a registration request.");
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password, 
    });
    await user.save();
    res.send({ message: 'Registration successful!' });
  } catch (error) {
    res.status(500).send({ message: 'Error during registration.' });
  }
});

app.post('/forgot-password', async (req, res) => {
  try {
      const { username, email } = req.body;

      const user = await User.findOne({ username });

      if (!user) {
          return res.status(400).send({ message: 'User not found with the given username' });
      }

      // 设置 nodemailer transporter (此为使用 Gmail 的示例)
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'yourEmail@gmail.com',
              pass: 'yourPassword'
          }
      });

      let mailOptions = {
          from: 'yourEmail@gmail.com',
          to: email,
          subject: 'Your Password',
          text: `Hello ${username}, your password is: ${user.password}` // 注意: 在生产中，不建议明文发送密码
      };

      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
              console.log(error);
              res.status(500).send({ message: 'Failed to send email' });
          } else {
              res.send({ message: 'Email sent: ' + info.response });
          }
      });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ message: "Error processing request." });
  }
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://172.20.10.5:3000');
});

