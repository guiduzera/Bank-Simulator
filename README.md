<h1 align="center">
	Bank-Simulator
</h1>

<h3 align="center">
	aplicação web fullstack, cujo objetivo seja possibilitar que usuários consigam criar suas contas e realizar transferências internas entre si.
</h3>

<p align="center">
	<img src="https://img.shields.io/github/repo-size/guiduzera/Ng.cash-Back-End?color=green"/>
	<img src="https://img.shields.io/github/last-commit/guiduzera/Ng.cash-Back-End?color=green"/>
	<img src="https://img.shields.io/github/languages/count/guiduzera/Ng.cash-Back-End?color=green"/>
	<img src="https://img.shields.io/github/contributors/guiduzera/Ng.cash-Back-End?color=green"/>
</p>

<h4 align="center">
	Status: 🚀 Finished
</h4>

<p align="center">
	<a href="#about">About</a> •
	<a href="#tech-stack">Tech Stack</a> •
	<a href="#installation">Installation</a> •
	<a href="#usage">Usage</a> • 
	<a href="#contact">Contact</a> 
</p>

## About
Projeto totalmente Dockerizado desenvolvido com o Back end pautado nos conceitos de API REST, S.O.L.I.D, MSC, POO e TDD. Composto por tecnologias como Typescript, Node.js, PostegresSQL, Prisma, Express, Mocha, Chai, Sinon e dentre outros. já o Front foi implementado com uma aplicação Next.js com Typescript e estilizada com Styled Components e algumas outras libs de estilo

## Tech Stack
<img src="https://img.shields.io/badge/Bash-05122A?style=flat&logo=gnu-bash" alt="bash Badge" height="25">&nbsp;
<img src="https://img.shields.io/badge/Docker-05122A?style=flat&logo=docker" alt="docker Badge" height="25">&nbsp;
<img src="https://img.shields.io/badge/Git-05122A?style=flat&logo=git" alt="git Badge" height="25">&nbsp;
<img src="https://img.shields.io/badge/Html5-05122A?style=flat&logo=html5" alt="html5 Badge" height="25">&nbsp;
<img src="https://img.shields.io/badge/Nodejs-05122A?style=flat&logo=node.js" alt="nodejs Badge" height="25">&nbsp;
<img src="https://img.shields.io/badge/Postgresql-05122A?style=flat&logo=postgresql" alt="postgresql Badge" height="25">&nbsp;
<img src="https://img.shields.io/badge/React-05122A?style=flat&logo=react" alt="react Badge" height="25">&nbsp;
<img src="https://img.shields.io/badge/Typescript-05122A?style=flat&logo=typescript" alt="typescript Badge" height="25">&nbsp;

## Installation
To Install this project, follow the steps above:
```bash
# Para iniciar o Docker é necessário estar no diretório raiz da aplicação e digitar o comando:
$ docker-compose up -d

# depois dos containers no ar, acesse o terminal do serviço de Back End com o comando:
$ docker exec -it app_backend bash

# depois no terminal do Back End digite por segurança:
$ npx prisma generate
# e rode as migrations programadas:
$  npx prisma migrate dev --name init
# depois disso inicie a aplicação com o comando:
$ npm run dev

#com o Back End ativo, agora é necessário entra nom bash do Front End com o comando:
$ docker exec -it ng_cash-frontend-1 bash
# no terminal para dar partida é só digitar no terminal:
$ npm run dev

#agora só acessar o localHost:3000 e ser feliz!!!
# para parar o docker basta digitar no terminal do diretório raiz:
$ docker-compose down

# Obs: O banco de dados não está com seeders implementadas, então para começar a brincar com a plicação
# é necessário cadastrar novos usuários.
```

## Usage
To use this project, follow the steps above:
```bash
# Aqui vão algumas instruções para as rotas da API
# rota para registro de usuários é a post http://localhost:3001/register com o body de exemplo:
$ {
  "username": "Kratos",
  "password": "Esparta22"
}
# rota para login de usuários post http://localhost:3001/login:
$ {
  "username": "Kratos",
  "password": "Esparta22"
}
# Rota para pegar usuários pelo id get http://localhost:3001/users/:id

# a partir daqui todas as rotas necessitarão de um token válido em seus headers
# rota para pegar o saldo dos usuários get http://localhost:3001/balance com o header authorization: token

# Rota para filtrar todas as transações de um usuários get http://localhost:3001/transaction/all

# Rota para filtrar as transações de um usuários por data get http://localhost:3001/transaction/search?query=18/11/2022 por exemplo

# Rota para filtrar as transações de um usuários por cash-out apenas get http://localhost:3001/transaction/search?query=cash-out por exemplo

# Rota para filtrar as transações de um usuários por cash-in apenas get http://localhost:3001/transaction/search?query=cash-in por exemplo

# Rota para filtrar as transações de um usuários por cash-in e data especifica get http://localhost:3001/transaction/search?query=18/11/2022?cash-in por exemplo

# Rota para filtrar as transações de um usuários por cash-out e data especifica get http://localhost:3001/transaction/search?query=18/11/2022?cash-out por exemplo

# Obs: o projeto foi feito para rodar localmente, por isso está configurado para o ambiente de desenvolvimento
## inclusive os endpoints estão direcionados para o localhost.

## o projeto está 99%, sempre tem algo a se implementar e melhorar, dei o meu melhor espero que esteja legal!!!
```

## Contact
<img align="left" src="https://avatars.githubusercontent.com/guiduzera?size=100">

Made with ❤️ by [Guilherme Carvalho](https://github.com/guiduzera), get in touch!

<a href="mailto:guidu.dev@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white" alt="Email Badge" height="25"></a>&nbsp;
<a href="https://www.linkedin.com/in/https://www.linkedin.com/in/guilhermeedu/" target="_blank"><img src="https://img.shields.io/badge/Linkedin-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn Badge" height="25"></a>&nbsp;

<br clear="left"/>
