# Logo Integration - Email Templates

## Important Note

Los email templates ahora incluyen referencias al logo SVG de Eroica. Sin embargo, para que las imágenes funcionen en emails reales, necesitas:

### Opción 1: Hosting del Logo (Recomendado para producción)

1. **Subir el logo a un servidor público:**
   - GitHub Pages
   - CDN (Cloudflare, AWS S3, etc.)
   - Tu propio servidor web

2. **Actualizar las URLs en los templates:**
   
   Reemplaza esta línea en cada template:
   ```html
   <img src="https://raw.githubusercontent.com/yourusername/eroica-brandbook/main/brandbook/assets/logos/eroica-logo-white.svg" ...>
   ```
   
   Con la URL real de tu hosting:
   ```html
   <img src="https://tu-dominio.com/assets/logos/eroica-logo-white.svg" ...>
   ```

### Opción 2: Inline SVG (Mejor compatibilidad)

Para máxima compatibilidad con clientes de email, puedes usar SVG inline directamente en el HTML:

```html
<td style="background-color: #003366; padding: 30px 40px; text-align: center;">
    <svg width="80" height="80" viewBox="0 0 2208 1952" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0,1952) scale(0.1,-0.1)" fill="#FFFFFF">
            <!-- SVG path data aquí -->
        </g>
    </svg>
</td>
```

### Opción 3: Texto como Fallback (Actual)

Si no puedes hospedar el logo, los templates ya tienen un fallback de texto que se ve profesional.

## Archivos de Logo Disponibles

- `brandbook/assets/logos/eroica-logo.svg` - Logo original (negro)
- `brandbook/assets/logos/eroica-logo-white.svg` - Logo optimizado para fondos oscuros (blanco)

## Testing de Emails

Antes de enviar emails en producción:

1. **Prueba en múltiples clientes:**
   - Gmail (web y app)
   - Outlook (desktop y web)
   - Apple Mail
   - Yahoo Mail

2. **Usa herramientas de testing:**
   - [Litmus](https://litmus.com)
   - [Email on Acid](https://www.emailonacid.com)
   - [Putsmail](https://putsmail.com) (gratis, para testing rápido)

3. **Verifica que el logo se muestre correctamente** en todos los clientes antes del envío masivo.
