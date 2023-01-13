const express = require('express');
const path = require('path');

const productRoutes = require('./routes/product');
const kanapRoutes = require("./routes/kanap");

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/images', express.static(path.join(__dirname, 'PUBLIC/KANAP-PUBLIC/images')));
app.use(express.static(path.join(__dirname, 'PUBLIC')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ROUTE KANAP 
app.use("/Kanap", kanapRoutes)
app.use('/api/products', productRoutes);



module.exports = app;
