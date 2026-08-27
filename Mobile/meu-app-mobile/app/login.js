import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { FooterLogos } from '../components/logos';
import { login } from '../services/api';

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha email e senha');
      return;
    }

    setCarregando(true);
    try {
      const sessao = await login(email.trim(), senha);
      Alert.alert('Sucesso', 'Login realizado!');
      onLogin?.(sessao);
    } catch (error) {
      Alert.alert('Não foi possível entrar', error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logo}>
          <Image
            source={require('../assets/images/safely.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Acessar como:</Text>

        <TextInput
          style={styles.input}
          placeholder="EMAIL:"
          placeholderTextColor="#1A3B77"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="SENHA:"
          placeholderTextColor="#1A3B77"
          secureTextEntry={true}
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={carregando}>
          <Text style={styles.buttonText}>{carregando ? 'ENTRANDO...' : 'ENTRAR'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RecuperacaoSenha')}>
          <Text style={styles.link}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.link}>Primeiro acesso </Text>
        </TouchableOpacity>

        <FooterLogos />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 140,
    height: 140,
    backgroundColor: 'transparent',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 24,
    color: '#173A7A',
    marginBottom: 20,
    fontWeight: '700',
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#C7EDF1',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18,
    color: '#173A7A',
  },
  button: {
    marginTop: 60,
    width: 170,
    height: 55,
    backgroundColor: '#08246D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  link: {
    color: '#3a8fd4',
    fontSize: 14,
    marginTop: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  safelyBox: {
    backgroundColor: '#2E9FB0',
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
