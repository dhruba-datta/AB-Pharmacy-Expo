import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchBarInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold', // Ensure this matches the loaded font name
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins-Regular', // Ensure this matches the loaded font name
  },
  buttonContainer: {
    width: 120, // Set a fixed width for the button container
  },
  addToCartButton: {
    flexDirection: 'row', // Add this line
    alignItems: 'center', // Add this line
    backgroundColor: '#186F65',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold', // Ensure this matches the loaded font name
    textAlign: 'center',
  },
  outOfStockButton: {
    backgroundColor: '#dc3545', // Red color for out of stock button
  },
  noProductsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
    fontFamily: 'Poppins-Regular', // Ensure this matches the loaded font name
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 118,
  },
 quantityButtonContainer: {
    backgroundColor: '#186F65',
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
  },
  quantityButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  buttonIcon: {
    width: 20, // Set the width of the icon
    height: 20, // Set the height of the icon
    marginRight: 2, // Add some margin to the right of the icon
    tintColor: '#fff',

  },
});
