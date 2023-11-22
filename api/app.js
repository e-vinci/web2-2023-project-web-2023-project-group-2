const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:8080',
};

const usersRouter = require('./routes/users');
const upgradeRouter = require('./routes/upgrades');
const authsRouter = require('./routes/auths');
const clickerRouter = require('./routes/clicker');
const usersUpgradesRouter = require('./routes/user_upgrades');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/users', usersRouter);
app.use('/upgrades', upgradeRouter);
app.use('/auths', authsRouter);
app.use('/upgrades', cors(corsOptions), upgradeRouter);
app.use('/clicker', clickerRouter);
app.use('/users_upgrades', usersUpgradesRouter);

module.exports = app;
