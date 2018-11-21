const db = require('../models');

//  api/users/:id/tenants
exports.createTenant = async (req, res, next) => {
  try {
    const { name, phone_number, address, financial_debt } = req.body;
    const tenant = await db.Tenant.create({
      name,
      phone_number,
      address,
      financial_debt,
      user: req.params.id,
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.tenants.push(tenant.id);
    await foundUser.save();
    // const foundTenant = await db.Tenant.findById(tenant.id).populate('user', {
    //   username: true
    // });
    let tenantsOfUser = await db.User.findById(req.params.id).sort({ createAt: 'desc' }).populate('tenants', {
      name: true,
      phone_number: true,
      address: true,
      financial_debt: true
    });
    // console.log(`tenantsOfUser ==========> ${tenantsOfUser}`);
    return res.status(200).json(tenantsOfUser);
  } catch (err) {
    return next(err);
  }
};

// GET - /api/users/:id/messages/:message_id
exports.editTenant = async function (req, res, next) {
  try {
    console.log(`params ======> ${req.params}`);
    const tenant = await db.Tenant.findByIdAndUpdate(req.params.tenant_id, req.body);
    return res.status(200).json(tenant);
  } catch (err) {
    return next(err);
  }
};

// // DELETE - /api/users/:id/messages/:message_id

exports.deleteTenant = async function (req, res, next) {
  // console.log(req.params);
  try {
    const foundTenant = await db.Tenant.findById(req.params.tenant_id);
    await foundTenant.remove();
    return res.status(200).json(foundTenant);
  } catch (err) {
    next(err);
  }
};