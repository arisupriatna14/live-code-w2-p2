const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Item = require("../models/items");
const User = require("../models/user");
const { auth } = require('../helpers/auth')

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  User
    .create({ username, password })
    .then(() => {
      res.status(201).json({
        success: true,
        message: `Account ${username} registered`
      });
    })
    .catch(err => {
      res.status(500).json({
        errorRegister: err
      });
    });
});

router.post("/request_token", (req, res) => {
  const { username, password } = req.body;
  User
    .findOne({ username: username })
    .then(result => {
      bcrypt.compare(password, result.password).then(isPassword => {
        if (isPassword) {
          const token = jwt.sign(
            {
              id: result._id,
              username: result.username
            },
            process.env.JWT_SECRET_KEY
          );
          res.status(201).json({
            token: token
          });
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        errorRequestToken: err
      });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  User
    .findOne({ username: username })
    .then(result => {
      bcrypt.compare(password, result.password).then(isPassword => {
        if (isPassword) {
          const token = jwt.sign(
            {
              id: result._id,
              username: result.username
            },
            process.env.JWT_SECRET_KEY
          );
          res.status(201).json({
            status: true,
            message: `User ${username} success login`,
            dataUser: result,
            token: token
          });
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        errorLogin: err
      });
    });
});

router.post('/items', auth, (req, res) => {
  const { name, price, stock, tags } = req.body
  const tagsSplit = tags.split(' ')
  const userId = req.user
  Item
    .create({ 
      name: name, 
      price: price, 
      stock: stock, 
      tags: tagsSplit,
      user: userId 
    })
    .then(result => {
      res.status(201).json({
        message: 'Create item success',
        result
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Create item failed. Try again!',
        error: err
      })
    })
})

router.get('/items', (req, res) => {
  Item
    .find({})
    .then(result => {
      res.status(200).json({
        message: "Get all item success",
        data: result
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Get all item failed. Try again!',
        error: err
      })
    })
})


module.exports = router;
