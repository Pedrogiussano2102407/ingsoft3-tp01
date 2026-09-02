# Proyecto IngSoft3 - versión B

[![CI](https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/workflows/ci.yml/badge.svg)](https://github.com/Pedrogiussano2102407/ingsoft3-tp01/actions/workflows/ci.yml)

## Cómo levantar el sistema (invento)

1. Clonar el repo:git clone https://github.com/Pedrogiussano2102407/ingsoft3-tp01.git
cd ingsoft3-tp01/tp2-invento

2. Copiar el archivo de variables de entorno y completarlo con los valores reales:
copy server.env.example server.env
   Después editar `server\.env` con los valores reales de `MONGO_STRING` y `ADMIN_KEY`.
3. Levantar el sistema completo con las imágenes ya publicadas:
docker compose -f docker-compose.registry.yml up -d
4. Confirmar que los tres servicios están arriba:
docker compose -f docker-compose.registry.yml ps
5. Abrir `http://localhost:3000`.