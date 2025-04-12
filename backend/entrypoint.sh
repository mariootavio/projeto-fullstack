#!/bin/sh

echo "⏳ Aguardando o MySQL iniciar..."

# Espera até o MySQL estar disponível
until nc -z mysql 3306; do
  echo "⏱️ MySQL ainda não está disponível. Tentando novamente..."
  sleep 2
done

echo "✅ MySQL está pronto. Executando migrations..."
npx prisma migrate deploy

echo "🚀 Iniciando o backend..."
npm run dev