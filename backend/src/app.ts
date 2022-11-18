import express from 'express';
import cors from 'cors';
import registerAndLoginRouter from './routes/registerAndLogin.routes';
import balanceRouter from './routes/Balance.routes';
import errorMiddleware from './middlewares/error.middleware';
import transactionRouter from './routes/Transaction.routes';

const app = express();
// cria a aplicação

app.use(cors());
// habilita o cors para que a aplicação possa ser acessada de qualquer lugar

app.use(express.json());
// habilita o uso de json no body das requisições

app.use(registerAndLoginRouter);
// habilita o uso das rotas de registro e login
app.use(balanceRouter);
// habilita o uso das rotas de saldo
app.use(transactionRouter);
// habilita o uso das rotas de transações
app.use(errorMiddleware);
// habilita o uso do middleware de erro

export default app;
