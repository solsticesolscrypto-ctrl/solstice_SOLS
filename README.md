# Solstice — React + Vite + Tailwind

Aplicación SPA con navegación por hash, i18n centralizado y estilos con Tailwind CSS. Este README resume cómo trabajar con el proyecto, las utilidades clave y cómo desplegarlo.

## Inicio rápido

```powershell
npm install
npm run dev    # Servidor de desarrollo (Vite)
npm run build  # Build de producción a la carpeta dist/
```

Tip: En VS Code puedes usar la tarea “Run Vite dev server”.

## Estructura de carpetas (resumen)

```
public/
src/
	App.jsx
	App.css
	index.css
	main.jsx
	i18n.js
	components/
		Header.jsx, Footer.jsx, Home.jsx, Presale.jsx,
		Whitepaper.jsx, DaoDashboard.jsx, CreateProposal.jsx,
		Team.jsx, MessageBox.jsx, etc.
	config/
		theme.js
	styles/
		custom.css, professional.css
tailwind.config.js
postcss.config.cjs
vite.config.js
```

## i18n centralizado

- Archivo: `src/i18n.js` con traducciones para `es`, `en`, `zh`.
- Uso: importa el diccionario y toma el idioma actual desde el estado global (App) o props.

Ejemplo (simplificado):

```js
import i18n from './i18n';

function MyComp({ language }) {
	const t = i18n[language]?.base ?? i18n.es.base; // fallback seguro
	return <h1>{t['home-page-title']}</h1>;
}
```

Notas:
- `document.documentElement.lang` se sincroniza cuando cambia el idioma para accesibilidad/SEO.
- Textos de Whitepaper/DAO/Formulario de propuestas están unificados en `i18n.js`.

## Estilos con Tailwind y utilidades comunes

- Contenedor estándar: usa la variable de diseño para ancho máximo.
	- Clases: `mx-auto w-full max-w-[var(--container-max)] px-4 md:px-6`
- Espaciado vertical de secciones: `my-16 md:my-20`.
- Se priorizan utilidades de Tailwind sobre clases personalizadas; quedan utilidades puntuales en `index.css` como `panel`, `card`, `narrow`, `text-content`, `section-title`, `section-separator`, `progress`.

## Navegación

- Basada en hash (`window.location.hash`) gestionado en `App.jsx`.
- Para añadir una página, crea el componente y enlázalo desde el header usando `#ruta` y extiende el switch en `App.jsx`.

## Variables de entorno (Vite)

Las variables disponibles en el cliente deben llevar el prefijo `VITE_`.

1. Copia `.env.example` a `.env` en la raíz del proyecto.
2. Rellena los valores (Firebase y `VITE_BASE` si lo necesitas). Si no defines alguno, hay valores de respaldo para desarrollo.

Claves soportadas:
- `VITE_BASE`: base pública en producción.
- `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, `VITE_FIREBASE_MEASUREMENT_ID`.

`src/firebase.js` lee estas variables con `import.meta.env` y usa valores por defecto si faltan.

## Configuración de Vite (base de despliegue)

El `base` se resuelve según entorno en `vite.config.js`:

- Desarrollo: `/`
- Producción: puede usar `process.env.VITE_BASE` (inyectada en build) o un valor por defecto para GitHub Pages.

Cómo ajustar:

```powershell
# Despliegue en subcarpeta
$env:VITE_BASE = "/mi-sitio/"; npm run build

# Despliegue en raíz (Netlify/Vercel)
$env:VITE_BASE = "/"; npm run build
```

## Despliegue

1) Genera el build: `npm run build` (crea `dist/`).
2) Publica `dist/` en tu hosting.
3) Si la app vive en una subcarpeta (p.ej. GitHub Pages), define `VITE_BASE` para que los assets se resuelvan correctamente.

## Calidad y lint

El proyecto incluye ESLint moderno para React. Ejecuta tu editor con ESLint activado para ver avisos. Tailwind v4 se procesa vía PostCSS.

## Próximos pasos sugeridos

- Documentar nuevas claves de traducción al editar `src/i18n.js` y reutilizarlas en componentes.
- Opcional: carga diferida (lazy) de más páginas si crecen (p.ej., `Presale`).
- Mantener CSS ligero, priorizando utilidades de Tailwind sobre clases personalizadas cuando sea posible.
