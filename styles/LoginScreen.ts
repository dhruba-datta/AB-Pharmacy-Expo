import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 150, // Adjust height as needed
    resizeMode: 'contain', // Ensure the image scales correctly
    marginBottom: -10, // Add spacing between the logo and the rest of the content
    marginTop: -50, // Add spacing between the logo and the rest of the content
    alignSelf: 'center', // Center the logo horizontally
    marginLeft: -30,
  },
  
  header: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: '#186F65',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#186F65',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    fontSize: 16,
  },
  loading: {
    marginBottom: 20,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});
