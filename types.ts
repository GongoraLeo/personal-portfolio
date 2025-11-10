
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  publishDate: string;
  content: string; // Markdown content
  excerpt: string;
}
