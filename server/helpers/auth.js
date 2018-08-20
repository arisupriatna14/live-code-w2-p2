const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = {
  auth: (req, res, next) => {
    const { authorization } = req.headers
    const tokenSplit = authorization.split('Basic ')[1]
    const decoded = jwt.verify(tokenSplit, process.env.JWT_SECRET_KEY)
    
    User
      .findById({ _id: decoded.id })
      .then(result => {
        req.user = result._id 
        next()
      })
      .catch(err => {
        res.status(401).json({
          message: "Anda tidak memiliki akses untuk menambahkan item"
        })
      })
  }
}