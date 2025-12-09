import express from 'express';
import cors from 'cors';
import { FRONT_END_URL } from './config/index.js';

const app = express();

// MIDDLEWARE
app.use(cors({
    origin: FRONT_END_URL,
    credentials: true,
}))

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Tic-Tac-Toe Backend Server Running')
})

export default app;