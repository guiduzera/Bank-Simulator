import 'dotenv/config';
// habilita o uso de variáveis de ambiente para o resto da aplicação
import app from './app';
// importa a aplicação

const PORT = process.env.APP_PORT || 3001;
// define a porta que a aplicação vai rodar pegando a variável de ambiente APP_PORT ou 3001 caso não exista

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));
// inicia o servidor na porta definida

export default server;
