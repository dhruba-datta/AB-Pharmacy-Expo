import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback, Image, ActivityIndicator, FlatList } from 'react-native';
import Papa from 'papaparse';
import * as Font from 'expo-font';
import { styles } from '@/styles/schedule';

const SCHEDULE_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQYGe49CMfHtSVXwpeytgh5FvCT-06ec539uGMx25oWgEzZo1RvBZaGgZpPTDDW2w/pub?gid=927279133&output=csv';
const closeIcon = require('@/assets/icons/close.png'); 

interface ScheduleData {
  marketName: string;
  description: string;
  order: string;
  delivery: string;
}

const fetchFonts = () => {
  return Font.loadAsync({
    'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
  });
};

const Schedule = () => {
  const [data, setData] = useState<ScheduleData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedMarketName, setSelectedMarketName] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await fetchFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.warn(error);
      }
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
            const rows = (results.data as string[][]).slice(3);
            const relevantData = rows.map(row => ({
              marketName: row[1] || '',
              description: row[2] || '',
              order: row[3] || '',
              delivery: row[4] || '',
            }));
            setData(relevantData);
            setLoading(false);
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

  const renderRow = ({ item, index }: { item: ScheduleData; index: number }) => {
    const colorIndex = Math.floor(index / 4) % 2;
    const rowStyle = colorIndex === 0 ? styles.tableRowEven : styles.tableRowOdd;

    return (
      <View key={index} style={[styles.tableRow, rowStyle]}>
        <TouchableOpacity onPress={() => handleMarketNamePress(item.marketName, item.description)} style={[styles.tableCell, styles.marketNameCell]}>
          <Text style={styles.marketNameText}>{item.marketName}</Text>
        </TouchableOpacity>
        <Text style={[styles.tableCell, styles.orderCell]}>
          {item.order}
        </Text>
        <Text style={[styles.tableCell, styles.deliveryCell]}>
          {item.delivery}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order & Delivery</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableCell, styles.headerCell, styles.marketNameCell]}>Market Name</Text>
        <Text style={[styles.tableCell, styles.headerCell, styles.orderCell]}>Order</Text>
        <Text style={[styles.tableCell, styles.headerCell, styles.deliveryCell]}>Delivery</Text>
      </View>
      {loading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#186F65" />
        </View>
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.scrollContainer}
        />
      ) : (
        <Text style={styles.noResults}>No data found.</Text>
      )}

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
