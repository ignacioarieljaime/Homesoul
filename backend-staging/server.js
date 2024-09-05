const express = require("express");
const cors = require("cors");
const session = require('express-session');
const http = require("http");
const { errorLogger } = require("./errors/handler");
require("dotenv").config();
const SwaggerUi = require("swagger-ui-express");
const app = express();
const server = http.createServer(app);
const { swaggerSpec } = require("./helpers/swaggerConnection");
const fileUpload = require('express-fileupload');
const { initDbConnection } = require("./helpers/dbConnection")
const fs = require("fs");
const flash = require('connect-flash');
const toastr = require('express-toastr');
var cookieParser = require("cookie-parser");

//Swagger Implements
app.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        persistAuthorization: true,
    },
}));
app.use(flash());
app.use(toastr());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 48 * 60 * 60 * 1000 },
}))

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

// app.use(cors());
app.use(
    cors({
        origin: '*'
    })
);
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(errorLogger);
app.use(fileUpload());
app.use("/uploads", express.static("./uploads"));

// routes
app.use("/api/v1", require("./routes/api"));
app.use("/", require("./routes/backend"));

//uploads folder
const PATH = './uploads';
if (!fs.existsSync(PATH)) {
    fs.mkdirSync(PATH);
}


server.listen(process.env.PORT, () => {
    console.log(`------------------------------------------------------------------------------`);
    console.log(`Listening on ${process.env.BASE_URL}`);
    console.log(`Admin URL :- ${process.env.BASE_URL}`);
    console.log(`Swagger URL :- ${process.env.BASE_URL}/docs`);
    console.log(`------------------------------------------------------------------------------`);
});





module.exports = app;