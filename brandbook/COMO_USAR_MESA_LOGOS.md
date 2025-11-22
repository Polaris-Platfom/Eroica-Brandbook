# 🎨 Cómo Usar Mesa Logo Family

## ⚠️ Problema Común: "Error loading logo"

Si ves el mensaje **"Error loading logo. Please try another."**, esto se debe a que los navegadores modernos **bloquean las peticiones `fetch()` y `XMLHttpRequest`** cuando abres archivos HTML localmente (protocolo `file://`).

## ✅ Solución: Usar un Servidor Web Local

### Opción 1: Script Automático (Recomendado)

1. Abre la terminal
2. Navega a la carpeta del brandbook:
   ```bash
   cd /Users/005ote/Documents/Github-Others/Eroica-Brandbook/brandbook
   ```
3. Ejecuta el script:
   ```bash
   sh START_SERVER.sh
   ```
4. Abre tu navegador en: **http://localhost:8080**

### Opción 2: Comando Manual

```bash
cd /Users/005ote/Documents/Github-Others/Eroica-Brandbook/brandbook
python3 -m http.server 8080
```

Luego abre: **http://localhost:8080**

### Opción 3: Usar VS Code Live Server

1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

## 🧪 Página de Prueba

Para probar que todo funciona correctamente:

1. Inicia el servidor web (ver opciones arriba)
2. Abre: **http://localhost:8080/test-mesa-logos.html**
3. Deberías ver los 12 logos cargados
4. Haz clic en cualquier color para cambiar el color de todos los logos

## 🎯 Usar Mesa Logo Family en el Brandbook

1. Inicia el servidor web
2. Abre: **http://localhost:8080/index.html**
3. Navega a la sección "Logo System" (sección 02)
4. Desplázate hasta "Mesa Logo Family"
5. Ahora podrás:
   - ✓ Seleccionar cualquiera de los 12 logos
   - ✓ Cambiar el color en tiempo real
   - ✓ Descargar en SVG o PNG

## 🎨 Colores Disponibles

| Color | Hex | Uso |
|-------|-----|-----|
| Deep Civic Blue | `#003366` | Color principal |
| Heroic Gold | `#C5A059` | Acento heroico |
| Labs Blue | `#2E5BFF` | Eroica Labs |
| Foundation Crimson | `#B22222` | Eroica Foundation |
| White | `#FFFFFF` | Fondos |
| Charcoal | `#2C2C2C` | Texto |

## 🔧 Características Técnicas

### ¿Por qué necesito un servidor web?

Los navegadores modernos implementan políticas de seguridad CORS (Cross-Origin Resource Sharing) que:
- Bloquean `fetch()` desde archivos locales
- Bloquean `XMLHttpRequest` desde `file://`
- Previenen scripts de acceder a archivos del sistema

Un servidor web local (como `python3 -m http.server`) sirve los archivos vía HTTP, lo cual permite que JavaScript funcione correctamente.

### ¿Qué hace el código JavaScript?

1. **Carga el SVG** usando XMLHttpRequest
2. **Inyecta el SVG** en el DOM para poder manipularlo
3. **Encuentra todos los elementos** con `fill` y `stroke`
4. **Cambia los colores** dinámicamente
5. **Serializa el SVG** con los nuevos colores para descarga
6. **Convierte a PNG** usando Canvas API (4x resolución)

## 🐛 Solución de Problemas

### Problema: "Network error loading Mesa logo"
**Solución:** Estás abriendo el archivo directamente. Usa un servidor web.

### Problema: "Error 404"
**Solución:** Verifica que estás en la carpeta `brandbook` al iniciar el servidor.

### Problema: Los colores no cambian
**Solución:** 
1. Verifica que estás usando un servidor web (no `file://`)
2. Abre la consola del navegador (F12) para ver errores
3. Intenta con la página de prueba: `test-mesa-logos.html`

### Problema: El servidor no inicia
**Solución:**
1. Verifica que Python 3 esté instalado: `python3 --version`
2. Verifica que el puerto 8080 no esté en uso
3. Intenta con otro puerto: `python3 -m http.server 8000`

## 📝 Notas Importantes

- **Tamaño de archivos:** Algunos SVGs son grandes (4.2 MB). La primera carga puede tardar unos segundos.
- **Navegadores compatibles:** Chrome, Firefox, Safari, Edge (versiones modernas)
- **Sin dependencias:** No requiere npm, Node.js u otras herramientas
- **Funciona offline:** Una vez iniciado el servidor local, no necesitas internet

## ✨ Ejemplo de Uso

```bash
# Terminal
cd /Users/005ote/Documents/Github-Others/Eroica-Brandbook/brandbook
python3 -m http.server 8080

# Navegador
# Abre: http://localhost:8080/index.html
# Navega a: Logo System > Mesa Logo Family
# Selecciona un logo
# Elige un color
# Descarga SVG o PNG
```

¡Listo! Ahora puedes personalizar y descargar los logos de la familia Mesa. 🎉

