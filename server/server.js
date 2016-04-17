'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// relative path for static assets only
app.use(express.static(path.join(__dirname, '../client')));

require('./routes.js')(app, express);

const port = process.env.PORT || 6001;

const init = require('./db/testData.js');

init().then(() => {
  console.log(`Server is listening on port ${port}`);
  app.listen(port);
});

module.exports = app;
