import React from 'react';
import { GitHubIcon, LinkedInIcon, TwitterIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-800 text-stone-300 py-8">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Tu Nombre. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" aria-label="GitHub" className="hover:text-lime-400 transition-colors">
            <GitHubIcon className="w-6 h-6" />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-lime-400 transition-colors">
            <LinkedInIcon className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-lime-400 transition-colors">
            <TwitterIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;