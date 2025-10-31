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
import PropTypes from 'prop-types';
import { useLanguage } from '@shared/contexts/LanguageContext';

const Footer = ({ company }) => {
  const currentYear = new Date().getFullYear();
  const { getTranslation, t } = useLanguage();

  // Extract company data
  const companyName = getTranslation(company?.translations, 'name') || 'Digital Letter';
  const companyAddress = getTranslation(company?.translations, 'address') || '123 Food Street, Restaurant City, RC 12345';
  const companyEmail = company?.email || 'hello@digitalletter.com';
  const companyPhone = company?.phone || '+1 (555) 123-4567';

  // Generate interactive links
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyAddress)}`;
  const whatsappUrl = `https://wa.me/${String(companyPhone).replace(/[^0-9+]/g, '')}`;
  const mailtoUrl = `mailto:${companyEmail}`;

  return (
    <footer className="bg-pepper-charcoal text-white">
      <div className="container-pepper py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className='flex flex-col items-center justify-center'>
            <h3 className="font-cherry-bomb text-2xl text-pepper-orange mb-4">
              {companyName}
            </h3>

            
          </div>

         
          {/* Contact Info */}
          <div>
  <h4 className="font-gabarito font-bold text-lg mb-4 text-center">
    {t('footer.contactUs')}
  </h4>
  <ul className="flex flex-col items-center space-y-3">
    <li className="flex items-center space-x-3">
      <FontAwesomeIcon
        icon={faLocationDot}
        className="text-pepper-orange mt-1"
      />
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 text-sm hover:text-pepper-orange transition-colors cursor-pointer"
      >
        {companyAddress}
      </a>
    </li>
    <li className="flex items-center space-x-3">
      <FontAwesomeIcon icon={faPhone} className="text-pepper-orange" />
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 text-sm hover:text-pepper-orange transition-colors cursor-pointer"
      >
        {companyPhone}
      </a>
    </li>
    <li className="flex items-center space-x-3">
      <FontAwesomeIcon icon={faEnvelope} className="text-pepper-orange" />
      <a
        href={mailtoUrl}
        className="text-gray-300 text-sm hover:text-pepper-orange transition-colors cursor-pointer"
      >
        {companyEmail}
      </a>
    </li>
  </ul>
</div>


          {/* Social Media */}
          <div className="flex flex-col items-center justify-center">
            <h4 className="font-gabarito font-bold text-lg mb-4">{t('footer.followUs')}</h4>
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

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} {companyName}. {t('footer.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  company: PropTypes.shape({
    translations: PropTypes.shape({
      es: PropTypes.shape({
        name: PropTypes.string,
        address: PropTypes.string,
      }),
      en: PropTypes.shape({
        name: PropTypes.string,
        address: PropTypes.string,
      }),
    }),
    email: PropTypes.string,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default Footer;
