import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Pressable, Image, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import Papa, { ParseResult } from 'papaparse';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useCart, CartItem } from '../context/CartContext';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { styles } from '@/styles/search';

type Product = {
  'Brand Name': string;
  Price: number;
  Stock: string;
  Category: string;
  Company: string;
};

type RootStackParamList = {
  ProductDetails: { product: Product };
};

const fetchFonts = () => {
  return Font.loadAsync({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
  });
};

SplashScreen.preventAutoHideAsync();

const Search: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const searchInputRef = useRef<any>(null);
  const { addToCart, removeFromCart, cart } = useCart();

  const fetchData = () => {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQYGe49CMfHtSVXwpeytgh5FvCT-06ec539uGMx25oWgEzZo1RvBZaGgZpPTDDW2w/pub?gid=185816065&output=csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse<Product>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<Product>) => {
            setData(results.data);
            setFilteredData(results.data);
            setLoading(false);
            setRefreshing(false);
          },
        });
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        setRefreshing(false);
      });
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleSearch = (text: string): void => {
    setSearch(text);
    const filtered = data.filter(item =>
      item['Brand Name'].toLowerCase().includes(text.toLowerCase()) ||
      (item.Category && item.Category.toLowerCase().includes(text.toLowerCase())) ||
      (item.Company && item.Company.toLowerCase().includes(text.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  const renderProduct = ({ item }: { item: Product }) => {
    const cartItem = cart.find(cartItem => cartItem['Brand Name'] === item['Brand Name']) as CartItem | undefined;

    return (
      <View style={styles.productCard}>
        <Pressable
          style={styles.productInfo}
          onPress={() => navigation.navigate('ProductDetails', { product: item })}
        >
          <Image
            source={require('@/assets/images/product/default.png')}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{item['Brand Name']}</Text>
            <Text style={styles.productPrice}>Price: ৳{item['Price']}</Text>
          </View>
        </Pressable>
        <View style={styles.buttonContainer}>
          {item['Stock'] === 'Y' ? (
            cartItem ? (
              <View style={styles.quantitySelector}>
                <Pressable style={styles.quantityButtonContainer} onPress={() => removeFromCart(cartItem['Brand Name'])}>
                  <Text style={styles.quantityButton}>-</Text>
                </Pressable>
                <Text style={styles.quantityText}>{cartItem.quantity}</Text>
                <Pressable style={styles.quantityButtonContainer} onPress={() => addToCart(cartItem)}>
                  <Text style={styles.quantityButton}>+</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable style={styles.addToCartButton} onPress={() => addToCart({ ...item, quantity: 1 })}>
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
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#186F65" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image source={require('@/assets/icons/search.png')} style={styles.searchIcon} />
        <TextInput
          placeholder="Search Products..."
          onChangeText={handleSearch}
          value={search}
          style={styles.searchBarInput}
          ref={searchInputRef}
        />
      </View>
      {loading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#186F65" />
        </View>
      ) : (
        filteredData.length === 0 ? (
          <Text style={styles.noProductsText}>No products found</Text>
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderProduct}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          />
        )
      )}
    </View>
  );
};

export default Search;
