import express from 'express';
import apiRoutes from '../routes';
import connectToDb from '../database';
import cors from 'cors';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', apiRoutes);

connectToDb();

export default app;