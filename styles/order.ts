import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  cartItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemTextContainer: {
    flex: 1,
  },
  cartItemText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  cartItemQuantity: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#555',
  },
  cartItemPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemTotalPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#186F65', // Updated color for individual prices
    marginRight: 10,
    marginTop: 7,
  },
  removeButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  trashIcon: {
    width: 24,
    height: 24,
    tintColor: '#FF204E',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginTop: 20,
    color: '#999',
  },
  totalPriceContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    flexDirection: 'row', // To allow nested texts to be aligned properly
  },
  totalPriceLabelText: {
    color: '#000', // Black for "Total Price"
  },
  totalPriceValueText: {
    color: '#186F65', // Green for the actual price value
  },
  orderButton: {
    marginTop: 10,
    backgroundColor: '#186F65',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row', // Align items in a row
    justifyContent: 'center', // Center items horizontally
  },
  orderButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    marginLeft: 6, // Add some space between icon and text
  },
  disabledOrderButton: {
    backgroundColor: '#aaa',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    position: 'relative', // Added to position the close button
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#186F65',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  pickerContainer: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#186F65',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row', // Align items in a row
    justifyContent: 'center', // Center items horizontally
    alignItems: 'center', // Center items vertically
  },
  submitButtonText: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginLeft: 5, // Add some space between icon and text
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  closeButton: {
    position: 'absolute',
    top: 3,
    right: 3,
    padding: 5,
    borderRadius: 50,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});
