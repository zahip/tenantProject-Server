require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const tenantsRoutes = require('./routes/tenants');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
const db = require('./models');

const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// all routes here
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/tenants', loginRequired, ensureCorrectUser, tenantsRoutes);

app.get('/api/:id/tenants', loginRequired, async (req, res, next) => {
  try {
    const tenantsOfUser = await db.User.findById(req.params.id).sort({ createAt: 'desc'}).populate('tenants', {
      name: true,
      phone_number: true,
      address: true,
      financial_debt: true,
    });
    return res.status(200).json(tenantsOfUser.tenants);
  } catch (err) {
    return next(err);
  }
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404; // the page not found;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
