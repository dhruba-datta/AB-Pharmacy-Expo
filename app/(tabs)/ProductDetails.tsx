import React, { useEffect, useState } from 'react';
import { Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { styles } from '@/styles/ProductDetails';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

type Product = {
  'Brand Name': string;
  Description: string;
  Generic: string;
  Company: string;
  Category: string;
  Price: number;
  Stock: string;
};

type CartItem = Product & {
  quantity: number;
};

type RouteParams = {
  params: {
    product: Product;
  };
};

const fetchFonts = () => {
  return Font.loadAsync({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
  });
};

SplashScreen.preventAutoHideAsync();

const ProductDetails = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const { product } = route.params;
  const { addToCart, removeFromCart, cart } = useCart();
  const cartItem = cart.find(cartItem => cartItem['Brand Name'] === product['Brand Name']);

  const handleAddToCart = () => {
    const newCartItem: CartItem = { ...product, quantity: 1 };
    addToCart(newCartItem);
  };

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await fetchFonts();
        setFontsLoaded(true);
        SplashScreen.hideAsync();
      } catch (error) {
        console.warn(error);
      }
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#186F65" />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/product/default.png')}
        style={styles.productImage}
      />
      <Text style={styles.title}>{product['Brand Name']}</Text>
      <Text style={styles.description}>{product['Description']}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Generic: {product['Generic']}</Text>
        <Text style={styles.infoText}>Company: {product['Company']}</Text>
        <Text style={styles.infoText}>Category: {product['Category']}</Text>
      </View>
      <Text style={styles.price}>Price: ৳{product['Price']}</Text>

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
            <Image source={require('@/assets/icons/add.png')} style={styles.buttonIcon} />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </Pressable>
        )
      ) : (
        <Pressable style={[styles.addToCartButton, styles.outOfStockButton]} disabled>
          <Image source={require('@/assets/icons/out.png')} style={styles.buttonIcon} />
          <Text style={styles.addToCartText}>Out of Stock</Text>
        </Pressable>
      )}
    </View>
  );
};

export default ProductDetails;