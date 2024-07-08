import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, Pressable, Image, ActivityIndicator, SafeAreaView, RefreshControl, TextInput } from 'react-native';
import Papa, { ParseResult } from 'papaparse';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { styles } from '@/styles/index';
import { RootParamList } from '@/navigation';

interface Product {
  'Brand Name': string;
  'Category': string;
  'Company': string;
  'Price': string;
  'Stock': string;
}

const fetchFonts = () => {
  return Font.loadAsync({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
  });
};

SplashScreen.preventAutoHideAsync();

const Home: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const scrollViewRef = useRef<ScrollView>(null);
  const { addToCart, removeFromCart, cart } = useCart();

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await fetchFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.warn(error);
      } finally {
        SplashScreen.hideAsync();
      }
    };

    loadFonts();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQYGe49CMfHtSVXwpeytgh5FvCT-06ec539uGMx25oWgEzZo1RvBZaGgZpPTDDW2w/pub?gid=185816065&output=csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
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

  const groupByCategory = (products: Product[]) => {
    return products.reduce((groups, product) => {
      const category = product['Category'] || 'Uncategorized';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(product);
      return groups;
    }, {} as Record<string, Product[]>);
  };

  const groupByCompany = (products: Product[]) => {
    const groupedProducts = products.reduce((groups, product) => {
      const company = product['Company'] || '';
      if (company) {
        if (!groups[company]) {
          groups[company] = [];
        }
        groups[company].push(product);
      }
      return groups;
    }, {} as Record<string, Product[]>);

    const sortedCompanies = Object.keys(groupedProducts).sort((a, b) =>
      a.localeCompare(b)
    );

    return sortedCompanies.reduce((sortedGroups, company) => {
      sortedGroups[company] = groupedProducts[company];
      return sortedGroups;
    }, {} as Record<string, Product[]>);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = data.filter(item =>
      item['Brand Name'].toLowerCase().includes(text.toLowerCase()) ||
      item['Category'].toLowerCase().includes(text.toLowerCase()) ||
      item['Company'].toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const groupedData = groupByCategory(filteredData);
  const groupedCompanyData = groupByCompany(filteredData);
  const categoryNames = Object.keys(groupedData);
  const companyNames = Object.keys(groupedCompanyData);

  const renderCategory = (category: string, products: Product[]) => (
    <View key={category} style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <Pressable onPress={() => navigation.navigate('product', { category })}>
          <Text style={styles.showAll}>Show all {'>'}</Text>
        </Pressable>
      </View>
      <FlatList
        horizontal
        data={products}
        renderItem={({ item }) => renderProduct(item)}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainer}
      />
    </View>
  );

  const renderProduct = (item: Product) => {
    const cartItem = cart.find(cartItem => cartItem['Brand Name'] === item['Brand Name']);
  
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
          <View>
            <Text style={styles.productTitle} numberOfLines={2}>{item['Brand Name']}</Text>
          </View>
        </Pressable>
        <View style={styles.buttonContainer}>
          <Text style={styles.productPrice}>Price: ৳{item['Price']}</Text>
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
  

  const renderCategoryGrid = () => (
    <View style={styles.categoryGrid}>
      {categoryNames.map((category, index) => (
        <Pressable key={index} style={styles.categoryCell} onPress={() => navigation.navigate('product', { category })}>
          <Text style={styles.categoryCellText}>{category}</Text>
        </Pressable>
      ))}
    </View>
  );

  const renderCompanyGrid = () => (
    <View style={styles.companyGrid}>
      {companyNames.map((company, index) => (
        <Pressable key={index} style={styles.companyCell} onPress={() => navigation.navigate('product', { company })}>
          <Text style={styles.companyCellText}>{company}</Text>
        </Pressable>
      ))}
    </View>
  );

  const scrollToCategory = (category: string) => {
    const yOffset = categoryNames.indexOf(category) * 300; // Approximate offset, adjust as needed
    scrollViewRef.current?.scrollTo({ y: yOffset, animated: true });
  };

  if (!fontsLoaded) {
    return null; // or render a custom loading component
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#186F65" />
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          ref={scrollViewRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => {
              setRefreshing(true);
              fetchData();
            }} />
          }
        >
          <Text style={styles.shopByCategoriesHeader}>Shop by Categories</Text>
          {renderCategoryGrid()}
          {categoryNames.map(category =>
            renderCategory(category, groupedData[category])
          )}
          <Text style={styles.shopByCompaniesHeader}>Shop by Companies</Text>
          {renderCompanyGrid()}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Home;
