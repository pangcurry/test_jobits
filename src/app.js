const express = require('express');
const logger = require('morgan');
const { sequelize } = require('./models');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());

app.set('jwt-secret',process.env.JWT_SECRET);
app.set('refresh-secret',process.env.REFRESH_SECRET);
app.set('crypto-secret',process.env.CRYPTO_SECRET);

sequelize.sync();

app.use('/', require('./routes'));

app.listen(port, () => {//3000
  console.log("Server is starting at 3000 port.");
});
