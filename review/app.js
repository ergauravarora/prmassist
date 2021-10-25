const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger.json');
const reviewRouter = require('./routes/review');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/review',reviewRouter)
var port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
