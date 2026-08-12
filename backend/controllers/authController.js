const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15d' });
};

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
if (userExists) {
  if (userExists.isVerified) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Unverified user trying again — resend a fresh OTP instead of blocking
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const otp = generateOtp();

  userExists.name = name;
  userExists.password = hashedPassword;
  userExists.otp = otp;
  userExists.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await userExists.save();

  const message = `
    <h2>Welcome back, ${name}!</h2>
    <p>Please verify your email using the OTP below. It expires in 10 minutes.</p>
    <h1 style="letter-spacing: 4px;">${otp}</h1>
    <br>
    <p>Thank You. Team Mallzy.</p>
  `;

  await sendEmail({
    email: userExists.email,
    subject: 'Mallzy - Verify Your Email.',
    message
  });

  return res.status(200).json({
    message: 'OTP resent. Please check your email.',
    email: userExists.email
  });
}

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry
    });

    if (user) {
      const message = `
        <h2>Welcome to Mallzy, ${name}!</h2>
        <p>Please verify your email using the OTP below. It expires in 10 minutes.</p>
        <h1 style="letter-spacing: 4px;">${otp}</h1>
        <br>
        <p>Thank You. Team Mallzy.</p>
      `;

      await sendEmail({
        email: user.email,
        subject: 'Mallzy - Verify Your Email.',
        message
      });

      res.status(201).json({
        message: 'Registration successful. Please check your email for the OTP.',
        email: user.email
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'Email already verified' });

    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
    }
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'Email already verified' });

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const message = `
      <h2>Your new OTP</h2>
      <p>It expires in 10 minutes.</p>
      <h1 style="letter-spacing: 4px;">${otp}</h1>
      <p>Thank You. Team Mallzy.</p>
    `;
    await sendEmail({ email: user.email, subject: 'ShopNest - New Verification OTP', message });

    res.json({ message: 'A new OTP has been sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.isVerified) {
        return res.status(403).json({
          message: 'Please verify your email before logging in.',
          needsVerification: true,
          email: user.email
        });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUsers, verifyOtp, resendOtp };