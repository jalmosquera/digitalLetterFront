const PrivacyPage = () => {
  return (
    <div className="min-h-screen py-12 lg:py-20 bg-pepper-light">
      <div className="container-pepper max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-gabarito font-black text-4xl md:text-5xl lg:text-6xl text-pepper-charcoal mb-4">
            Privacy Policy
          </h1>
          <p className="font-inter text-lg text-gray-600">
            Last updated: October 28, 2025
          </p>
        </div>

        {/* Content */}
        <div className="card-pepper p-8 lg:p-12 space-y-8">
          {/* Section 1 */}
          <section>
            <h2 className="font-gabarito font-bold text-2xl md:text-3xl text-pepper-charcoal mb-4">
              1. Introduction
            </h2>
            <p className="font-inter text-gray-700 leading-relaxed">
              Welcome to Digital Letter. We respect your privacy and are
              committed to protecting your personal data. This privacy policy
              will inform you about how we look after your personal data when
              you visit our website and tell you about your privacy rights and
              how the law protects you.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-gabarito font-bold text-2xl md:text-3xl text-pepper-charcoal mb-4">
              2. Information We Collect
            </h2>
            <p className="font-inter text-gray-700 leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together as follows:
            </p>
            <ul className="font-inter text-gray-700 space-y-2 ml-6 list-disc">
              <li>
                <strong>Identity Data:</strong> includes first name, last name,
                username or similar identifier.
              </li>
              <li>
                <strong>Contact Data:</strong> includes email address and
                telephone numbers.
              </li>
              <li>
                <strong>Technical Data:</strong> includes internet protocol
                (IP) address, browser type and version, time zone setting and
                location.
              </li>
              <li>
                <strong>Usage Data:</strong> includes information about how you
                use our website and services.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-gabarito font-bold text-2xl md:text-3xl text-pepper-charcoal mb-4">
              3. How We Use Your Information
            </h2>
            <p className="font-inter text-gray-700 leading-relaxed mb-4">
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul className="font-inter text-gray-700 space-y-2 ml-6 list-disc">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-gabarito font-bold text-2xl md:text-3xl text-pepper-charcoal mb-4">
              4. Data Security
            </h2>
            <p className="font-inter text-gray-700 leading-relaxed">
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way, altered or disclosed. We limit access to your
              personal data to those employees, agents, contractors and other
              third parties who have a business need to know.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-gabarito font-bold text-2xl md:text-3xl text-pepper-charcoal mb-4">
              5. Your Legal Rights
            </h2>
            <p className="font-inter text-gray-700 leading-relaxed mb-4">
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data, including the right to:
            </p>
            <ul className="font-inter text-gray-700 space-y-2 ml-6 list-disc">
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request erasure of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
              <li>Request transfer of your personal data</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-gabarito font-bold text-2xl md:text-3xl text-pepper-charcoal mb-4">
              6. Contact Us
            </h2>
            <p className="font-inter text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at:{' '}
              <a
                href="mailto:privacy@digitalletter.com"
                className="text-pepper-orange hover:text-pepper-yellow underline transition-colors duration-200"
              >
                privacy@digitalletter.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
