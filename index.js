require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
// const { engine } = require("express-handlebars");

// ROUTES
const routes = require("./routes");

// LIBRARY
const path = require("path");

// PORT
const PORT = process.env.PORT || 5000;

// PROGRAM OBJECT
const app = express();

// middleware to allow Cross-Origin Resource Sharing fetch (CORS)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Access to domain resources
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, Accept"); // specifying the request type and headers
    res.setHeader("Access-Control-Allow-Credentials", "true"); // can requests transmit cookies, etc
    next();
});

// USE MEDIA FROM 'data'
app.use("/", express.static(path.join(__dirname)));
app.use("/medias", express.static(path.join(__dirname)));

//USE DATA FROM HTML FORM
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

async function start() {
    try {
        await mongoose
            .connect(process.env.DATABASE_URL)
            .then(() => {
                console.log("CONNECTED TO THE MONGO DATABASE");
            })
            .catch((error) => {
                console.error("ERROR:", error);
            });

        // TO START THE SERVER
        app.listen(PORT, () => {
            console.log(`SERVER STARTED AT PORT: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
