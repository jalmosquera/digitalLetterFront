import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPhone,
  faLocationDot,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

const ContactPage = () => {
  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container-pepper">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-gabarito font-black text-4xl md:text-5xl lg:text-6xl text-pepper-charcoal mb-4">
            Get in Touch
          </h1>
          <p className="font-inter text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="font-gabarito font-bold text-2xl md:text-3xl text-pepper-charcoal mb-6">
              Contact Information
            </h2>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pepper-orange rounded-lg flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-white"
                    size="lg"
                  />
                </div>
                <div>
                  <h3 className="font-gabarito font-semibold text-lg text-pepper-charcoal mb-1">
                    Address
                  </h3>
                  <p className="text-gray-600">
                    123 Food Street, Restaurant City, RC 12345
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pepper-yellow rounded-lg flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-white"
                    size="lg"
                  />
                </div>
                <div>
                  <h3 className="font-gabarito font-semibold text-lg text-pepper-charcoal mb-1">
                    Phone
                  </h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">+1 (555) 765-4321</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pepper-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-white"
                    size="lg"
                  />
                </div>
                <div>
                  <h3 className="font-gabarito font-semibold text-lg text-pepper-charcoal mb-1">
                    Email
                  </h3>
                  <p className="text-gray-600">hello@digitalletter.com</p>
                  <p className="text-gray-600">support@digitalletter.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pepper-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-white"
                    size="lg"
                  />
                </div>
                <div>
                  <h3 className="font-gabarito font-semibold text-lg text-pepper-charcoal mb-1">
                    Business Hours
                  </h3>
                  <p className="text-gray-600">Monday - Friday: 10:00 AM - 10:00 PM</p>
                  <p className="text-gray-600">Saturday - Sunday: 11:00 AM - 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-pepper p-8">
            <h2 className="font-gabarito font-bold text-2xl md:text-3xl text-pepper-charcoal mb-6">
              Send us a Message
            </h2>
            <form className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block font-inter font-medium text-pepper-charcoal mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="input-pepper"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-inter font-medium text-pepper-charcoal mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-pepper"
                  placeholder="john@example.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block font-inter font-medium text-pepper-charcoal mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="input-pepper"
                  placeholder="How can we help?"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block font-inter font-medium text-pepper-charcoal mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="input-pepper resize-none"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full btn-pepper-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
