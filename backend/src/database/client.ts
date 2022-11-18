// arquivo de configuração do banco de dados
// habilita o client do banco de dados para ser usado no resto da aplicação
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;
