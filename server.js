const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const patientRoutes = require("./routes/patientRoutes");
app.use("/api", patientRoutes);

app.get("/", (req,res)=>{
res.sendFile(path.join(__dirname,"public","index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
console.log("Server running on port " + PORT);
});