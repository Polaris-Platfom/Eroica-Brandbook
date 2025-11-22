# 🚀 Despliegue en Digital Ocean App Platform

Este documento explica cómo desplegar el Eroica Brandbook en Digital Ocean App Platform.

## 🌐 Aplicación en Producción

**URL**: https://eroica-brandbook-oftv3.ondigitalocean.app

**Estado**: ✅ Desplegada y funcionando

**Última actualización**: Noviembre 22, 2025

## 📋 Requisitos Previos

1. Cuenta de Digital Ocean activa
2. Repositorio GitHub conectado: `Polaris-Platfom/Eroica-Brandbook`
3. Acceso al repositorio (público o con permisos)

## 🔧 Método 1: Despliegue Automático con App Spec

### Paso 1: Acceder a Digital Ocean
1. Inicia sesión en [Digital Ocean](https://cloud.digitalocean.com/)
2. Ve a la sección **Apps** en el menú lateral

### Paso 2: Crear Nueva App
1. Haz clic en **"Create App"**
2. Selecciona **"GitHub"** como fuente
3. Si no está conectado, autoriza Digital Ocean a acceder a tu GitHub

### Paso 3: Configurar el Repositorio
1. Selecciona el repositorio: `Polaris-Platfom/Eroica-Brandbook`
2. Selecciona la rama: `master`
3. Marca **"Autodeploy"** para despliegues automáticos en cada push

### Paso 4: Configurar Recursos
1. Digital Ocean detectará automáticamente que es un sitio estático
2. Configura los siguientes parámetros:
   - **Name**: `eroica-brandbook`
   - **Source Directory**: `/brandbook`
   - **Output Directory**: `/brandbook`
   - **Build Command**: (vacío o `echo "No build required"`)

### Paso 5: Configurar Plan
1. Selecciona el plan **"Starter"** ($0/mes para sitios estáticos pequeños)
2. O el plan **"Basic"** ($5/mes para mejor rendimiento)

### Paso 6: Revisar y Lanzar
1. Revisa la configuración
2. Haz clic en **"Create Resources"**
3. Espera a que el despliegue se complete (2-5 minutos)

## 🔧 Método 2: Despliegue con CLI (doctl)

### Instalación de doctl

```bash
# macOS
brew install doctl

# Linux
cd ~
wget https://github.com/digitalocean/doctl/releases/download/v1.98.1/doctl-1.98.1-linux-amd64.tar.gz
tar xf ~/doctl-1.98.1-linux-amd64.tar.gz
sudo mv ~/doctl /usr/local/bin
```

### Autenticación

```bash
# Crear token en: https://cloud.digitalocean.com/account/api/tokens
doctl auth init

# Verificar autenticación
doctl account get
```

### Desplegar la App

```bash
# Desde el directorio raíz del proyecto
doctl apps create --spec .do/app.yaml

# O usar el spec de deploy
doctl apps create --spec .do/deploy.yaml
```

### Comandos Útiles

```bash
# Listar apps
doctl apps list

# Ver detalles de la app
doctl apps get <app-id>

# Ver logs
doctl apps logs <app-id>

# Actualizar app
doctl apps update <app-id> --spec .do/app.yaml

# Eliminar app
doctl apps delete <app-id>
```

## 🌐 Configuración de Dominio Personalizado

### En Digital Ocean Console

1. Ve a tu app en Digital Ocean
2. Selecciona la pestaña **"Settings"**
3. Scroll hasta **"Domains"**
4. Haz clic en **"Add Domain"**
5. Ingresa tu dominio (ej: `brandbook.eroica.com`)
6. Sigue las instrucciones para configurar los DNS records

### Registros DNS Necesarios

```
Tipo: CNAME
Host: brandbook (o @)
Value: <tu-app>.ondigitalocean.app
TTL: 3600
```

## 🔒 Configuración de Variables de Entorno

Si necesitas variables de entorno (API keys, etc.):

1. Ve a tu app en Digital Ocean
2. Selecciona **"Settings"** → **"App-Level Environment Variables"**
3. Añade las variables necesarias
4. Haz clic en **"Save"** y redespliega

## 📊 Monitoreo

### Métricas Disponibles
- Requests por segundo
- Ancho de banda usado
- Errores 4xx/5xx
- Tiempo de respuesta

### Acceder a Métricas
1. Ve a tu app en Digital Ocean
2. Selecciona la pestaña **"Insights"**
3. Revisa gráficas y estadísticas

## 🔄 Actualizaciones Automáticas

Con **Autodeploy** activado:
- Cada `git push` a la rama `master` despliega automáticamente
- El despliegue toma ~2-3 minutos
- Digital Ocean notifica por email del resultado

## 🛠️ Troubleshooting

### Error: Build Failed
```bash
# Verifica que los archivos existan en /brandbook
ls -la brandbook/

# Verifica que index.html esté presente
cat brandbook/index.html
```

### Error: 404 Not Found
- Verifica que `source_dir` y `output_dir` sean correctos
- Asegúrate que `index.html` esté en el directorio correcto

### Error: GitHub Connection
- Reautoriza Digital Ocean en GitHub
- Verifica permisos del repositorio

## 💰 Costos Estimados

- **Starter Plan**: $0/mes (sitios pequeños)
- **Basic Plan**: $5/mes (mejor rendimiento)
- **Professional Plan**: $12/mes (apps más grandes)

## 📝 Notas Adicionales

- El sitio es 100% estático (HTML, CSS, JS)
- No requiere servidor backend
- Los assets se sirven desde CDN de Digital Ocean
- SSL/HTTPS incluido automáticamente
- Backups automáticos cada 24 horas

## 🔗 Enlaces Útiles

- [Digital Ocean App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- [App Spec Reference](https://docs.digitalocean.com/products/app-platform/reference/app-spec/)
- [doctl CLI Reference](https://docs.digitalocean.com/reference/doctl/)

---

**Última actualización**: Noviembre 2025
**Mantenido por**: Eroica Development Team


