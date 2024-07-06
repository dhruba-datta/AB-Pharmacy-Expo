import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    paddingHorizontal: 16,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorySection: {
    marginBottom: 25,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  showAll: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#186F65',
  },
  flatListContentContainer: {
    paddingLeft: 1,
  },
  productCard: {
    width: 150,
    marginRight: 16,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    paddingBottom: 0,
    
  },
  productTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  buttonContainer: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: '#186F65',
    marginBottom: 8,
    textAlign: 'center',
  },
  addToCartButton: {
    flexDirection: 'row', // Add this line
    alignItems: 'center', // Add this line
    backgroundColor: '#186F65',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Medium', // Ensure this matches the loaded font name
    textAlign: 'center',
  },
  outOfStockButton: {
    backgroundColor: '#dc3545', // Red color for out of stock button
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryCell: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryCellText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#333',
  },
  // companyGrid: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-between',
  //   marginBottom: 24,
  // },
  // companyCell: {
  //   width: '48%',
  //   backgroundColor: '#f8f8f8',
  //   borderRadius: 8,
  //   paddingVertical: 16,
  //   alignItems: 'center',
  //   marginBottom: 16,
  // },
  // companyCellText: {
  //   fontSize: 16,
  //   fontFamily: 'Poppins-Medium',
  //   color: '#333',
  // },

  companyGrid: {
     flexDirection: 'column',  // Change to column
     marginBottom: 24,
   },

   companyCell: {
     backgroundColor: '#fff',
     borderRadius: 8,
     paddingVertical: 16,
     alignItems: 'center',
     marginBottom: 16,
   },

   companyCellText: {
     fontSize: 16,
     fontFamily: 'Poppins-Medium',
     color: '#333',
   },


  shopByCategoriesHeader: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#186F65',
    marginBottom: 16,
    marginTop: 20,
  },
  shopByCompaniesHeader: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#186F65',
    marginBottom: 16,
  },
  buttonIcon: {
    width: 18, // Set the width of the icon
    height: 18, // Set the height of the icon
    marginRight: 2, // Add some margin to the right of the icon
    tintColor: '#fff',
  },
});
