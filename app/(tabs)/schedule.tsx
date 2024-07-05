import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import Papa from 'papaparse';

const SCHEDULE_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQYGe49CMfHtSVXwpeytgh5FvCT-06ec539uGMx25oWgEzZo1RvBZaGgZpPTDDW2w/pub?gid=927279133&output=csv';

const Schedule = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedMarketName, setSelectedMarketName] = useState('');

  useEffect(() => {
    fetch(SCHEDULE_CSV_URL)
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const relevantData = results.data.slice(2).map(row => ({
              marketName: row['_1'],
              description: row['_2'],
              order: row['_3'],
              delivery: row['_4'],
            }));
            setData(relevantData);
          },
        });
      })
      .catch(error => console.error('Error fetching CSV:', error));
  }, []);

  const handleMarketNamePress = (marketName, description) => {
    setSelectedMarketName(marketName);
    setSelectedDescription(description);
    setModalVisible(true);
  };

  const renderMergedRow = (index, item, data) => {
    const isOrderMerged = index < 3 && data[index].order === data[index + 1].order;
    const isDeliveryMerged = index < 3 && data[index].delivery === data[index + 1].delivery;

    return (
      <View key={index} style={styles.tableRow}>
        <TouchableOpacity onPress={() => handleMarketNamePress(item.marketName, item.description)} style={styles.tableCell}>
          <Text>{item.marketName}</Text>
        </TouchableOpacity>
        <Text style={styles.tableCell}>
          {(!isOrderMerged || index === 0) && item.order}
        </Text>
        <Text style={styles.tableCell}>
          {(!isDeliveryMerged || index === 0) && item.delivery}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.headerCell]}>Market Name</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Order</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Delivery</Text>
        </View>
        {data.map((item, index) => renderMergedRow(index, item, data))}
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
          <Text style={styles.modalTitle}>{selectedMarketName}</Text>
          <Text style={styles.modalText}>{selectedDescription}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textAlign: 'left',
  },
  headerCell: {
    fontWeight: 'bold',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 50,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#186F65',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
