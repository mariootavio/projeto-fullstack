#!/bin/sh

echo "⏳ Aguardando o MySQL ficar pronto..."

# Tenta até o migrate funcionar
until npx prisma migrate deploy > /dev/null 2>&1; do
  echo "⏱️ Ainda não está pronto... aguardando MySQL subir"
  sleep 2
done

echo "✅ MySQL está pronto. Migração aplicada com sucesso!"
echo "🚀 Iniciando o backend..."
npm run dev
