import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";


dotenv.config();

const app = express();
const PORT = process.env.port || 3001;

//Middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api",userRoutes);

//error handling
app.use(errorHandling);

//Testing postgres connection
app.get("/", async(req,res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`);
})

//server running
app.listen(PORT, () => {
    console.log(`Server running on http:localhost:${PORT}`);
});


