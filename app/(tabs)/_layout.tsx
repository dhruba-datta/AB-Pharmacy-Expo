import React from 'react';
import { Image, TouchableOpacity, Linking, View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { styles } from '@/styles/_layout';
import { useCart } from '@/app/context/CartContext';

interface TabBarIconProps {
  source: any;
  color: string;
  width: number;
  height: number;
}

function TabBarIcon({ source, color, width, height }: TabBarIconProps) {
  return <Image source={source} style={[{ width, height }, styles.icon, { tintColor: color }]} />;
}

function HeaderRight() {
  const navigation = useNavigation<any>();
  const { cartItemCount } = useCart();

  const navigateToWhatsApp = () => {
    const whatsappNumber = '8801912555765';
    Linking.openURL(`https://wa.me/${whatsappNumber}`);
  };

  return (
    <View style={styles.headerRightContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('search')}>
        <Image source={require('@/assets/icons/search.png')} style={styles.searchIcon} />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('order')}>
        <View>
          <Image source={require('@/assets/icons/cart.png')} style={styles.headerIcon} />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

function HeaderLogo() {
  return <Image source={require('@/assets/icons/logo.png')} style={styles.headerLogo} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#F9F3F3',
        tabBarInactiveTintColor: '#79B4B7',
        tabBarStyle: { backgroundColor: '#005C55', height: 65, justifyContent: 'center' },
        tabBarLabelStyle: { marginBottom: 10, marginTop: 0, textAlign: 'center', fontSize: 12 },
        tabBarIconStyle: { marginTop: 10, marginBottom: 0 },
        headerStyle: { backgroundColor: '#005C55' },
        headerTintColor: '#F9F3F3',
        headerRight: () => <HeaderRight />,
        headerTitle: () => <HeaderLogo />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon source={require('@/assets/icons/home.png')} color={color} width={28} height={28} />,
        }}
      />
      <Tabs.Screen
        name="product"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => <TabBarIcon source={require('@/assets/icons/app.png')} color={color} width={24} height={24} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color }) => <TabBarIcon source={require('@/assets/icons/schedule.png')} color={color} width={28} height={28} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color }) => <TabBarIcon source={require('@/assets/icons/people.png')} color={color} width={28} height={28} />,
        }}
      />
      <Tabs.Screen
        name="ProductDetails"
        options={{
          title: 'Product Details',
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Order',
          tabBarButton: () => null,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
