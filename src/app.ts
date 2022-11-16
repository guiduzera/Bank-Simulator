import express from 'express';
import cors from 'cors';
import registerRouter from './routes/register.routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/register', registerRouter);
app.use(errorMiddleware);

export default app;
