const express = require('express');
const app = express();
const mongoose = require('mongoose');
const instaApp = require("./Routes/UserInfo")
const userFeed = require("./Routes/Feed")
const cors = require('cors');
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/backEnd', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))


app.use('/',instaApp)
app.use('/feed',userFeed)


app.listen(8080,()=>{
    console.log("app is running on port 8080")
})
