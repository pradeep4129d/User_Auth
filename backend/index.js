const express= require('express');
const mongoose=require('mongoose')
const router=require('./routes/auth-route.js')
const path = require('path');
require('dotenv').config();

const app=express()
app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
  });

app.use(express.static('C:\\Users\\Pradeep\\OneDrive\\Desktop\\user-authentication\\frontend\\dist'));

//auth-routes
app.use('/Auth',router)

app.get('*', (req, res) => {
  res.sendFile(path.join('C:\\Users\\Pradeep\\OneDrive\\Desktop\\user-authentication\\frontend\\dist','index.html'));
});

mongoose.connect(process.env.CON)

app.listen(3000,()=>{
    console.log('server is running')
})