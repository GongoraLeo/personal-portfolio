import { Project, Testimonial, BlogPost } from '../types';

export const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Plataforma E-commerce',
    description: 'Un sitio de comercio electrónico con todas las funciones: listado de productos, carrito de compras y un proceso de pago seguro. Construido con React y Node.js.',
    imageUrl: 'https://picsum.photos/seed/project1/600/400',
    liveUrl: '#',
    repoUrl: '#',
    tags: ['React', 'Node.js', 'E-commerce', 'Stripe']
  },
  {
    id: '2',
    title: 'Dashboard de Visualización',
    description: 'Un panel interactivo para visualizar conjuntos de datos complejos utilizando D3.js, que proporciona información valiosa a través de gráficos y tablas.',
    imageUrl: 'https://picsum.photos/seed/project2/600/400',
    liveUrl: '#',
    repoUrl: '#',
    tags: ['D3.js', 'React', 'Data Viz']
  },
  {
    id: '3',
    title: 'Sitio Web de Portafolio',
    description: 'Un sitio de portafolio moderno y elegante (¡como este!) construido para mostrar habilidades y proyectos de manera efectiva. Totalmente responsivo y optimizado para SEO.',
    imageUrl: 'https://picsum.photos/seed/project3/600/400',
    repoUrl: '#',
    tags: ['React', 'TypeScript', 'CSS']
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ana García',
    role: 'CEO en TechCorp',
    comment: 'Trabajar con él fue una experiencia fantástica. Entregó un producto de alta calidad a tiempo y fue increíblemente receptivo a los comentarios. ¡Muy recomendable!'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    role: 'Gerente de Marketing en Innovate Inc.',
    comment: 'El nuevo dashboard ha cambiado las reglas del juego para nuestro equipo. Entendió nuestras necesidades a la perfección y creó una herramienta que ha mejorado significativamente nuestro flujo de trabajo.'
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'dominando-react-hooks',
    title: 'Dominando los Hooks de React',
    author: 'Tu Nombre',
    publishDate: '2023-10-26',
    excerpt: 'Una inmersión profunda en los Hooks de React más comunes y cómo usarlos eficazmente para gestionar el estado y los efectos secundarios en tus componentes funcionales.',
    content: `# Dominando los Hooks de React

Los Hooks de React han revolucionado la forma en que escribimos componentes. En esta publicación, exploraremos algunos de los hooks más esenciales.

## useState
El hook \`useState\` es el más básico. Te permite añadir estado de React a los componentes de función.

\`\`\`javascript
const [contador, setContador] = useState(0);
\`\`\`

## useEffect
El hook \`useEffect\` te permite realizar efectos secundarios en los componentes de función. Es un reemplazo cercano para \`componentDidMount\`, \`componentDidUpdate\`, y \`componentWillUnmount\`.

**Puntos clave:**
*   Usa siempre los hooks en el nivel superior de tu componente.
*   Nunca llames a los hooks dentro de bucles, condicionales o funciones anidadas.
*   Adopta los componentes funcionales para un código más limpio.
`
  },
  {
    id: 'el-arte-del-diseno-responsivo',
    title: 'El Arte del Diseño Responsivo',
    author: 'Tu Nombre',
    publishDate: '2023-11-15',
    excerpt: 'Aprende los principios del diseño "mobile-first" y cómo usar técnicas modernas de CSS para construir sitios web que se vean geniales en cualquier dispositivo.',
    content: `# El Arte del Diseño Responsivo

En el mundo actual de múltiples dispositivos, el diseño responsivo no es solo una característica, es una necesidad.

## Enfoque "Mobile-First"
Siempre comienza diseñando primero para la pantalla más pequeña. Este enfoque te obliga a priorizar el contenido y conduce a un diseño más limpio y enfocado.

## CSS Grid y Flexbox
Estos dos módulos de diseño son las piedras angulares del diseño responsivo moderno.
*   **Flexbox** es ideal para diseños unidimensionales (una fila o una columna).
*   **CSS Grid** es perfecto para diseños bidimensionales (filas y columnas).

Dominar estos dos hará que la construcción de diseños responsivos complejos sea pan comido.
`
  },
  {
    id: 'typescript-para-principiantes',
    title: 'TypeScript para Principiantes',
    author: 'Tu Nombre',
    publishDate: '2023-12-05',
    excerpt: 'Una introducción a TypeScript y cómo añadir tipos estáticos a tus proyectos de JavaScript puede ayudarte a detectar errores temprano y a escribir código más mantenible.',
    content: `# TypeScript para Principiantes

TypeScript es un superconjunto de JavaScript que añade tipos estáticos. Veamos por qué eso es algo bueno.

## ¿Qué es el Tipado Estático?
El tipado estático significa que los tipos de las variables se comprueban en tiempo de compilación, antes de que el código se ejecute. Esto ayuda a detectar toda una clase de errores que de otro modo solo aparecerían en tiempo de ejecución.

### Ejemplo
\`\`\`typescript
function saludar(nombre: string) {
  console.log("Hola, " + nombre.toUpperCase());
}

// ¡Esto causaría un error en tiempo de compilación!
// saludar(42);
\`\`\`

Al agregar tipos, haces tu código más predecible y más fácil de entender para otros desarrolladores (y para tu yo futuro).
`
  }
];