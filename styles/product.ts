import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
    paddingBottom: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    height: 50,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchBarInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    paddingTop: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e9e9e9',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    height: 50,
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
    marginHorizontal: 5,
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
    tintColor: '#186F65',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 5,
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
    paddingBottom: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  priceButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 16,
    color: '#186F65',
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#186F65',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
  },
  addToCartText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
  },
  outOfStockButton: {
    backgroundColor: '#dc3545',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  quantityText: {
    marginHorizontal: 14,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    width: 30,
    textAlign: 'center',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    tintColor: 'white',
  },
});
