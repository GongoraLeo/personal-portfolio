import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialProjects, initialTestimonials, initialBlogPosts } from '../data/initialData';
import { Project, Testimonial, BlogPost } from '../types';
import { BriefcaseIcon, UserIcon, TestimonialIcon, PenIcon, MailIcon, ExternalLinkIcon, CodeIcon } from '../components/icons';


const SectionTitle: React.FC<{ icon?: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <div className="flex justify-center items-center gap-4 mb-12">
    {icon}
    <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-800">{children}</h2>
  </div>
);

const Section: React.FC<{ id: string; className?: string; children: React.ReactNode; useAnimation?: boolean }> = ({ id, className = 'py-20 md:py-28', children, useAnimation = false }) => (
  <section id={id} className={`${className} ${useAnimation ? 'fade-in-up' : ''}`}>
    <div className="container mx-auto px-6">
      {children}
    </div>
  </section>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden project-card flex flex-col">
    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs font-semibold bg-lime-100 text-lime-800 px-2 py-1 rounded-full">{tag}</span>
        ))}
      </div>
      <p className="text-zinc-600 mb-4 flex-grow">{project.description}</p>
      <div className="flex items-center space-x-6 mt-auto pt-4">
        {project.liveUrl && 
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Ver Proyecto"
            className="text-zinc-500 hover:text-lime-600 transition-colors"
          >
            <ExternalLinkIcon className="w-6 h-6" />
          </a>
        }
        {project.repoUrl && 
          <a 
            href={project.repoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Código Fuente"
            className="text-zinc-500 hover:text-lime-600 transition-colors"
          >
            <CodeIcon className="w-6 h-6" />
          </a>
        }
      </div>
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-lime-600/10 p-8 rounded-xl shadow-sm">
    <p className="text-zinc-700 mb-6 italic">"{testimonial.comment}"</p>
    <div className="text-right">
      <p className="font-bold text-zinc-800">{testimonial.name}</p>
      <p className="text-sm text-lime-700">{testimonial.role}</p>
    </div>
  </div>
);

const BlogPostPreview: React.FC<{ post: BlogPost }> = ({ post }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <p className="text-sm text-zinc-500 mb-2">{post.publishDate}</p>
    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
    <p className="text-zinc-600 mb-4">{post.excerpt}</p>
    <a href={`#!/blog/${post.id}`} className="font-semibold text-lime-600 hover:underline">Leer Más &rarr;</a>
  </div>
);

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: '', email: '', message: '' });

    const validate = () => {
        let tempErrors = { name: '', email: '', message: '' };
        let isValid = true;
        if (!formData.name.trim()) {
            tempErrors.name = 'El nombre es obligatorio.';
            isValid = false;
        }
        if (!formData.email.trim()) {
            tempErrors.email = 'El email es obligatorio.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Por favor, introduce una dirección de email válida.';
            isValid = false;
        }
        if (!formData.message.trim()) {
            tempErrors.message = 'El mensaje no puede estar vacío.';
            isValid = false;
        }
        setErrors(tempErrors);
        return isValid;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            alert("¡Gracias por tu mensaje! Este es un formulario de demostración.");
            setFormData({ name: '', email: '', message: '' });
            setErrors({ name: '', email: '', message: '' });
        }
    }
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
                <label htmlFor="name" className="block text-zinc-700 font-medium mb-2">Nombre</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={`w-full px-4 py-2 border rounded-md focus:outline-none form-input ${errors.name ? 'border-red-500' : 'border-zinc-300'}`} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-zinc-700 font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={`w-full px-4 py-2 border rounded-md focus:outline-none form-input ${errors.email ? 'border-red-500' : 'border-zinc-300'}`} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-6">
                <label htmlFor="message" className="block text-zinc-700 font-medium mb-2">Mensaje</label>
                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required className={`w-full px-4 py-2 border rounded-md focus:outline-none form-input ${errors.message ? 'border-red-500' : 'border-zinc-300'}`}></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <button type="submit" className="w-full bg-lime-600 text-white font-bold py-3 px-6 rounded-md hover:bg-lime-700 transition-colors duration-300">
                Enviar Mensaje
            </button>
        </form>
    </div>
  );
};


const HomePage: React.FC = () => {
  const [projects] = useLocalStorage<Project[]>('projects', initialProjects);
  const [testimonials] = useLocalStorage<Testimonial[]>('testimonials', initialTestimonials);
  const [blogPosts] = useLocalStorage<BlogPost[]>('blogPosts', initialBlogPosts);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-zinc-800 text-white text-center py-24 md:py-40">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Tu Nombre</h1>
          <p className="text-xl md:text-2xl text-lime-400 mb-8">Desarrollador Web Creativo y Solucionador de Problemas</p>
          <a href="#contact" className="bg-lime-500 text-zinc-900 font-bold py-3 px-8 rounded-full hover:bg-lime-400 transition-colors duration-300">Contáctame</a>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" useAnimation={true}>
        <SectionTitle icon={<UserIcon className="w-10 h-10 text-lime-600" />}>Sobre Mí</SectionTitle>
        <div className="max-w-3xl mx-auto text-center text-lg text-zinc-600 leading-relaxed">
          <p className="mb-4">Soy un apasionado desarrollador web con un don para construir sitios y aplicaciones hermosos, funcionales y centrados en el usuario. Con una base sólida en los frameworks modernos de JavaScript y un buen ojo para el diseño, me encanta convertir problemas complejos en soluciones digitales elegantes.</p>
          <p>Cuando no estoy programando, me encontrarás explorando nuevas tecnologías, contribuyendo a proyectos de código abierto o disfrutando de una buena taza de café.</p>
        </div>
      </Section>

      {/* Portfolio Section */}
      <Section id="portfolio" className="bg-stone-100 py-20 md:py-28">
        <SectionTitle icon={<BriefcaseIcon className="w-10 h-10 text-lime-600" />}>Mis Proyectos</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section id="testimonials">
        <SectionTitle icon={<TestimonialIcon className="w-10 h-10 text-lime-600" />}>Testimonios</SectionTitle>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Section>

      {/* Blog Section */}
      <Section id="blog" className="bg-stone-100 py-20 md:py-28">
        <SectionTitle icon={<PenIcon className="w-10 h-10 text-lime-600" />}>Del Blog</SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map(post => (
                <BlogPostPreview key={post.id} post={post} />
            ))}
        </div>
        <div className="text-center mt-12">
            <a href="#!/blog" className="bg-zinc-800 text-white font-bold py-3 px-8 rounded-md hover:bg-zinc-700 transition-colors duration-300">
                Ver Todos los Posts
            </a>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact">
        <SectionTitle icon={<MailIcon className="w-10 h-10 text-lime-600" />}>Contáctame</SectionTitle>
        <ContactForm />
      </Section>
    </>
  );
};

export default HomePage;