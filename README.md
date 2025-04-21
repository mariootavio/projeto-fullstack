# 🏠 Sistema de Locações

Este é um sistema completo de gerenciamento de locações, desenvolvido com **TypeScript** no frontend e backend, utilizando **Prisma**, **React**, **Express**, e orquestrado via **Docker**. Todo o projeto é containerizado para garantir portabilidade e facilidade de setup.

---

## 🧰 Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado na sua máquina:

- [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm)
- Docker Desktop (com Docker e Docker Compose)

```bash
nvm install v20.18.3
nvm use v20.18.3
```

---

## 🚀 Instruções para rodar o projeto

### 1. Clone o repositório e entre na raiz do projeto:

```bash
git clone https://github.com/mariootavio/projeto-fullstack.git
cd projeto-fullstack
```

### 2. Inicie os containers com o Docker:

```bash
npm run start
```

### 3. Em outro terminal, execute as migrations do banco de dados:

```bash
npm run prisma:migrate
```

O projeto estará rodando nas portas:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

---

## 🗃️ Acessar o banco de dados MySQL

Você pode acessar o banco de dados manualmente utilizando alguma ferramenta como **DBeaver**, **TablePlus**, ou diretamente via terminal.

As credenciais padrão no ambiente Docker são:

- **Host:** `localhost`
- **Porta:** `3306`
- **Usuário:** `root`
- **Senha:** `root`
- **Banco de dados:** `rental_system`

> Obs: Pode levar alguns segundos para o banco iniciar após o `npm run start`.

---

## ♻️ Limpar o ambiente (resetar tudo)

Se desejar resetar completamente o projeto (banco de dados, volumes e containers):

```bash
npm run clear
```

---

## 📬 Coleção de testes no Postman

Existe uma coleção de testes pronta para ser importada no Postman, localizada na raiz do projeto:

```
projeto-fullstack.postman_collection.json
```

---

## 🧱 Tecnologias utilizadas

- 🖥️ **Frontend:** React + Vite + TypeScript + Styled Components
- ⚙️ **Backend:** Node.js + Express + TypeScript + Prisma
- 🛢️ **Banco de Dados:** MySQL
- 🐳 **Ambiente:** Docker + Docker Compose
- ✅ **Validações:** Zod + React Hook Form

---

## ✨ Funcionalidades

- Cadastro, edição e exclusão de clientes
- Cadastro, edição e exclusão de locações
- Criação de reservas com cálculo automático de valor final
- Tela de visualização de reservas com status e horários
- Layout responsivo e moderno

---

## 📦 Estrutura do projeto

```
projeto-fullstack/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── routes/
│       └── prisma/
├── frontend/
│   └── src/
│       ├── features/
│       ├── components/
│       ├── hooks/
│       └── store/
├── docker-compose.yml
├── projeto-fullstack.postman_collection.json
├── README.md
└── .env
```
