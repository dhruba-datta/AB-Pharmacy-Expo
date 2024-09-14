import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform, GestureResponderEvent } from 'react-native';

// Explicit type assertion for href
type HrefType = string; // Change this if HrefType is an object

export function ExternalLink(
  props: Omit<React.ComponentProps<typeof Link>, 'href'> & { href: HrefType }
) {
  const handlePress = (e: GestureResponderEvent | MouseEvent) => {
    if (Platform.OS !== 'web') {
      // Prevent default behavior for non-web platforms
      e.preventDefault();
      WebBrowser.openBrowserAsync(props.href as string);
    }
  };

  return (
    <Link
      target="_blank"
      {...props}
      href={props.href as any} // Use type assertion here if necessary
      onPress={handlePress as any} // Handle both event types
    />
  );
}
