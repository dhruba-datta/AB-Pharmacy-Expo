import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { styles } from '@/styles/ProductDetails';

// Define a type for the product
type Product = {
  'Brand Name': string;
  Description: string;
  Generic: string;
  Company: string;
  Category: string;
  Price: number;
  Stock: string;
};

// Define a type for the cart item, extending the product type
type CartItem = Product & {
  quantity: number;
};

// Define a type for the route params
type RouteParams = {
  params: {
    product: Product;
  };
};

const ProductDetails = () => {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { product } = route.params;
  const { addToCart, removeFromCart, cart } = useCart();
  const cartItem = cart.find(cartItem => cartItem['Brand Name'] === product['Brand Name']);

  const handleAddToCart = () => {
    const newCartItem: CartItem = { ...product, quantity: 1 }; // Initialize quantity to 1
    addToCart(newCartItem);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/300' }} // Placeholder image, replace with your image URL
        style={styles.productImage}
      />
      <Text style={styles.title}>{product['Brand Name']}</Text>
      <Text style={styles.description}>{product['Description']}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Generic: {product['Generic']}</Text>
        <Text style={styles.infoText}>Company: {product['Company']}</Text>
        <Text style={styles.infoText}>Category: {product['Category']}</Text>
        <Text style={styles.infoText}>Price: ৳{product['Price']}</Text>
      </View>

      {product['Stock'] === 'Y' ? (
        cartItem ? (
          <View style={styles.quantitySelector}>
            <Pressable style={styles.quantityButtonContainer} onPress={() => removeFromCart(cartItem['Brand Name'])}>
              <Text style={styles.quantityButton}>-</Text>
            </Pressable>
            <Text style={styles.quantityText}>{cartItem.quantity}</Text>
            <Pressable style={styles.quantityButtonContainer} onPress={() => addToCart({ ...cartItem, quantity: cartItem.quantity + 1 })}>
              <Text style={styles.quantityButton}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
        )
      ) : (
        <Pressable style={[styles.addToCartButton, styles.outOfStockButton]} disabled>
          <Text style={styles.addToCartText}>Out of Stock</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ProductDetails;
