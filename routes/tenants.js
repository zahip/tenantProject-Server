const express = require('express');

const router = express.Router({ mergeParams: true });

const { createTenant, editTenant, deleteTenant } = require('../handlers/tenants');

// prefix = /api/users/:id/tenants
router.route('/').post(createTenant);

// prefix = /api/users/:id/tenants/:tenant_id
router.route('/:tenant_id')
  .post(editTenant)
  .delete(deleteTenant);

module.exports = router;
