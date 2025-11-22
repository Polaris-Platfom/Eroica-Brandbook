# Mesa Logo Family

Esta colección contiene 12 variaciones de logos personalizables para la marca Eroica.

## Archivos Disponibles

- `1.svg` - `12.svg`: 12 variaciones únicas del logo Mesa

## Características

- **Formato**: SVG (escalable sin pérdida de calidad)
- **Personalización**: Los colores se pueden cambiar dinámicamente mediante el Interactive Logo Studio
- **Descarga**: Disponible en formatos SVG y PNG de alta resolución

## Uso en el Brandbook

Estos logos están integrados en la sección "Mesa Logo Family" del brandbook (`index.html`), donde los usuarios pueden:

1. **Seleccionar** cualquiera de los 12 logos
2. **Personalizar** el color usando:
   - Paleta de colores de marca predefinida
   - Selector de color personalizado
3. **Descargar** en:
   - SVG (formato vectorial)
   - PNG (4x resolución para alta calidad)

## Paleta de Colores de Marca

- **Deep Civic Blue**: `#003366` - Color principal de marca
- **Heroic Gold**: `#C5A059` - Color de acento
- **Labs Blue**: `#2E5BFF` - Eroica Labs
- **Foundation Crimson**: `#B22222` - Eroica Foundation
- **White**: `#FFFFFF`
- **Charcoal**: `#2C2C2C`

## Implementación Técnica

Los logos son procesados mediante JavaScript que:
- Carga el SVG dinámicamente
- Aplica colores personalizados a todos los elementos `fill` y `stroke`
- Genera archivos descargables con los colores aplicados
- Convierte a PNG de alta resolución (4x) cuando se solicita

## Código Relacionado

- **HTML**: `index.html` (líneas 296-413)
- **JavaScript**: `js/app.js` (función `initMesaLogoStudio()`)
- **CSS**: `css/style.css` (estilos `.mesa-logo-*`)

