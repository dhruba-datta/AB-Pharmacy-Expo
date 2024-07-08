import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, Pressable, Image, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import Papa from 'papaparse';
import { useCart } from '../context/CartContext';
import { useNavigation, useRoute, useIsFocused, RouteProp, CompositeNavigationProp, NavigationProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { styles } from '@/styles/product';

type Product = {
  'Brand Name': string;
  'Category': string;
  'Company': string;
  'Description': string;
  'Price': string;
  'Stock': string;
};

type RootStackParamList = {
  ProductDetails: { product: Product };
  Product: { category?: string; company?: string };
  search: undefined;
};

type ProductScreenNavigationProp = CompositeNavigationProp<
  NavigationProp<RootStackParamList, 'ProductDetails'>,
  NavigationProp<RootStackParamList, 'Product'>
>;

const fetchFonts = () => {
  return Font.loadAsync({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
  });
};

SplashScreen.preventAutoHideAsync();

const ProductScreen = () => {
  const [data, setData] = useState<Product[]>([]);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedFilterType, setSelectedFilterType] = useState<string>('Category');
  const [selectedCategoryOrCompany, setSelectedCategoryOrCompany] = useState<string>('All');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const defaultFilterType = useRef<string>('Category');
  const defaultCategoryOrCompany = useRef<string>('All');
  const { addToCart, removeFromCart, cart } = useCart();
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'Product'>>();
  const { category, company } = route.params || {};
  const isFocused = useIsFocused();

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
    if (isFocused && !dataFetched) {
      setLoading(true);
      fetchData();
    } else if (isFocused) {
      applyFilters();
    }
  }, [category, company, isFocused]);

  const fetchData = () => {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQYGe49CMfHtSVXwpeytgh5FvCT-06ec539uGMx25oWgEzZo1RvBZaGgZpPTDDW2w/pub?gid=185816065&output=csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const allProducts = results.data as Product[];
            setData(allProducts);
            setDataFetched(true);
            applyFilters(allProducts);
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

  const applyFilters = (allProducts: Product[] = data) => {
    const filteredProducts = category
      ? allProducts.filter(product => product['Category'] === category)
      : company
        ? allProducts.filter(product => product['Company'] === company)
        : allProducts;
    setFilteredData(filteredProducts);
    setSelectedCategoryOrCompany(category || company || defaultCategoryOrCompany.current);
    setSelectedFilterType(category ? 'Category' : company ? 'Company' : defaultFilterType.current);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    setLoading(true);
    filterData(text, selectedCategoryOrCompany, selectedFilterType);
  };

  const handleFilterTypeChange = (type: string) => {
    setSelectedFilterType(type);
    setSelectedCategoryOrCompany('All');
    setLoading(true);
    filterData(search, 'All', type);
  };

  const handleCategoryOrCompanyChange = (value: string) => {
    setSelectedCategoryOrCompany(value);
    setLoading(true);
    filterData(search, value, selectedFilterType);
  };

  const resetFilter = () => {
    setSearch('');
    setSelectedFilterType(defaultFilterType.current);
    setSelectedCategoryOrCompany(defaultCategoryOrCompany.current);
    setFilteredData(data);
  };

  const filterData = (searchText: string, categoryOrCompany: string, type: string) => {
    const filtered = data.filter(item => {
      const matchesSearch = item['Brand Name'].toLowerCase().includes(searchText.toLowerCase()) ||
                            item['Category'].toLowerCase().includes(searchText.toLowerCase()) ||
                            item['Company'].toLowerCase().includes(searchText.toLowerCase());
      const matchesCategoryOrCompany = categoryOrCompany === 'All' || item[type as keyof Product] === categoryOrCompany;
      return matchesSearch && matchesCategoryOrCompany;
    });
    setFilteredData(filtered);
    setLoading(false);
  };

  const renderItem = ({ item }: { item: Product }) => {
    const cartItem = cart.find(cartItem => cartItem['Brand Name'] === item['Brand Name']);
  
    return (
      <Pressable
        style={styles.card}
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      >
        <Image
          source={require('@/assets/images/product/default.png')}
          style={styles.productImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item['Brand Name']}</Text>
          <Text style={styles.description}>{item['Description']}</Text>
          <View style={styles.priceButtonContainer}>
            <Text style={styles.price}>Price: ৳{item['Price']}</Text>
            <View style={styles.buttonContainer}>
              {item['Stock'] === 'Y' ? (
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
        </View>
      </Pressable>
    );
  };

  const getOptions = () => {
    if (selectedFilterType === 'Category') {
      return ['All', ...new Set(data.map(item => item['Category']))];
    } else {
      return ['All', ...new Set(data.filter(item => item['Company']).map(item => item['Company']).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())))];
    }
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
      <View style={styles.searchContainer}>
        <Image source={require('@/assets/icons/search.png')} style={styles.searchIcon} />
        <TextInput
          placeholder="Search Products..."
          onChangeText={handleSearch}
          value={search}
          style={styles.searchBarInput}
        />
      </View>
      <View style={styles.filterContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedFilterType}
            onValueChange={handleFilterTypeChange}
            style={styles.picker}
          >
            <Picker.Item label="Category" value="Category" />
            <Picker.Item label="Company" value="Company" />
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCategoryOrCompany}
            onValueChange={handleCategoryOrCompanyChange}
            style={styles.picker}
          >
            {getOptions().map((option, index) => (
              <Picker.Item key={index} label={option} value={option} />
            ))}
          </Picker>
        </View>
        <Pressable style={styles.resetButton} onPress={resetFilter}>
          <Image source={require('@/assets/icons/reset.png')} style={styles.resetIcon} />
        </Pressable>
      </View>
      {loading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#186F65" />
        </View>
      ) : filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : (
        <Text style={styles.noResults}>No products found.</Text>
      )}
    </View>
  );
};

export default ProductScreen;
