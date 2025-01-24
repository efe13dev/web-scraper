# 🕷️ Web Scraper

Un potente y flexible web scraper construido con TypeScript que utiliza Article Extractor para obtener contenido relevante de artículos web.

## 📋 Características

- Extracción precisa de contenido de artículos usando Article Extractor
- Scraping de páginas web de manera eficiente
- Soporte para páginas dinámicas con JavaScript
- Manejo de rate limiting y proxies
- Exportación de datos en múltiples formatos
- Totalmente tipado con TypeScript

## 🚀 Inicio Rápido

### Prerrequisitos

```bash
- Bun (última versión)
- npm o yarn
```

### Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
cd scraper
```

2. Instala las dependencias:
```bash
bun install
```

### Uso

```typescript
import { WebScraper } from './src/scraper';

const scraper = new WebScraper({
  url: 'https://ejemplo.com',
  selector: '.mi-selector'
});

const datos = await scraper.extraerDatos();
```

## 🛠️ Tecnologías

- TypeScript
- Bun
- Article Extractor
- Axios

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Contribuir

¡Las contribuciones son bienvenidas! Por favor, lee [CONTRIBUTING.md](CONTRIBUTING.md) para más detalles.
