import express from 'express';
import cors from 'cors';
import registerAndLoginRouter from './routes/registerAndLogin.routes';
import balanceRouter from './routes/Balance.routes';
import errorMiddleware from './middlewares/error.middleware';

const app = express();

app.use(cors());

app.use(express.json());

app.use(registerAndLoginRouter);
app.use(balanceRouter);
app.use(errorMiddleware);

export default app;
