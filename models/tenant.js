const mongoose = require('mongoose');
const User = require('./user');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  financial_debt: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

tenantSchema.pre('remove', async function (next) {
  try {
    // find a user
    const user = await User.findById(this.user);
    // remove the id of the tenant from their tenants list
    user.tenants.remove(this.id);
    // save that user
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

const Tenant = mongoose.model('Tenant', tenantSchema);
module.exports = Tenant;
