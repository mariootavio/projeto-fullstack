FROM node:18-alpine

# Define fuso horário
ENV TZ=America/Sao_Paulo

# Define diretório de trabalho
WORKDIR /app

# Copia e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação
COPY . .

# Gera o Prisma Client (sem rodar migrations)
RUN npx prisma generate

# Expõe a porta do backend
EXPOSE 3001

# Inicia o servidor
CMD ["npm", "run", "dev"]
