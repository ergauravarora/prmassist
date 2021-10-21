const express = require('express');
const app = express();
const clubRouter =  require('./routes/club');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('App is working'))
app.use('/club',clubRouter)

var port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;