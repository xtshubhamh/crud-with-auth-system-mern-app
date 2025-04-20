const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// Set token in HTTP-only cookie
const sendToken = (user, res, statusCode = 200) => {
  const token = generateToken(user._id);
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });
  res.status(statusCode).json({ message: "Success", user: { id: user._id, name: user.name, email: user.email } });
};

// @Register
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'User already exists' });

  const user = await User.create({ name, email, password });
  sendToken(user, res, 201);
};

// @Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  sendToken(user, res);
};

// @Logout
exports.logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out' });
};

// @Get Me (protected)
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};
