FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o restante (src, public, etc)
COPY . .

# Expõe a porta que o Vite realmente usa
EXPOSE 5173

# Roda o Vite com acesso externo (host 0.0.0.0)
CMD ["npm", "run", "dev", "--", "--host"]
