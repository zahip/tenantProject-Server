// responsible connecting to mongo and setting for mongoose
const mongoose = require('mongoose');

mongoose.set('debug', true); // see the actual mongo query in the terminal
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/tenants', {
  keepAlive: true,
  useNewUrlParser: true,
});

module.exports.User = require('./user');
module.exports.Tenant = require('./tenant');
module.exports.Events = require('./events');

