import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#186F65',
  },
  contactInfo: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 5,
    fontFamily: 'Poppins-Regular',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#ccc',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#186F65',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});