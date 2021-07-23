const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const morgan = require("morgan");

// Db
require("./db");

app.use(cors())
// Load third-party middleware
app.use(morgan("dev"));
// Inbuilt middleware for parsing incoming data
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json()); // (for json)
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const Router = require("./modules/routes");
app.use('/api', Router)

const listener = app.listen(process.env.PORT || 4000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
