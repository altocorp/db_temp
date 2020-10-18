const express = require("express");

const app = express();

const mongoose = require('mongoose');

require('dotenv/config');

const postsRoute = require('./routes/posts');

const bodyparser = require('body-parser');

//give access to an external API
// const cors = require('cors');


// app.use(cors());
app.use(bodyparser.json());

app.use('/posts', postsRoute);

app.get('/', (req, res) => {
    res.send('Hello World')
});

mongoose.connect(
process.env.DB_CONNECTION, 
{ useNewUrlParser: true, useUnifiedTopology: true }, 
() => {
    console.log('connected!')
})

app.listen(3000);


