import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Linking, Image } from 'react-native';

const Contact: React.FC = () => {
  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact</Text>
      <View style={styles.separator} />
      <Text style={styles.contactInfo}>Phone: +8801912555765</Text>
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
    fontWeight: 'bold',
    color: '#186F65',
  },
  contactInfo: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 5,
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
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});
