const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSaintize = require("express-mongo-sanitize");
const xss = require("xss-clean");
require("dotenv").config();
require('express-async-errors');
const app = express();


const userRoutes = require("./routers/userRoutes");
const postRoutes = require("./routers/postRoutes");
const errorMiddleware = require("./middleWares/errorMiddleware.js");
// const authenticate = require("./middleWares/authenticate");
const Limiter = require("./utils/rateLimiter");

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(mongoSaintize());
app.use(xss());
app.use(Limiter);
app.use(errorMiddleware);


// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
// app.use("/posts", authenticate, postRoutes);



// start server
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

mongoose.connect(DB_URI).then(() => {
    console.log("Connect to MongoDB");
    app.listen(PORT, () => console.log("Server is Running"));
})
    .catch(err => console.error("MongoDB Connection Error", err));