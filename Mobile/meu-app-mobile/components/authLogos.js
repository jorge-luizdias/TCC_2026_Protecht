import React from 'react';
import { View, StyleSheet } from 'react-native';

export const SafelyLoginLogo = ({ size = 140 }) => (
  <View
    style={[
      styles.safelyContainer,
      {
        width: size,
        height: size,
        borderRadius: size * 0.15,
      },
    ]}
  >
    <View
      style={{
        width: size * 0.6,
        height: size * 0.6,
        backgroundColor: '#3DD6C4',
        borderRadius: size * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          fontSize: size * 0.3,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  safelyContainer: {
    backgroundColor: '#2E9FB0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
