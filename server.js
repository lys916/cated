const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const orderRouter = require('./order/OrderRoutes');
// const dailyFoodRouter = require('./dailyFood/DailyFoodRoutes');
// const customFoodRouter = require('./customFood/CustomFoodRoutes');
// const systemFoodRouter = require('./systemFood/SystemFoodRoutes');

// const { addSystemFood } = require('./util_functions');

const server = express();

// const corsOptions = {
//   "origin": (
//     //  "https://simple-count.herokuapp.com"
//       "http://localhost:3000"
//   ),
//   "credentials": true,
// };

server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

mongoose
  .connect('mongodb://lys:lys916@ds149742.mlab.com:49742/get-fit')
  .then(conn => {
    console.log('connected to mongo get-fit/cated');
  })
  .catch(err => {
    console.log('error connect to mongo');
});

// server.use('/user', userRoutes);
// server.use('/dailyFood', dailyFoodRouter);
server.use('/order', orderRouter);
// server.use('/systemFood', systemFoodRouter);

// serve static assets if we're in production
// if(process.env.NODE_ENV === 'production'){
  // set static folder
  server.use(express.static('client/build'));

  // any request that we get, load the index html static file
  server.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
// }

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
  // uncomment and restart server to add system foods
  // addSystemFood(); 
});
