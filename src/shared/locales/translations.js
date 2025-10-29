// Static translations for UI text
export const translations = {
  es: {
    // Navbar
    nav: {
      home: 'Inicio',
      contact: 'Contacto',
      privacy: 'Privacidad',
      orderNow: 'Ordenar Ahora',
      changeLanguage: 'Cambiar a inglés',
    },
    // HomePage
    home: {
      welcome: 'Bienvenido a',
      heroDescription: 'Experimenta el futuro de la gastronomía con nuestro menú digital. Explora deliciosos platillos y ordena con facilidad.',
      exploreMenu: 'Explorar Menú',
      ourMenu: 'Nuestro Menú',
      menuDescription: 'Descubre nuestra selección de platillos deliciosos preparados con amor.',
      all: 'Todos',
      categories: 'Categorías',
      loading: 'Cargando productos...',
      noProducts: 'No hay productos disponibles',
    },
    // ProductCard
    product: {
      popular: 'Popular',
      new: 'Nuevo',
      soldOut: 'Agotado',
      addToCart: 'Agregar',
      noName: 'Sin nombre',
    },
    // ProductDetailPage
    productDetail: {
      back: 'Volver',
      ingredients: 'Ingredientes',
      quantity: 'Cantidad',
      total: 'Total',
      addToCart: 'Agregar al carrito',
      notAvailable: 'Este producto no está disponible en este momento',
      loading: 'Cargando producto...',
      notFound: 'Producto no encontrado',
      notFoundMessage: 'El producto que buscas no existe.',
      backToMenu: 'Volver al menú',
      noCategory: 'Sin categoría',
      ingredient: 'Ingrediente',
    },
    // Footer
    footer: {
      quickLinks: 'Enlaces Rápidos',
      contactUs: 'Contáctanos',
      followUs: 'Síguenos',
      allRightsReserved: 'Todos los derechos reservados',
      stayUpdated: 'Mantente actualizado con nuestras últimas noticias, ofertas y elementos del menú.',
      about: 'Experimenta el mejor menú digital para restaurantes. Navega, ordena y disfruta de deliciosa comida con solo unos clics.',
    },
    // ContactPage
    contact: {
      title: 'Ponte en Contacto',
      description: '¿Tienes preguntas? Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.',
      contactInfo: 'Información de Contacto',
      address: 'Dirección',
      phone: 'Teléfono',
      email: 'Correo',
      hours: 'Horario de Atención',
      weekdays: 'Lunes - Viernes: 10:00 AM - 10:00 PM',
      weekends: 'Sábado - Domingo: 11:00 AM - 11:00 PM',
      formTitle: 'Envíanos un Mensaje',
      yourName: 'Tu Nombre',
      namePlaceholder: 'Juan Pérez',
      emailAddress: 'Correo Electrónico',
      emailPlaceholder: 'juan@ejemplo.com',
      subject: 'Asunto',
      subjectPlaceholder: '¿Cómo podemos ayudarte?',
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntanos más sobre tu consulta...',
      sendMessage: 'Enviar Mensaje',
    },
  },
  en: {
    // Navbar
    nav: {
      home: 'Home',
      contact: 'Contact',
      privacy: 'Privacy',
      orderNow: 'Order Now',
      changeLanguage: 'Switch to Spanish',
    },
    // HomePage
    home: {
      welcome: 'Welcome to',
      heroDescription: 'Experience the future of dining with our digital menu. Browse delicious dishes and order with ease.',
      exploreMenu: 'Explore Menu',
      ourMenu: 'Our Menu',
      menuDescription: 'Discover our selection of delicious dishes prepared with love.',
      all: 'All',
      categories: 'Categories',
      loading: 'Loading products...',
      noProducts: 'No products available',
    },
    // ProductCard
    product: {
      popular: 'Popular',
      new: 'New',
      soldOut: 'Sold Out',
      addToCart: 'Add',
      noName: 'No name',
    },
    // ProductDetailPage
    productDetail: {
      back: 'Back',
      ingredients: 'Ingredients',
      quantity: 'Quantity',
      total: 'Total',
      addToCart: 'Add to cart',
      notAvailable: 'This product is not available at the moment',
      loading: 'Loading product...',
      notFound: 'Product not found',
      notFoundMessage: 'The product you are looking for does not exist.',
      backToMenu: 'Back to menu',
      noCategory: 'No category',
      ingredient: 'Ingredient',
    },
    // Footer
    footer: {
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us',
      followUs: 'Follow Us',
      allRightsReserved: 'All rights reserved',
      stayUpdated: 'Stay updated with our latest news, offers, and menu items.',
      about: 'Experience the best digital menu for restaurants. Browse, order, and enjoy delicious food with just a few clicks.',
    },
    // ContactPage
    contact: {
      title: 'Get in Touch',
      description: 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.',
      contactInfo: 'Contact Information',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      hours: 'Business Hours',
      weekdays: 'Monday - Friday: 10:00 AM - 10:00 PM',
      weekends: 'Saturday - Sunday: 11:00 AM - 11:00 PM',
      formTitle: 'Send us a Message',
      yourName: 'Your Name',
      namePlaceholder: 'John Doe',
      emailAddress: 'Email Address',
      emailPlaceholder: 'john@example.com',
      subject: 'Subject',
      subjectPlaceholder: 'How can we help?',
      message: 'Message',
      messagePlaceholder: 'Tell us more about your inquiry...',
      sendMessage: 'Send Message',
    },
  },
};

// Helper function to get translation by key path
export const getStaticTranslation = (language, keyPath) => {
  const keys = keyPath.split('.');
  let value = translations[language];

  for (const key of keys) {
    if (value && typeof value === 'object') {
      value = value[key];
    } else {
      return '';
    }
  }

  return value || '';
};
