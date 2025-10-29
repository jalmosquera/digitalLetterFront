import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faMoon, faSun, faGlobe } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useTheme } from '@shared/contexts/ThemeContext';
import { useLanguage } from '@shared/contexts/LanguageContext';

const Navbar = ({ companyName = 'Digital Letter' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    changeLanguage(language === 'es' ? 'en' : 'es');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy', label: 'Privacy' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-pepper-charcoal shadow-sm dark:shadow-gray-800 transition-colors duration-200">
      <div className="container-pepper">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <span className="text-2xl lg:text-3xl font-cherry-bomb text-pepper-orange">
              {companyName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-gabarito font-semibold text-base transition-colors duration-200 ${
                    isActive
                      ? 'text-pepper-orange'
                      : 'text-pepper-charcoal dark:text-white hover:text-pepper-orange'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle (Desktop) */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-pepper-charcoal hover:text-pepper-orange transition-colors duration-200 dark:text-white dark:hover:text-pepper-orange relative"
              aria-label="Toggle language"
              title={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
            >
              <FontAwesomeIcon icon={faGlobe} size="lg" />
              <span className="absolute -bottom-1 -right-1 text-xs font-bold bg-pepper-orange text-white px-1 rounded">
                {language.toUpperCase()}
              </span>
            </button>
            {/* Dark Mode Toggle (Desktop) */}
            <button
              onClick={toggleTheme}
              className="p-2 text-pepper-charcoal hover:text-pepper-orange transition-colors duration-200 dark:text-white dark:hover:text-pepper-orange"
              aria-label="Toggle dark mode"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} size="lg" />
            </button>
            <Link to="/" className="btn-pepper-primary">
              Order Now
            </Link>
          </div>

          {/* Mobile Controls: Language + Dark Mode + Menu */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Language Toggle (Mobile) */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-pepper-charcoal hover:text-pepper-orange transition-colors duration-200 dark:text-white dark:hover:text-pepper-orange relative"
              aria-label="Toggle language"
              title={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
            >
              <FontAwesomeIcon icon={faGlobe} size="lg" />
              <span className="absolute -bottom-1 -right-1 text-xs font-bold bg-pepper-orange text-white px-1 rounded">
                {language.toUpperCase()}
              </span>
            </button>
            {/* Dark Mode Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 text-pepper-charcoal hover:text-pepper-orange transition-colors duration-200 dark:text-white dark:hover:text-pepper-orange"
              aria-label="Toggle dark mode"
            >
              <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} size="lg" />
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="p-2 text-pepper-charcoal hover:text-pepper-orange transition-colors duration-200 dark:text-white dark:hover:text-pepper-orange"
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-3 bg-white dark:bg-pepper-charcoal border-t border-pepper-gray-light dark:border-gray-700">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg font-gabarito font-semibold text-base transition-colors duration-200 ${
                  isActive
                    ? 'bg-pepper-orange text-white'
                    : 'text-pepper-charcoal dark:text-white hover:bg-pepper-light dark:hover:bg-gray-700'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/"
            onClick={closeMenu}
            className="block w-full text-center btn-pepper-primary"
          >
            Order Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  companyName: PropTypes.string,
};

export default Navbar;
