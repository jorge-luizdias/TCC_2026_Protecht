import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import ProtechtLogoImage from '../assets/images/protecht-logo.png';

export const FooterLogos = () => (
  <View style={styles.footer}>
    <Image
      source={ProtechtLogoImage}
      style={styles.protectImage}
      resizeMode="contain"
    />
  </View>
);

const styles = StyleSheet.create({
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#d3eaf8',
    alignItems: 'center',
  },
  protectImage: {
    width: 140,
    height: 40,
    backgroundColor: 'transparent',
  },
});
