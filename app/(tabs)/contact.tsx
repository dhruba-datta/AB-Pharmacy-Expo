import React, { useEffect, useState } from 'react';
import { Text, View, TouchableWithoutFeedback, Linking, Image } from 'react-native';
import * as Font from 'expo-font';
import { styles } from '@/styles/contact';

const Contact: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
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