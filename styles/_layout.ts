import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  icon: {
    marginBottom: 0,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  headerIcon: {
    width: 32,
    height: 32,
    marginLeft: 2,
    tintColor: '#F9F3F3',
  },
  searchIcon: {
    width: 26,
    height: 26,
    marginRight: 8,
    tintColor: '#F9F3F3',
  },
  headerLogo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -10,
    backgroundColor: '#FF204E',
    borderRadius: 8,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 12,
  },
});
