import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, ActivityIndicator, TouchableOpacity, Image, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import Papa from 'papaparse';
import { useNavigation } from '@react-navigation/native';
import { styles } from '@/styles/LoginScreen'; // Import the styles

export default function LoginScreen({ setIsLoggedIn }: { setIsLoggedIn: (value: boolean) => void }) {
  const [code, setCode] = useState('');
  const [validCodes, setValidCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
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

  const fetchCodes = () => {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQYGe49CMfHtSVXwpeytgh5FvCT-06ec539uGMx25oWgEzZo1RvBZaGgZpPTDDW2w/pub?gid=27312731&output=csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: false, 
          skipEmptyLines: true,
          complete: (results) => {
            const codes = results.data.map((row: any) => row[0]);
            setValidCodes(codes);
            setLoading(false);
          },
        });
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const handleLogin = () => {
    if (code.trim() === '') {
      Alert.alert('Please Enter Your Code', 'If you do not have one, please contact AB Pharmacy: 01912555765.');
      return;
    }
  
    if (validCodes.includes(code)) {
      setIsLoggedIn(true);
    } else {
      Alert.alert('Invalid Code', 'If you do not have one, please contact AB Pharmacy: 01912555765.');
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Set the notification bar style */}
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      
      {loading ? (
        <ActivityIndicator size="large" color="#186F65" style={styles.loading} />
      ) : (
        <>
          <Image
            source={require('@/assets/icons/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.text}>Enter Your Code Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
            placeholder="Code Number"
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
