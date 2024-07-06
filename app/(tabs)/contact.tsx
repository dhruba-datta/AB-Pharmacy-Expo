import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Linking, Image } from 'react-native';
import * as Font from 'expo-font';

const Contact: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold': require('@/assets/fonts/Poppins-ExtraBold.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // or render a custom loading component
  }

  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Get in Touch</Text>
      <View style={styles.separator} />
      <Text style={styles.contactInfo}>Phone: +88 01912 555 765</Text>
      <Text style={styles.contactInfo}>Email: abpharmacy72@gmail.com</Text>
      <View style={styles.separator} />

      <TouchableWithoutFeedback onPress={() => handlePress('tel:+8801912555765')}>
        <View style={styles.button}>
          <Image source={require('@/assets/icons/phone.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Call us</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => handlePress('https://wa.me/8801912555765')}>
        <View style={styles.button}>
          <Image source={require('@/assets/icons/whatsapp.png')} style={styles.icon} />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => handlePress('mailto:abpharmacy72@gmail.com')}>
        <View style={styles.button}>
          <Image source={require('@/assets/icons/email.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Email</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontFamily: 'Poppins-ExtraBold',
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
