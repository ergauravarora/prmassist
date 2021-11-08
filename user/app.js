const express = require('express');
const app = express();
const userRouter =  require('./routes/user');
const notificationRouter =  require('./routes/notification');
const swaggerUI =  require('swagger-ui-express');
const swaggerSpec = require('./swagger.json');
var path = require('path');
const bodyParser = require("body-parser");


app.use('/public', express.static(path.join(__dirname, 'assets')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.use('/user',userRouter)
app.use('/notification',notificationRouter)


var port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;