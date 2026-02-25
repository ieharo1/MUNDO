# 🌍 MUNDO - Portal de Noticias

Aplicación web profesional de noticias desarrollada en Angular 19, lista para producción y despligue en GitHub Pages.

## 🚀 Características

- **Diseño profesional** estilo periódico digital internacional
- **Categorías**: Mundo, Economía, Tecnología, Deportes
- **Sección destacada** con noticia principal
- **Grid de noticias** secundarias con paginación
- **Sidebar** con noticias populares
- **Búsqueda local** en tiempo real
- **Página de detalle** con noticias relacionadas
- **Routing completo** con lazy loading
- **404 page** personalizada
- **SEO básico** con meta tags dinámicos
- **100% Responsive** (Mobile, Tablet, Desktop)
- **Sin backend** - Datos desde JSON local

## 📋 Requisitos Previos

- Node.js 18+ 
- npm 9+

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install
```

## 🏃‍♂️ Desarrollo

### Opción 1: Visual Studio Code

1. Abre el proyecto en VS Code
2. Abre una terminal: `Ctrl + Shift + ñ`
3. Ejecuta:
   ```bash
   npm start
   ```
4. Abre en tu navegador: `http://localhost:4200`

### Opción 2: Terminal

```bash
# Iniciar servidor de desarrollo
npm start
# o
ng serve
```

Accede a: `http://localhost:4200`

### Solución de problemas

Si el puerto 4200 está en uso:
```bash
# Windows - matar proceso en puerto 4200
netstat -ano | findstr :4200
taskkill /PID <PID> /F
```

## 📦 Build Producción

```bash
# Build con configuración de GitHub Pages
npm run build:prod
```

El build se genera en: `dist/mundo-news-portal/browser`

## 🌐 Despliegue a GitHub Pages

### Opción 1: Deploy automático (Recomendado)

```bash
# Ejecutar deploy
npm run deploy
```

Esto utiliza `angular-cli-ghpages` para desplegar directamente a la rama `gh-pages`.

### Opción 2: Manual

```bash
# 1. Build producción
npm run build:prod

# 2. Instalar angular-cli-ghpages si no lo tienes
npm install -g angular-cli-ghpages

# 3. Desplegar
npx angular-cli-ghpages --dir=dist/mundo-news-portal/browser --branch=gh-pages
```

### Opción 3: GitHub Actions

Crea `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build:prod
        
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist/mundo-news-portal/browser
          branch: gh-pages
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── navbar/
│   │   ├── news-card/
│   │   ├── featured-news/
│   │   ├── sidebar/
│   │   └── pagination/
│   ├── pages/
│   │   ├── home/
│   │   ├── news-detail/
│   │   ├── category/
│   │   └── not-found/
│   ├── services/
│   │   └── news.service.ts
│   ├── models/
│   │   └── news.model.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
│   └── data/
│       └── news.json
├── styles.scss
├── index.html
└── main.ts
```

## ⚙️ Configuración

- **Base href**: `/Sitio-Web-PUCE/`
- **Rutas**:
  - `/` - Home
  - `/news/:id` - Detalle de noticia
  - `/category/:category` - Noticias por categoría
  - `**` - 404

## 📝 Datos

Las noticias se cargan desde `src/assets/data/news.json`. Puedes agregar o modificar noticias editando este archivo.

### Modelo de Noticia

```typescript
interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;        // HTML permitido
  category: 'mundo' | 'economia' | 'tecnologia' | 'deportes';
  image: string;         // URL de imagen
  author: string;
  date: string;          // Formato: YYYY-MM-DD
  featured?: boolean;    // Noticia destacada en home
}
```

## 🔧 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm start` | Servidor de desarrollo |
| `npm run build` | Build desarrollo |
| `npm run build:prod` | Build producción para GitHub Pages |
| `npm run deploy` | Deploy automático a GitHub Pages |

## 🌟 Tech Stack

- **Angular 19** (Standalone Components)
- **TypeScript**
- **SCSS**
- **RxJS**
- **GitHub Pages**

---

## 👨‍💻 Desarrollado por Isaac Esteban Haro Torres

**Ingeniero en Sistemas · Full Stack · Automatización · Data**

- 📧 Email: zackharo1@gmail.com
- 📱 WhatsApp: 098805517
- 💻 GitHub: https://github.com/ieharo1
- 🌐 Portafolio: https://ieharo1.github.io/portafolio-isaac.haro/

---

© 2026 Isaac Esteban Haro Torres - Todos los derechos reservados.
