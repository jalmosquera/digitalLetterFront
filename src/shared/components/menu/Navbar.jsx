import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faMoon, faSun, faGlobe, faUser, faSignOutAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useTheme } from '@shared/contexts/ThemeContext';
import { useLanguage } from '@shared/contexts/LanguageContext';
import { useAuth } from '@shared/contexts/AuthContext';
import { useCart } from '@shared/contexts/CartContext';

const Navbar = ({ companyName = 'Digital Letter' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();

  const toggleLanguage = () => {
    changeLanguage(language === 'es' ? 'en' : 'es');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/privacy', label: t('nav.privacy') },
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
              title={t('nav.changeLanguage')}
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

            {/* Cart Button (Desktop) */}
            <Link
              to="/cart"
              className="p-2 text-pepper-charcoal hover:text-pepper-orange transition-colors duration-200 dark:text-white dark:hover:text-pepper-orange relative"
              aria-label={`${t('cart.title')} - ${itemCount} ${itemCount === 1 ? t('cart.item') : t('cart.items')}`}
            >
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pepper-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <span className="text-sm text-pepper-charcoal dark:text-white font-gabarito">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-pepper-secondary flex items-center space-x-2"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>{t('auth.logout')}</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-pepper-secondary">
                  {t('auth.login')}
                </Link>
                <Link to="/register" className="btn-pepper-primary">
                  {t('auth.register')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile Controls: Language + Dark Mode + Cart + Menu */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Language Toggle (Mobile) */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-pepper-charcoal hover:text-pepper-orange transition-colors duration-200 dark:text-white dark:hover:text-pepper-orange relative"
              aria-label="Toggle language"
              title={t('nav.changeLanguage')}
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
            {/* Cart Button (Mobile) */}
            <Link
              to="/cart"
              className="p-2 text-pepper-charcoal hover:text-pepper-orange transition-colors duration-200 dark:text-white dark:hover:text-pepper-orange relative"
              aria-label={`${t('cart.title')} - ${itemCount} ${itemCount === 1 ? t('cart.item') : t('cart.items')}`}
            >
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pepper-orange text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
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

          {/* Auth Buttons Mobile */}
          {isAuthenticated ? (
            <>
              <div className="px-4 py-3 text-center text-sm text-pepper-charcoal dark:text-white font-gabarito">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                {user?.name}
              </div>
              <button
                onClick={handleLogout}
                className="block w-full text-center btn-pepper-secondary"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                {t('auth.logout')}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block w-full text-center btn-pepper-secondary"
              >
                {t('auth.login')}
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="block w-full text-center btn-pepper-primary"
              >
                {t('auth.register')}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  companyName: PropTypes.string,
};

export default Navbar;
