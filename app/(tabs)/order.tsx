import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, TextInput, Modal, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '@/app/context/CartContext';
import { Picker } from '@react-native-picker/picker';
import { styles } from '@/styles/order';
import * as Linking from 'expo-linking';

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

export default function Order() {
  const { cart, removeAllFromCart } = useCart() as unknown as { cart: CartItem[], removeAllFromCart: (brandName: string) => void };
  const [modalVisible, setModalVisible] = useState(false);
  const [shopName, setShopName] = useState('');
  const [marketName, setMarketName] = useState('');

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemText}>{item['Brand Name']}</Text>
      <Text style={styles.cartItemQuantity}>Qty: {item.quantity}</Text>
      <Text style={styles.cartItemPrice}>৳{item.Price}</Text>
      <Pressable onPress={() => removeAllFromCart(item['Brand Name'])} style={styles.removeButton}>
        <Image source={require('@/assets/icons/trash.png')} style={styles.trashIcon} />
      </Pressable>
    </View>
  );

  const handleOrderNow = () => {
    setModalVisible(true);
  };

  const handleSubmitOrder = () => {
    if (shopName.trim() === '' || marketName.trim() === '') {
      Alert.alert('Warning', 'Please fill in all the fields.');
      return;
    }

    const orderDetails = cart.map(item => `Brand: ${item['Brand Name']}, Qty: ${item.quantity}, Price: ৳${item.Price}`).join('\n');
    const totalPrice = cart.reduce((total, item) => total + item.Price * item.quantity, 0).toFixed(2);
    const message = `Shop Name: ${shopName}\nMarket Name: ${marketName}\n\nOrder Details:\n${orderDetails}\n\nTotal Price: ৳${totalPrice}`;

    const url = `https://wa.me/8801912555765?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);

    // Clear the cart after opening the URL
    cart.forEach(item => removeAllFromCart(item['Brand Name']));

    setModalVisible(false);
    setShopName('');
    setMarketName('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No items in cart</Text>}
      />
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>
          Total Price: ৳
          {cart.reduce((total, item) => total + item.Price * item.quantity, 0).toFixed(2)}
        </Text>
        <Pressable style={[styles.orderButton, cart.length === 0 && styles.disabledOrderButton]} onPress={handleOrderNow} disabled={cart.length === 0}>
          <Text style={styles.orderButtonText}>Order Now</Text>
        </Pressable>
      </View>
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Image source={require('@/assets/icons/close.png')} style={styles.closeIcon} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Order Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Shop Name"
              value={shopName}
              onChangeText={(text) => {
                setShopName(text);
              }}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={marketName}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  setMarketName(itemValue);
                }}
              >
                <Picker.Item label="Select a market" value="" />
                <Picker.Item label="Banglabazar" value="Banglabazar" />
                <Picker.Item label="Bhadrashan" value="Bhadrashan" />
                <Picker.Item label="Boharatola" value="Boharatola" />
                <Picker.Item label="Bondorkhola" value="Bondorkhola" />
                <Picker.Item label="Chanderchar" value="Chanderchar" />
                <Picker.Item label="Choto Kutubpur" value="Choto Kutubpur" />
                <Picker.Item label="Ganganagar" value="Ganganagar" />
                <Picker.Item label="Kazirhat" value="Kazirhat" />
                <Picker.Item label="Majhirghat" value="Majhirghat" />
                <Picker.Item label="Matborchar" value="Matborchar" />
                <Picker.Item label="Naodoba" value="Naodoba" />
                <Picker.Item label="Panchar" value="Panchar" />
                <Picker.Item label="Shakpur" value="Shakpur" />
                <Picker.Item label="Sheruail" value="Sheruail" />
                <Picker.Item label="Shibchar Sadar 1" value="Shibchar Sadar 1" />
                <Picker.Item label="Shibchar Sadar 2" value="Shibchar Sadar 2" />
                <Picker.Item label="Shibchar Sadar 3" value="Shibchar Sadar 3" />
                <Picker.Item label="Shibchar Sadar 4" value="Shibchar Sadar 4" />
                <Picker.Item label="Surjonagar" value="Surjonagar" />
                <Picker.Item label="Zajira 1" value="Zajira 1" />
                <Picker.Item label="Zajira 2" value="Zajira 2" />
              </Picker>
            </View>
            <Pressable
              style={styles.submitButton}
              onPress={handleSubmitOrder}
            >
              <Text style={styles.submitButtonText}>Submit Order</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
