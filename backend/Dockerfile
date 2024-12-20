# Usa la imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos necesarios
COPY package*.json ./
RUN npm install

COPY . .

# Exponer el puerto que usa tu servidor
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
