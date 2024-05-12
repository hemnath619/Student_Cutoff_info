let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();


// Express Route
const dataRoute = require("./route/DataRoute");

// Connecting mongoDB Database
const Mongodb = async()=>{
  try 
  { const conn = await mongoose.connect(process.env.Mongo_url) // provide your mongodb link
                console.log(`Connected to db:${conn.connection.host}`)
  } 
  catch (error) {console.log(`Error in db connection : ${error}`)}
}
Mongodb();


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/", dataRoute);

// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {console.log("Connected to port " + port)});