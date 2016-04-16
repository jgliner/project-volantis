'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

const port = process.env.PORT || 7001;

console.log(`server running on port ${port}`);
// start listening to requests on port 7001
app.listen(port);
