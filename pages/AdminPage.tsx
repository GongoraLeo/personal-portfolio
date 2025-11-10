import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialProjects, initialTestimonials, initialBlogPosts } from '../data/initialData';
import { Project, Testimonial, BlogPost } from '../types';

type Item = Project | Testimonial | BlogPost;

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Contraseña simple (cambiar en producción)
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      onLogin();
    } else {
      setError('Contraseña incorrecta.');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Acceso de Administrador</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="password" className="block text-zinc-700 mb-2">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-lime-500 focus:outline-none"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button type="submit" className="w-full bg-lime-600 text-white font-bold py-2 px-4 rounded-md hover:bg-lime-700 transition-colors">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [projects, setProjects] = useLocalStorage<Project[]>('projects', initialProjects);
  const [testimonials, setTestimonials] = useLocalStorage<Testimonial[]>('testimonials', initialTestimonials);
  const [blogPosts, setBlogPosts] = useLocalStorage<BlogPost[]>('blogPosts', initialBlogPosts);
  const [currentTab, setCurrentTab] = useState('projects');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const openModal = (item: Item | null = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };
  
  const handleSave = (item: Item) => {
    const isNew = !('id' in item && item.id);
    const id = isNew ? Date.now().toString() : item.id;
    
    switch(currentTab) {
        case 'projects':
            const project = {...item, id} as Project;
            setProjects(prev => isNew ? [...prev, project] : prev.map(p => p.id === id ? project : p));
            break;
        case 'testimonials':
            const testimonial = {...item, id} as Testimonial;
            setTestimonials(prev => isNew ? [...prev, testimonial] : prev.map(t => t.id === id ? testimonial : t));
            break;
        case 'blog':
            const blogPost = {...item, id} as BlogPost;
            setBlogPosts(prev => isNew ? [...prev, blogPost] : prev.map(b => b.id === id ? blogPost : b));
            break;
    }
    closeModal();
  };

  const handleDelete = (type: string, id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
        switch (type) {
            case 'projects': setProjects(prev => prev.filter(p => p.id !== id)); break;
            case 'testimonials': setTestimonials(prev => prev.filter(t => t.id !== id)); break;
            case 'blog': setBlogPosts(prev => prev.filter(b => b.id !== id)); break;
        }
    }
  };

  const tabs: {[key: string]: {title: string, data: Item[], component: React.FC<any>}} = {
      projects: { title: "Proyectos", data: projects, component: ProjectForm},
      testimonials: { title: "Testimonios", data: testimonials, component: TestimonialForm},
      blog: { title: "Artículos del Blog", data: blogPosts, component: BlogPostForm},
  }
  
  const CurrentForm = tabs[currentTab].component;

  return (
    <div className="max-w-6xl mx-auto py-12">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <button onClick={onLogout} className="bg-zinc-700 text-white py-2 px-4 rounded-md hover:bg-zinc-600">Cerrar Sesión</button>
        </div>
        <div className="flex border-b mb-8">
            {Object.keys(tabs).map(tabKey => (
                 <button key={tabKey} onClick={() => setCurrentTab(tabKey)} className={`py-2 px-4 ${currentTab === tabKey ? 'border-b-2 border-lime-600 font-semibold text-lime-700' : 'text-zinc-500'}`}>{tabs[tabKey].title}</button>
            ))}
        </div>
        
        <div className="text-right mb-6">
            <button onClick={() => openModal()} className="bg-lime-600 text-white font-bold py-2 px-4 rounded-md hover:bg-lime-700">Añadir Nuevo</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Gestionar {tabs[currentTab].title}</h2>
            <div className="space-y-4">
                {tabs[currentTab].data.map((item: any) => (
                    <div key={item.id} className="p-4 border rounded flex justify-between items-center">
                        <span>{item.title || item.name}</span>
                        <div>
                            <button onClick={() => openModal(item)} className="text-blue-500 hover:underline mr-4">Editar</button>
                            <button onClick={() => handleDelete(currentTab, item.id)} className="text-red-500 hover:underline">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-bold mb-6">{editingItem ? 'Editar' : 'Añadir'} {tabs[currentTab].title.slice(0,-1)}</h3>
                    <CurrentForm item={editingItem} onSave={handleSave} onCancel={closeModal} />
                </div>
            </div>
        )}

    </div>
  );
};

