const express = require('express');
const app = express();
const clubRouter =  require('./routes/club');
const swaggerUI =  require('swagger-ui-express');
const swaggerSpec = require('./swagger.json');
const pug = require('pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'pug')

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get('/', (req, res) => {

  var pugObj = {
    "id": "PRM-BOOKING-452",
    "userId": "USER1234",
    "name": "Gaurav Arora",
    "flightConfirmationDetails": {
    "origin": "DUB",
    "destination": "DXB",
    "carrierCode": "162",
    "flightNumber": "EK",
    "departureDate": "2021-10-05"
    },
    "status": "idle",
    "originConfirmed": true,
    "destinationConfirmed": true,
    "assistance": [
    "BLND","MAAS"
    ] }

  res.render('index', pugObj);

 // res.send("ok")
});


app.use('/club',clubRouter)


var port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;