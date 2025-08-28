- 👋 Hi, I’m @pedrocorrea2
<!--- - 👀 I’m interested in Automation and Artificial Intelligence
- 🌱 I’m currently learning Google App Script
- 💞️ I’m looking to collaborate on ...
- 📫 How to reach me ...
--->
<!---
pedrocorrea2/pedrocorrea2 is a ✨ special ✨ repository because its `README.md` (this file) appears on your GitHub profile.
You can click the Preview link to take a look at your changes.
--->


## Sitio estático de factoring

Este repositorio contiene un prototipo de sitio web para ACF Capital construido con Next.js. Incluye componentes básicos como navegación, sección de héroe, servicios ofrecidos, pasos del proceso, formularios de contacto y "Trabaja con nosotros".

## Despliegue en GitHub Pages

El sitio se publica automáticamente usando **GitHub Actions**. Cada vez que se hace push a `main`:

1. La acción en `.github/workflows/deploy.yml` ejecuta `npm run build` para exportar la app estática.
2. El artefacto generado en `out/` se despliega en GitHub Pages sin necesidad de commitear archivos binarios.

Una vez activada la opción Pages en la configuración del repositorio, la página estará disponible en `https://<usuario>.github.io/pedrocorrea2/`.
