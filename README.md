
# Portafolio Personal con React, TypeScript y Gemini API

> Un portafolio de desarrollador web moderno, rápido y totalmente interactivo, construido como una Single-Page Application (SPA) para mostrar proyectos, un blog personal y un asistente de IA.


## ✨ Características Principales

*   **Diseño Moderno y Responsivo**: Perfecta visualización en cualquier dispositivo, desde móviles hasta ordenadores de escritorio.
*   **Single-Page Application (SPA)**: Navegación fluida y rápida sin recargar la página, gracias a la arquitectura de React.
*   **Panel de Administración**: Un panel de control protegido por contraseña para gestionar el contenido del sitio (proyectos, testimonios y artículos del blog) directamente desde el navegador, sin necesidad de tocar el código.
*   **Asistente con IA**: Un chatbot integrado con la **API de Google Gemini** para responder preguntas de los visitantes de forma interactiva.
*   **Componentes Reutilizables**: Construido con una arquitectura de componentes clara y mantenible.
*   **Optimizado para SEO**: Meta etiquetas básicas para mejorar la visibilidad en motores de búsqueda y al compartir en redes sociales.
*   **Almacenamiento Local**: Utiliza el Local Storage del navegador para simular una base de datos, permitiendo que el contenido del panel de administración persista entre sesiones.

## 🛠️ Tecnologías Utilizadas

*   **Frontend**:
    *   [**React**](https://react.dev/): Biblioteca principal para construir la interfaz de usuario.
    *   [**TypeScript**](https://www.typescriptlang.org/): Para añadir tipado estático y mejorar la robustez del código.
    *   [**Tailwind CSS**](https://tailwindcss.com/): Framework de CSS "utility-first" para un diseño rápido y personalizable.
*   **Inteligencia Artificial**:
    *   [**Google Gemini API**](https://ai.google.dev/): Potencia el chatbot para ofrecer respuestas inteligentes y contextuales.
*   **Herramientas de Desarrollo**:
    *   **Vite**: Se asume un entorno de desarrollo moderno y rápido para proyectos de frontend (compatible con `npm run dev`).

## 🚀 Cómo Empezar

Sigue estos pasos para tener una copia del proyecto funcionando en tu máquina local.

### Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior es recomendable).

### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura tu clave de API de Gemini:**
    *   Crea un archivo llamado `.env` en la raíz del proyecto.
    *   Dentro de este archivo, añade tu clave de API de Google Gemini. El chatbot la necesita para funcionar.
    ```env
    # Reemplaza TU_API_KEY_DE_GEMINI con tu clave real
    API_KEY="TU_API_KEY_DE_GEMINI"
    ```
    > **Nota**: Si usas un entorno como Vite, puede que necesites prefijar la variable (ej. `VITE_API_KEY`) y ajustar cómo se lee en el código. La configuración actual asume que `process.env.API_KEY` está disponible en tu proceso de build.

4.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

¡Abre [http://localhost:5173](http://localhost:5173) (o el puerto que indique tu consola) en tu navegador para ver la aplicación!

## 🔐 Panel de Administración

Para gestionar el contenido del sitio, puedes acceder al panel de administración.

*   **URL**: Navega a `/#/admin` en tu navegador.
*   **Contraseña**: `admin123`

Desde aquí puedes crear, editar y eliminar proyectos, testimonios y publicaciones del blog.

### ⚠️ Aclaración de Seguridad para Producción

La autenticación actual es un **simulacro inseguro, diseñado únicamente para desarrollo local**. La contraseña está escrita directamente en el código del frontend, lo que significa que cualquier persona puede verla inspeccionando los archivos de la página en su navegador.

**Para un entorno de producción real, se implementaría un sistema de autenticación seguro de la siguiente manera:**

1.  **Backend y Base de Datos**: Se crearía un servidor backend (usando tecnologías como Node.js, Python, etc.) conectado a una base de datos segura (como PostgreSQL, MongoDB, etc.).

2.  **Hashing de Contraseñas**: Las contraseñas de los administradores **nunca** se guardarían en texto plano. En su lugar, se almacenarían como un "hash" criptográfico (un galimatías irreversible) en la base de datos.

3.  **Flujo de Autenticación**:
    *   El formulario de inicio de sesión enviaría el email y la contraseña al backend de forma segura (HTTPS).
    *   El backend buscaría al usuario por su email, aplicaría el mismo algoritmo de hash a la contraseña enviada y la compararía con el hash almacenado en la base de datos.
    *   Si coinciden, el backend generaría un **token de sesión seguro** (por ejemplo, un JWT - JSON Web Token).

4.  **Gestión de Sesión**:
    *   Este token se devolvería al frontend, que lo almacenaría de forma segura (por ejemplo, en una cookie `httpOnly`).
    *   Para cualquier acción administrativa (crear, editar, eliminar contenido), el frontend enviaría este token junto con la solicitud. El backend validaría el token antes de ejecutar la acción, asegurando que solo los usuarios autenticados puedan modificar el contenido.


## 📁 Estructura del Proyecto

```
/
├── public/               # Archivos estáticos
├── src/
│   ├── components/       # Componentes de React reutilizables (Header, Footer, etc.)
│   │   └── chatbot/      # Componentes específicos del chatbot
│   ├── data/             # Datos iniciales para poblar la aplicación
│   ├── hooks/            # Hooks personalizados de React (useLocalStorage)
│   ├── pages/            # Componentes que representan cada página (HomePage, BlogPage, etc.)
│   ├── App.tsx           # Componente principal y enrutador de la aplicación
│   ├── index.tsx         # Punto de entrada de la aplicación
│   ├── styles.css        # Estilos globales y animaciones
│   └── types.ts          # Definiciones de tipos de TypeScript
├── .env                  # Archivo para variables de entorno (API Keys)
├── index.html            # Plantilla HTML principal
└── README.md             # Este archivo
```

---

Creado con ❤️ por [Tu Nombre].
