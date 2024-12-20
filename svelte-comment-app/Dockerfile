# Usar una imagen base de Node.js
FROM node:18

# Crear un directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación
RUN npm run build

# Usar una imagen ligera para servir el frontend
FROM nginx:stable-alpine

# Copiar los archivos construidos al directorio público de nginx
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80
