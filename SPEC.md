# SPEC.md - Portal de Noticias Mundial Profesional

## 1. Project Overview

- **Project Name**: Mundo News Portal
- **Type**: Angular Single Page Application (SPA)
- **Core Functionality**: Portal de noticias profesional estilo periódico digital internacional con navegación por categorías, búsqueda y paginación
- **Target Users**: Lectores de noticias en español que buscan información mundial, económica, tecnológica y deportiva

## 2. UI/UX Specification

### Layout Structure

**Header/Navbar**
- Logo a la izquierda (texto "MUNDO" en tipografía serif bold)
- Navegación horizontal con categorías: Mundo, Economía, Tecnología, Deportes
- Buscador a la derecha con input estilizado
- Sticky en scroll

**Home Page**
- Sección destacada (hero): noticia principal, 60% ancho, imagen grande
- Grid de noticias secundarias: 3 columnas en desktop, 2 en tablet, 1 en mobile
- Sidebar derecho: "Noticias Populares" con lista de 5 noticias
- Paginación inferior: 6 noticias por página

**Detail Page**
- Imagen principal width 100%
- Título h1 grande
- Meta: autor y fecha
- Contenido en columna central
- Noticias relacionadas al final (3 cards)

**404 Page**
- Mensaje profesional
- Botón volver al inicio

### Responsive Breakpoints
- Mobile: < 768px (1 columna)
- Tablet: 768px - 1024px (2 columnas)
- Desktop: > 1024px (3 columnas + sidebar)

### Visual Design

**Color Palette**
- Primary: #1a1a2e (negro azulado oscuro)
- Secondary: #16213e (azul oscuro)
- Accent: #c41e3a (rojo periódico/clásico)
- Background: #fafafa (blanco roto)
- Text Primary: #1a1a2e
- Text Secondary: #666666
- Border: #e0e0e0
- White: #ffffff

**Typography**
- Headings: "Playfair Display", Georgia, serif
- Body: "Source Sans Pro", -apple-system, sans-serif
- Logo: "Playfair Display", serif, 700
- Font sizes:
  - h1: 2.5rem (detail), 1.75rem (cards)
  - h2: 1.5rem
  - h3: 1.25rem
  - body: 1rem
  - small: 0.875rem

**Spacing System**
- xs: 0.25rem
- sm: 0.5rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- xxl: 3rem

**Visual Effects**
- Sombras sutiles en cards: 0 2px 8px rgba(0,0,0,0.08)
- Hover en cards: translateY(-2px), sombra aumentada
- Transiciones: 0.3s ease
- Bordes superiores en noticias destacadas: 4px solid #c41e3a

### Components

**Navbar**
- Fondo blanco con sombra subtle
- Logo: texto bold serif
- Links: uppercase, spacing, hover underline rojo
- Buscador: input con borde, icono lupa

**News Card**
- Imagen con aspect-ratio 16/9
- Categoría badge (color rojo para Mundo, azul para Economía, etc.)
- Título h3
- Excerpt (2 líneas)
- Fecha y autor
- Hover: lift effect

**Featured News**
- Imagen grande background
- Overlay gradient oscuro
- Texto blanco sobre imagen
- Categoría badge

**Sidebar**
- Título con línea decorativa
- Lista de noticias pequeñas
- Número de posición estilizado

**Pagination**
- Botones Previous/Next
- Números de página
- Active state destacado

## 3. Functionality Specification

### Core Features

1. **Carga de Noticias**
   - Cargar desde archivo JSON local (assets/data/news.json)
   - NewsService con métodos:
     - getAllNews(): Observable<News[]>
     - getNewsById(id: string): Observable<News | undefined>
     - getNewsByCategory(category: string): Observable<News[]>
     - searchNews(query: string): Observable<News[]>

2. **Filtrado por Categoría**
   - Categorías: mundo, economia, tecnologia, deportes
   - Routing: /category/:category
   - Filtro desde servicio

3. **Orden por Fecha**
   - Por defecto: más recientes primero
   - En detalle mostrar fecha formateada

4. **Paginación Frontend**
   - 6 noticias por página
   - Controles: prev, next, números
   - Mantener filtro en paginación

5. **Búsqueda Local**
   - Buscar en título y excerpt
   - Debounce 300ms
   - Mostrar resultados en grid

6. **Routing**
   - / - Home
   - /news/:id - Detalle
   - /category/:category - Filtrado
   - /404 - Page not found

7. **SEO**
   - Meta tags dinámicos por página
   - Title con título de noticia
   - Description con excerpt

### Data Model

```typescript
interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'mundo' | 'economia' | 'tecnologia' | 'deportes';
  image: string;
  author: string;
  date: string;
  featured?: boolean;
}
```

### Edge Cases
- Página de detalle no encontrada → 404
- Categoría sin noticias → mensaje
- Búsqueda sin resultados → mensaje
- Imagen no carga → placeholder

## 4. Technical Requirements

### Angular Standalone
- Todos los componentes standalone
- Sin NgModule
- Imports directos en componentes

### Lazy Loading
- Route para detalle de noticia con loadComponent
- Código splitted

### GitHub Pages
- base-href: /Sitio-Web-PUCE/
- Build con --base-href
- 404.html para SPA routing (redirect)
- gh-pages deploy o angular-cli-ghpages

### File Structure
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
│.ts
│     ├── app.component ├── app.component.html
│   ├── app.component.scss
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
│   └── data/
│       └── news.json
├── index.html
├── main.ts
└── styles.scss
```

## 5. Acceptance Criteria

- [ ] Navbar con logo, categorías y buscador funcional
- [ ] Homepage muestra noticias destacadas y grid
- [ ] Sidebar con noticias populares
- [ ] Paginación funciona correctamente
- [ ] Click en noticia navega a detalle
- [ ] Página detalle muestra contenido completo
- [ ] Noticias relacionadas al final de detalle
- [ ] Filtro por categoría funciona
- [ ] Búsqueda filtra noticias
- [ ] 404 page muestra correctamente
- [ ] Responsive en mobile/tablet/desktop
- [ ] Build producción exitoso
- [ ] Deploy a GitHub Pages funciona
- [ ] Rutas funcionan correctamente en hosting
