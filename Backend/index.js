const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./connection');
const routerAPI = require('./router/api');
const app = express();  



app.use(express.json());
app.use(bodyParser.json());

app.use('/api' , routerAPI);

connection('mongodb://localhost:27017/KickBoard').then(()=>{
    console.log("Connection Sucessfully Database");
    
}).catch((error)=>{
    console.log("Connection Faild to data base");
    
})
app.listen(4004 , ()=>{
    console.log("Server is Running on the 4004");
    
});