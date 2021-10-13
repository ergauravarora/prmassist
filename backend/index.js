import express from "express";
import rootRouter from "./src/router/rootRouter.js";


const app = express()

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/Upload', express.static('Upload'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization");
    next();
  });


  app.get('/', (req, res) => res.send('App is working'))

  // this is for test only
  app.get('/home', (req, res) => res.send('Home is working'))

  app.use('/api', rootRouter);
  var port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))

export default app