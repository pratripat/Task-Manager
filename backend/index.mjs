import express from 'express';
import cors from 'cors';
import { db } from './startup/db.js';
import { routes } from './startup/routes.js';
import cookieParser from 'cookie-parser';

const app = express();

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
