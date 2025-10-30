import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    // Load cart from localStorage on init
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        return [];
      }
    }
    return [];
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  /**
   * Add item to cart or increment quantity if already exists
   * @param {Object} product - Product object with id, name, price, image, translations
   * @param {number} quantity - Quantity to add (default 1)
   */
  const addToCart = (product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.product.id === product.id);

      if (existingItem) {
        // Update quantity if product already in cart
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new product to cart
        return [...prevItems, { product, quantity }];
      }
    });
  };

  /**
   * Remove item from cart completely
   * @param {number} productId - ID of product to remove
   */
  const removeFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter(item => item.product.id !== productId));
  };

  /**
   * Update quantity of item in cart
   * @param {number} productId - ID of product to update
   * @param {number} quantity - New quantity (must be >= 1)
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  /**
   * Increment quantity of item in cart
   * @param {number} productId - ID of product to increment
   */
  const incrementQuantity = (productId) => {
    setItems((prevItems) =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  /**
   * Decrement quantity of item in cart (removes if quantity becomes 0)
   * @param {number} productId - ID of product to decrement
   */
  const decrementQuantity = (productId) => {
    setItems((prevItems) => {
      const item = prevItems.find(i => i.product.id === productId);
      if (!item) return prevItems;

      if (item.quantity <= 1) {
        return prevItems.filter(i => i.product.id !== productId);
      }

      return prevItems.map(i =>
        i.product.id === productId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    });
  };

  /**
   * Clear entire cart
   */
  const clearCart = () => {
    setItems([]);
  };

  /**
   * Get total number of items in cart
   * @returns {number} Total item count
   */
  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Get total price of all items in cart
   * @returns {number} Total price
   */
  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.product.price) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  /**
   * Check if product is in cart
   * @param {number} productId - ID of product to check
   * @returns {boolean} True if product is in cart
   */
  const isInCart = (productId) => {
    return items.some(item => item.product.id === productId);
  };

  /**
   * Get quantity of specific product in cart
   * @param {number} productId - ID of product
   * @returns {number} Quantity in cart (0 if not in cart)
   */
  const getItemQuantity = (productId) => {
    const item = items.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    getItemCount,
    getTotalPrice,
    isInCart,
    getItemQuantity,
    itemCount: getItemCount(),
    totalPrice: getTotalPrice(),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
