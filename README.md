# Proyecto con ELK Stack, Backend y Frontend

Este proyecto utiliza ELK Stack (Elasticsearch, Logstash y Kibana) para la gestión y visualización de logs, junto con un backend en **Node.js** y un frontend en **Svelte**. A continuación, se detallan los pasos para configurar y ejecutar el proyecto.

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Docker**: [Instalar Docker](https://www.docker.com/get-started)
- **Docker Compose**: [Instalar Docker Compose](https://docs.docker.com/compose/install/)

## Verifica la Estructura del Proyecto

.
├── backend/                      # Código fuente del backend
├── svelte-comment-app/           # Código fuente del frontend en Svelte
├── docker-compose.yml            # Configuración de Docker Compose
├── logstash/                      # Configuración de Logstash
│   ├── config/                   # Archivos de configuración de Logstash
│   └── pipeline/                 # Pipeline de Logstash
└── README.md                     # Este archivo

## Levantar los Contenedores
docker-compose up -d --build
## Acceder a los Servicios Una vez que los contenedores estén levantados, puedes acceder a los siguientes servicios:

Frontend: http://localhost
Kibana: http://localhost:5601 (Visualiza los logs y datos de Elasticsearch)
Elasticsearch: http://localhost:9200 (API de Elasticsearch)
APM Server: http://localhost:8200 (Monitoreo de aplicaciones en tiempo real)