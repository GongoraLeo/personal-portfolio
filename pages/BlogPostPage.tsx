import React, { useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialBlogPosts } from '../data/initialData';
import { BlogPost } from '../types';

interface BlogPostPageProps {
  postId: string;
}

// Un componente simple para renderizar contenido similar a markdown
const RichTextRenderer: React.FC<{ content: string }> = ({ content }) => {
  const blocks = content.split(/\n{2,}/);

  const renderLine = (line: string, key: number) => {
    if (line.startsWith('# ')) {
      return <h1 key={key} className="text-4xl font-bold text-zinc-900 mt-8 mb-4">{line.substring(2)}</h1>;
    }
    if (line.startsWith('## ')) {
      return <h2 key={key} className="text-3xl font-bold text-zinc-900 mt-6 mb-3">{line.substring(3)}</h2>;
    }
    // Basic list support
    if (line.startsWith('* ')) {
        const listItems = line.split('\n').map((item, i) => (
            <li key={i} className="ml-6 list-disc">{item.substring(2)}</li>
        ));
        return <ul key={key} className="my-4">{listItems}</ul>
    }
    return <p key={key} className="my-4 leading-relaxed">{line}</p>;
  }

  return (
    <div className="prose lg:prose-xl max-w-none text-zinc-700">
      {blocks.map((block, index) => {
          if (block.startsWith('```')) {
              const code = block.replace(/```(javascript|typescript)?\n|```/g, '');
              return <pre key={index} className="bg-zinc-800 text-stone-200 p-4 rounded-md overflow-x-auto my-6"><code className="font-mono text-sm">{code}</code></pre>
          }
          return renderLine(block, index);
      })}
    </div>
  );
};

const BlogPostPage: React.FC<BlogPostPageProps> = ({ postId }) => {
  const [blogPosts] = useLocalStorage<BlogPost[]>('blogPosts', initialBlogPosts);
  const post = blogPosts.find(p => p.id === postId);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Tu Nombre`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', post.excerpt);
      }
    }
  }, [post]);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">Artículo no encontrado</h1>
        <a href="#!/blog" className="text-lime-600 hover:underline mt-4 inline-block">Volver al Blog</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12">
            <a href="#!/blog" className="text-lime-600 hover:underline mb-6 inline-block">&larr; Volver a todos los artículos</a>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4">{post.title}</h1>
          <p className="text-zinc-500">{post.publishDate} por {post.author}</p>
        </header>
        <RichTextRenderer content={post.content} />
      </article>
    </div>
  );
};

export default BlogPostPage;