import { StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const modalHeight = screenHeight * 0.3;
const marginTop = (screenHeight - modalHeight) / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    paddingBottom: 2,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#186F65',
    marginBottom: 10,
  },
  scrollContainer: {
    alignItems: 'center',
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#EFF5F5',
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    width: '100%',
  },
  tableCell: {
    fontFamily: 'Poppins-Regular',
    padding: 10,
    borderWidth: 0.2,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  marketNameCell: {
    flex: 1.3,
    textAlign: 'left',
  },
  orderCell: {
    flex: 1,
  },
  deliveryCell: {
    flex: 1,
  },
  headerCell: {
    fontSize: 16,
    color: '#186F65',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    paddingBottom: 5,
  },
  marketNameText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
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
    marginTop: marginTop,
    marginBottom: marginTop,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 15,
    marginTop: 15,
    color: '#186F65',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  tableRowEven: {
    backgroundColor: '#fff',
  },
  tableRowOdd: {
    backgroundColor: '#EEEEEE',
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});