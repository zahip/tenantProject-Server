require('dotenv').load();
const jwt = require('jsonwebtoken'); //  jwt use callbacks
// const db = require('../models');

// make sure the user is logged - Authentication
exports.loginRequired = function (req, res, next) {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1]; // Bearer njgfnbkjbgf
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        return next();
      }
      return next({
        status: 401,
        message: 'Please log in first',
      });
    });
  } catch (e) {
    return next({
      status: 401,
      message: 'Please log in first',
    });
  }
};

// make sure we get the correct user - Authorization

exports.ensureCorrectUser = function (req, res, next) {
  try {
    // console.log(req.params);
    const token = req.headers.authorization.split(" ")[1]; // Bearer njgfnbkjbgf
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'Unauthorized',
        });
      }
    });
  } catch (e) {
    return next({
      status: 401,
      message: 'Unauthorized',
    });
  }
};
