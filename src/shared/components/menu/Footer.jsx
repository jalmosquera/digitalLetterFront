import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pepper-charcoal text-white">
      <div className="container-pepper py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-cherry-bomb text-2xl text-pepper-orange mb-4">
              Digital Letter
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience the best digital menu for restaurants. Browse, order,
              and enjoy delicious food with just a few clicks.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-gabarito font-bold text-lg mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-pepper-orange transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-pepper-orange transition-colors duration-200 text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-300 hover:text-pepper-orange transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-gabarito font-bold text-lg mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-pepper-orange mt-1"
                />
                <span className="text-gray-300 text-sm">
                  123 Food Street, Restaurant City, RC 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-pepper-orange"
                />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-pepper-orange"
                />
                <span className="text-gray-300 text-sm">
                  hello@digitalletter.com
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-gabarito font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pepper-orange hover:bg-pepper-yellow rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pepper-orange hover:bg-pepper-yellow rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pepper-orange hover:bg-pepper-yellow rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
            </div>
            <p className="text-gray-400 text-xs mt-6 leading-relaxed">
              Stay updated with our latest news, offers, and menu items.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Digital Letter. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
