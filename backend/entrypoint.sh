#!/bin/sh

# Aplica as migrations (agora o MySQL já está de pé)
npx prisma migrate deploy

# Inicia o backend
npm run dev