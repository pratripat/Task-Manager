import express from 'express';
import cors from 'cors';
import { db } from './startup/db.js';
import { routes } from './startup/routes.js';
import cookieParser from 'cookie-parser';

const app = express();

// Update CORS to allow your frontend origin
// app.use(cors({
//     origin: 'http://localhost:3000', // Your actual frontend port
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

db();
routes(app);

const port = 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
