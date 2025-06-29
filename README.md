# Frontend - Contactos Landing Page
- **Diseño con React**
- **Css**

## 🛠️ Instalación
1. **Navega a la ruta del archivo front**
```bash
cd front
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar el servidor**
```bash
npm run dev
```

----------------------------------------------
# Backend - Contactos Landing Page

Backend para gestionar solicitudes de contacto.

## 🚀 Características

- **API RESTful** con Express.js
- **Base de datos MongoDB** con Mongoose
- **Validación de datos** 
- **Rate limiting** anti-spam
- **Seguridad básica** con Helmet y CORS
- **Prevención de duplicados**

## 📋 Requisitos

- **Cluster de MongoAtlas**
- **npm o yarn**

## 🛠️ Instalación

1. **Navega a la ruta del archivo 'back'**
```bash
cd back
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Ejecuta el comando
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/contactos_landing
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

4. **Ejecutar el servidor**
```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

## 📚 API Endpoints

### 1. Crear Solicitud de Contacto
```http
POST /api/contact
```

**Body:**
```json
{
  "nombreCompleto": "Juan Pérez",
  "correo": "juan@ejemplo.com",
  "telefono": "+52 555 123 4567",
  "mensaje": "Mensaje de contacto"
}
```

### 2. Obtener Contactos (Admin)
```http
GET /api/contacts?page=1&limit=10
```

### 3. Marcar como Leído
```http
PATCH /api/contacts/:id/read
```

## 🔒 Seguridad

- **Rate Limiting**: 5 solicitudes máximo cada 15 minutos
- **CORS**: Configurado para dominios específicos
- **Validación**: Datos sanitizados
- **Duplicados**: 1 solicitud por email cada 24h
