import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#!/', text: 'Inicio' },
    { href: '#!/blog', text: 'Blog' },
    { href: '#!/admin', text: 'Admin' },
  ];

  return (
    <header className="bg-stone-50/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#!/" className="text-2xl font-bold text-zinc-800 hover:text-lime-600 transition-colors">
          TN.
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-zinc-600 hover:text-lime-600 font-medium transition-colors"
            >
              {link.text}
            </a>
          ))}
        </nav>
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-zinc-800 focus:outline-none"
            aria-label="Abrir menú"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-stone-50">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-zinc-600 hover:text-lime-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;