import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminPage from './pages/AdminPage';
import Chatbot from './components/chatbot/Chatbot';

type Route = {
  path: string;
  component: React.ComponentType<any>;
  title: string;
  description: string;
};

const routes: Route[] = [
  { path: '', component: HomePage, title: 'Inicio | Tu Nombre', description: 'Bienvenido a mi portafolio personal.' },
  { path: 'blog', component: BlogPage, title: 'Blog | Tu Nombre', description: 'Lee mis artículos sobre desarrollo web.' },
  { path: 'admin', component: AdminPage, title: 'Admin | Tu Nombre', description: 'Panel de administración de contenido.' },
];

const App: React.FC = () => {
  const getPath = () => window.location.hash.replace(/^#!\//, '');
  const [currentPath, setCurrentPath] = useState(getPath());

  useEffect(() => {
    // Esta función se ejecuta cada vez que cambia el hash de la URL.
    const handleHashChange = () => {
      const newPath = getPath();
      setCurrentPath(newPath);

      // Si el nuevo hash no es una ruta de página (es un ancla), nos desplazamos.
      const hash = window.location.hash;
      if (hash && !hash.startsWith('#!/')) {
        const id = hash.slice(1);
        setTimeout(() => { // Pequeño retardo para asegurar que el DOM esté listo
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Llamada inicial para gestionar el estado de carga (tanto anclas como rutas)
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []); // Se ejecuta solo una vez al montar.

  const renderPage = () => {
    const pathParts = currentPath.split('/');
    const page = pathParts[0];

    if (page === 'blog' && pathParts.length > 1) {
      const postId = pathParts.slice(1).join('/');
      return <BlogPostPage postId={postId} />;
    }
    
    const route = routes.find(r => r.path === page) || routes[0];
    // Si la ruta no es una página (ej. 'contact'), renderizamos la página de inicio.
    if (!route) {
        return <HomePage />;
    }
    return <route.component />;
  };

  useEffect(() => {
    const pathParts = currentPath.split('/');
    const page = pathParts[0];

    if (page === 'blog' && pathParts.length > 1) {
      // El SEO para las publicaciones individuales del blog se gestiona dentro de BlogPostPage
      return;
    }
    
    const route = routes.find(r => r.path === page) || routes[0];
    document.title = route.title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', route.description);
    }

  }, [currentPath]);

  return (
    <div className="bg-stone-50 text-zinc-800 min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;