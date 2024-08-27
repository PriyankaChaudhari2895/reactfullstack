require('dotenv').config();
const express = require('express');
const app =  express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const  adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');
// lets tackle cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, PATCH, DELETE",
    credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));


app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use(errorMiddleware);

// lets define admin rout
app.use("/api/admin", adminRoute);



// app.get("/", (req, res) => {
// res.status(200).send('Welcome to our MERN PROJECT');
// }); 

// app.get("/register", (req, res) => {
//     res.status(200).send("Welcome to the registration page");
//     }); 

const PORT = process.env.PORT|| 5000;
 connectDb().then(() => {

app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`);
});
 });
