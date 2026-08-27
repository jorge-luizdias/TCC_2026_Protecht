import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { verifyEmail } from '../services/api';

export default function VerificarEmail({ navigation, route }) {
  const email = route.params?.email || '';
  const [codigo, setCodigo] = useState('');
  const [carregando, setCarregando] = useState(false);

  const verificar = async () => {
    if (!/^\d{4}$/.test(codigo)) {
      Alert.alert('Atenção', 'Informe o código de 4 dígitos');
      return;
    }
    setCarregando(true);
    try {
      await verifyEmail(email, codigo);
      Alert.alert('E-mail verificado', 'Agora você já pode entrar.', [{ text: 'Entrar', onPress: () => navigation.navigate('Login') }]);
    } catch (error) {
      Alert.alert('Código inválido', error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verificar e-mail</Text>
        <Text style={styles.description}>Digite o código enviado para {email}.</Text>
        <TextInput style={styles.input} value={codigo} onChangeText={setCodigo} keyboardType="numeric" maxLength={4} placeholder="0000" />
        <TouchableOpacity style={styles.button} onPress={verificar} disabled={carregando}>
          <Text style={styles.buttonText}>{carregando ? 'VERIFICANDO...' : 'VERIFICAR'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  content: { flex: 1, justifyContent: 'center', padding: 30 },
  title: { fontSize: 28, fontWeight: '700', color: '#173A7A', marginBottom: 12 },
  description: { color: '#5a7a8f', marginBottom: 24 },
  input: { height: 55, backgroundColor: '#C7EDF1', borderRadius: 12, paddingHorizontal: 15, fontSize: 22, color: '#173A7A', textAlign: 'center', letterSpacing: 4 },
  button: { height: 55, marginTop: 24, backgroundColor: '#08246D', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
});