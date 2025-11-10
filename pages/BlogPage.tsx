import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialBlogPosts } from '../data/initialData';
import { BlogPost } from '../types';

const BlogPage: React.FC = () => {
  const [blogPosts] = useLocalStorage<BlogPost[]>('blogPosts', initialBlogPosts);

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Blog</h1>
      <p className="text-lg text-zinc-600 text-center mb-12">Ideas y tutoriales sobre desarrollo web y tecnología.</p>
      
      <div className="max-w-4xl mx-auto space-y-12">
        {blogPosts.length > 0 ? blogPosts.map(post => (
          <article key={post.id} className="group">
            <a href={`#!/blog/${post.id}`}>
              <p className="text-sm text-zinc-500 mb-2">{post.publishDate} &bull; por {post.author}</p>
              <h2 className="text-3xl font-bold text-zinc-800 mb-3 group-hover:text-lime-600 transition-colors duration-300">{post.title}</h2>
              <p className="text-zinc-600 mb-4 leading-relaxed">{post.excerpt}</p>
              <span className="font-semibold text-lime-600 group-hover:underline">Leer Más &rarr;</span>
            </a>
          </article>
        )) : <p className="text-center text-zinc-500">Aún no hay artículos en el blog.</p>}
      </div>
    </div>
  );
};

export default BlogPage;