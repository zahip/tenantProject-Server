const jwt = require('jsonwebtoken');
const db = require('../models');

exports.login = async (req, res, next) => {
  // finding a user
  try {
    const user = await db.User.findOne({
      username: req.body.username,
    });
    const { id, username } = user;
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      const token = jwt.sign(
        {
          id,
          username,
        },
        process.env.SECRET_KEY,
      );
      db.Events.create({
        user: user,
        event: "login",
        timestamps: new Date()
      })
      return res.status(200).json({
        id,
        username,
        token,
      });
    }
    return next({
      status: 400,
      message: 'Invalid Username/Password.',
    });
  } catch (err) {
    return next({
      status: 400,
      message: 'Invalid Username/Password.',
    });
  }
};


exports.signup = async (req, res, next) => {
  try {
    // create a user
    const user = await db.User.create(req.body);
    const { id, username } = user;
    // create a token
    const token = jwt.sign({
      id,
      username,
    }, process.env.SECRET_KEY);
    db.Events.create({
      user: user,
      event: "signup",
      timestamps: new Date()
    })
    return res.status(200).json({ // 200 ok
      id,
      username,
      token,
    });
  } catch (err) {
    // if a validation fails!
    if (err.code === 11000) {
      err.message = 'Sorry, that username and/or email is taken';
    }

    return next({
      status: 400, // bad request
      message: err.message,
    });
  }
};
