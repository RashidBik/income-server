const express = require('express');
const contentRouter = require('./routes/content');
const userRouter = require('./routes/user');
const config = require('./config');
// const config = require('config');

const mongoose = require('mongoose');
// const { config } = require('dotenv');
mongoose.set('strictQuery', false);
mongoose.connect(config[1])
.then(()=> console.log('connected to DB'))
.catch(()=> console.log('not Connected to DB'));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    next();
})
app.post("/api/user/content/:id",(req, res, next)=>{
    console.log(req.body);
})
app.use('/api/user', userRouter);
app.use('/api/user/content', contentRouter);

const PORT = 4000 ;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
});