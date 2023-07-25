# Dcoker file do backend

# Imagem base
FROM node:16.14-alpine

# Diretório de trabalho
WORKDIR /app-backend

# Porta que será exposta
EXPOSE 3001

# Copia os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia os arquivos do projeto
COPY . .

RUN npm run migrate:compose

# Comando que será executado quando o container for iniciado
CMD ["npm", "run", "dev" ]