const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookiesParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
dotenv.config({path:path.join(__dirname,"config/config.env")});
const connectDatabase = require('./Config/databaseConnection');

connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is listening in Port: ${process.env.PORT}`)
})

app.use(bodyParser.urlencoded({extendedto:true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}));
app.use(cors())

const auth = require('./routes/auth')
const employe = require('./routes/employe')

app.use('/api/v1',auth);
app.use('/api/v1',employe);


module.exports = server