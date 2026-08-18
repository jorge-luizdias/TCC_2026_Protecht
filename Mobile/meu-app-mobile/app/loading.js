import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';

export default function SplashScreen({ navigation }) {
  const slideAnim = useRef(new Animated.Value(-150)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    // Navega para Login após 2.5 segundos
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation, slideAnim, opacityAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          alignItems: 'center',
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        }}
      >
        <Image
          source={require('../assets/images/safely.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#7db6eb',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: '#aed8f7',
    textAlign: 'center',
  },
});

