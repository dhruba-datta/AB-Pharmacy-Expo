import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarInput: {
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shopByCategoriesHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#186F65',
  },
  shopByCompaniesHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#186F65',
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#186F65',
  },
  showAll: {
    fontSize: 14,
    color: '#186F65',
    textDecorationLine: 'underline',
  },
  flatListContentContainer: {
    paddingHorizontal: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150,
  },
  productInfo: {
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productDetails: {
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#186F65',
    marginBottom: 5,
  },
  addToCartButton: {
    backgroundColor: '#186F65',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
  },
  outOfStockButton: {
    backgroundColor: '#d3d3d3',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButtonContainer: {
    backgroundColor: '#186F65',
    borderRadius: 5,
    padding: 5,
    marginHorizontal: 5,
  },
  quantityButton: {
    color: '#fff',
    fontSize: 14,
  },
  quantityText: {
    fontSize: 14,
    color: '#186F65',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCell: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: '45%',
    alignItems: 'center',
  },
  categoryCellText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#186F65',
  },
  companyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  companyCell: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    width: '45%',
    alignItems: 'center',
  },
  companyCellText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#186F65',
  },
});
