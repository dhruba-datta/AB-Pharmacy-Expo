import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Image } from 'react-native';
import Papa from 'papaparse';
import * as Font from 'expo-font';
import { styles } from '@/styles/schedule'; // Updated import path

const SCHEDULE_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQYGe49CMfHtSVXwpeytgh5FvCT-06ec539uGMx25oWgEzZo1RvBZaGgZpPTDDW2w/pub?gid=927279133&output=csv';
const closeIcon = require('@/assets/icons/close.png'); // Import the close icon

interface ScheduleData {
  marketName: string;
  description: string;
  order: string;
  delivery: string;
}

const Schedule = () => {
  const [data, setData] = useState<ScheduleData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedMarketName, setSelectedMarketName] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('@/assets/fonts/Poppins-ExtraBold.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  useEffect(() => {
    fetch(SCHEDULE_CSV_URL)
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: false,
          skipEmptyLines: true,
          complete: (results) => {
            console.log('Parsed results:', results.data); // Log the parsed data
            const rows = (results.data as string[][]).slice(3); // Skip the first two rows and cast to string[][]
            const relevantData = rows.map(row => ({
              marketName: row[1] || '',
              description: row[2] || '',
              order: row[3] || '',
              delivery: row[4] || '',
            }));
            setData(relevantData);
            console.log('Relevant data:', relevantData); // Log the relevant data
          },
        });
      })
      .catch(error => console.error('Error fetching CSV:', error));
  }, []);

  const handleMarketNamePress = (marketName: string, description: string) => {
    setSelectedMarketName(marketName);
    setSelectedDescription(description);
    setModalVisible(true);
  };

  const renderMergedRow = (index: number, item: ScheduleData) => {
    const isOrderMerged = item.order !== '';
    const isDeliveryMerged = item.delivery !== '';

    return (
      <View key={index} style={styles.tableRow}>
        <TouchableOpacity onPress={() => handleMarketNamePress(item.marketName, item.description)} style={[styles.tableCell, styles.marketNameCell]}>
          <Text style={styles.marketNameText}>{item.marketName}</Text>
        </TouchableOpacity>
        <Text style={[styles.tableCell, styles.orderCell, isOrderMerged ? styles.mergedCell : null]}>
          {isOrderMerged && item.order}
        </Text>
        <Text style={[styles.tableCell, styles.deliveryCell, isDeliveryMerged ? styles.mergedCell : null]}>
          {isDeliveryMerged && item.delivery}
        </Text>
      </View>
    );
  };

  if (!fontsLoaded) {
    return null; // or render a custom loading component
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order & Delivery</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, styles.headerCell, styles.marketNameCell]}>Market Name</Text>
        <Text style={[styles.tableCell, styles.headerCell, styles.orderCell]}>Order</Text>
        <Text style={[styles.tableCell, styles.headerCell, styles.deliveryCell]}>Delivery</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.map((item, index) => renderMergedRow(index, item))}
      </ScrollView>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeIconContainer}>
            <Image source={closeIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{selectedMarketName}</Text>
          <Text style={styles.modalText}>{selectedDescription}</Text>
        </View>
      </Modal>
    </View>
  );
};

export default Schedule;
