const { log } = require('console');
const userController = require('../controller/userController');

const register = async (req, res) => {
    const { username, email, password } = req.body;
     console.log("** Register", req.body);
     
    try {
      const user = await userService.registerUser(username, email, password);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const { user, token } = await userService.loginUser(email, password);
      res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  module.exports = {
    register,
    login
  }