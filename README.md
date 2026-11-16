# Sarita's Spider-Verse — Chapter 17 💗🕷️

Un regalo web interactivo para celebrar los 17 años de Sarita: portada cinematográfica, historia, carta secreta, 17 deseos desbloqueables y sorpresa final.

## Cómo abrir la página

**No necesitas Node.js, Claude Code ni instalar dependencias.** Abre `index.html` en tu navegador. Para una prueba más parecida a producción, desde la carpeta ejecuta en PowerShell (si tienes Python):

```powershell
python -m http.server 8000
```

Después abre `http://localhost:8000/`.

## Personalización

- **Mensajes, carta y título:** edita `index.html`.
- **Los 17 deseos:** edita el arreglo `WISHES` al inicio de `script.js`.
- **Colores y animaciones:** edita `styles.css`, especialmente las variables `:root`.
- **Música opcional:** pon un archivo de audio con permiso de uso en `assets/music.mp3`. No hay audio incluido ni reproducción automática. Si no lo agregas, el resto del sitio funciona normalmente; el botón de música te indicará que falta el archivo.
- **Firma:** modifica el texto de la sección `letter-signoff` en `index.html`.
- **Reiniciar los 17 deseos:** usa el botón ↺ en la esquina superior derecha. El progreso se guarda solo durante la sesión del navegador.

No se incluyen fotos personales ni se recopilan datos. La web está lista para usarse sin fotografía alguna.

## Publicar gratis en GitHub Pages

1. Crea una cuenta de GitHub o inicia sesión.
2. Crea un repositorio nuevo llamado `spider-birthday-17` (público si usas GitHub Pages gratuito).
3. Extrae el ZIP y sube **el contenido de la carpeta** `sarita-spiderverse` a la raíz del repositorio, incluyendo la carpeta oculta `.github` (en Windows puede aparecer oculta).
4. Confirma el cambio en la rama `main`.
5. En GitHub, entra a **Settings → Pages → Build and deployment** y selecciona **GitHub Actions** como fuente.
6. En **Actions**, observa la ejecución `Deploy Sarita Spider-Verse to GitHub Pages`.
7. Al terminar exitosamente, abre `https://TU_USUARIO.github.io/spider-birthday-17/`.

Si el workflow no se inició automáticamente porque GitHub Pages todavía no estaba habilitado, visita **Actions**, selecciona el workflow y pulsa **Run workflow**, o realiza otro commit.

### Alternativa por terminal (Git instalado)

```powershell
git init
git add .
git commit -m "Sitio de cumpleaños para Sarita"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/spider-birthday-17.git
git push -u origin main
```

Sustituye `TU_USUARIO` por tu usuario real. GitHub te pedirá autenticarte.

## Privacidad, accesibilidad y compatibilidad

- GitHub Pages en un repositorio público publica el contenido para cualquiera que tenga el enlace: pide permiso antes de añadir fotos personales.
- Se respeta la preferencia del sistema `prefers-reduced-motion`.
- La música es opcional y se activa únicamente mediante interacción.
- Diseño adaptable a celulares, tabletas y computadoras.
- Solo HTML, CSS, JavaScript y SVG: no hay API, backend, claves ni gastos de alojamiento.