// --- Form Components ---

const FormInput: React.FC<any> = (props) => (
    <input {...props} className="w-full p-2 border rounded" />
);

const FormTextarea: React.FC<any> = (props) => (
    <textarea {...props} className={`w-full p-2 border rounded ${props.className}`} />
);

const FormButton: React.FC<{ type?: 'button' | 'submit'; onClick?: () => void; children: React.ReactNode; primary?: boolean }> = ({ type = 'button', onClick, children, primary = false }) => (
    <button type={type} onClick={onClick} className={`py-2 px-4 rounded ${primary ? 'bg-lime-600 text-white' : 'bg-zinc-200'}`}>
        {children}
    </button>
);


const ProjectForm: React.FC<{item: Project | null, onSave: (item: any) => void, onCancel: () => void}> = ({ item, onSave, onCancel }) => {
    const [data, setData] = useState(item || { title: '', description: '', imageUrl: 'https://picsum.photos/seed/new/600/400', tags: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setData({...data, [e.target.name]: e.target.value});
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({...data, tags: typeof data.tags === 'string' ? data.tags.split(',').map(t => t.trim()) : data.tags });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput name="title" value={data.title} onChange={handleChange} placeholder="Título" required />
            <FormTextarea name="description" value={data.description} onChange={handleChange} placeholder="Descripción" required className="h-24" />
            <FormInput name="imageUrl" value={data.imageUrl} onChange={handleChange} placeholder="URL de la imagen" required />
            <FormInput name="tags" value={Array.isArray(data.tags) ? data.tags.join(', ') : data.tags} onChange={handleChange} placeholder="Tags (separados por coma)" />
            <div className="flex justify-end gap-4 pt-4">
                <FormButton onClick={onCancel}>Cancelar</FormButton>
                <FormButton type="submit" primary>Guardar</FormButton>
            </div>
        </form>
    );
};

const TestimonialForm: React.FC<{item: Testimonial | null, onSave: (item: any) => void, onCancel: () => void}> = ({ item, onSave, onCancel }) => {
    const [data, setData] = useState(item || { name: '', role: '', comment: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setData({...data, [e.target.name]: e.target.value});
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(data); };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput name="name" value={data.name} onChange={handleChange} placeholder="Nombre" required />
            <FormInput name="role" value={data.role} onChange={handleChange} placeholder="Rol/Empresa" required />
            <FormTextarea name="comment" value={data.comment} onChange={handleChange} placeholder="Comentario" required className="h-24" />
            <div className="flex justify-end gap-4 pt-4">
                <FormButton onClick={onCancel}>Cancelar</FormButton>
                <FormButton type="submit" primary>Guardar</FormButton>
            </div>
        </form>
    );
};

const BlogPostForm: React.FC<{item: BlogPost | null, onSave: (item: any) => void, onCancel: () => void}> = ({ item, onSave, onCancel }) => {
    const [data, setData] = useState(item || { title: '', author: 'Tu Nombre', publishDate: new Date().toISOString().split('T')[0], excerpt: '', content: '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setData({...data, [e.target.name]: e.target.value});
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave({...data, id: item?.id || data.title.toLowerCase().replace(/\s+/g, '-') }); };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput name="title" value={data.title} onChange={handleChange} placeholder="Título" required />
            <FormInput name="author" value={data.author} onChange={handleChange} placeholder="Autor" required />
            <FormInput type="date" name="publishDate" value={data.publishDate} onChange={handleChange} required />
            <FormTextarea name="excerpt" value={data.excerpt} onChange={handleChange} placeholder="Extracto" required className="h-20" />
            <FormTextarea name="content" value={data.content} onChange={handleChange} placeholder="Contenido (Markdown)" required className="h-48 font-mono" />
            <div className="flex justify-end gap-4 pt-4">
                <FormButton onClick={onCancel}>Cancelar</FormButton>
                <FormButton type="submit" primary>Guardar</FormButton>
            </div>
        </form>
    );
};

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {isLoggedIn ? <AdminDashboard onLogout={handleLogout} /> : <AdminLogin onLogin={handleLogin} />}
    </div>
  );
};

export default AdminPage;