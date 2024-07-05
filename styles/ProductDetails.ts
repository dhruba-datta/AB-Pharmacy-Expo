import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#777777',
    marginBottom: 5,
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#186F65',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 150,
    height: 50,
  },
  addToCartText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  outOfStockButton: {
    backgroundColor: 'red',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: 170,
    justifyContent: 'space-around',
  },
  quantityButtonContainer: {
    backgroundColor: '#186F65',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  quantityButton: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});
