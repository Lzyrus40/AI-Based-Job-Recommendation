import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRouter from './routes/user.routes.js';
import jobRouter from './routes/jobs.routes.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/v1",userRouter,jobRouter)
connectDB();


try {
    app.listen(PORT, () => {
        console.log(`✅Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.log(error.message);
}
