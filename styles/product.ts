import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5, // Reduced margin
    height: 50, // Set a fixed height for the search box
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#888', // Adjust the color as needed
  },
  searchBarInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e9e9e9', // Background color for filter container
    padding: 10,
    borderRadius: 10,
    marginVertical: 5, // Reduced margin
    height: 50, // Set the same height as the search box
    marginBottom: 15,
  },
  pickerContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  picker: {
    flex: 1,
    height: 50,
    width: '100%',
    marginHorizontal: 5, // Margin between pickers
  },
  resetButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  resetIcon: {
    width: 25,
    height: 25,
    tintColor: '#006769', // Same color as the button background color
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
    title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  priceButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    color: '#006769',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120, // Adjust the width as needed
  },
  addToCartButton: {
    backgroundColor: '#006769',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35, // Set a fixed height for the buttons
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
  },
  outOfStockButton: {
    backgroundColor: 'red',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButtonContainer: {
    backgroundColor: '#006769',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35, // Ensures consistent width for quantity buttons
    height: 35, // Make the height same as add to cart button
  },
  quantityButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  quantityText: {
    marginHorizontal: 14,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
