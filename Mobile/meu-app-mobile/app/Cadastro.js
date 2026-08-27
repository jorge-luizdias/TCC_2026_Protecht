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
} from 'react-native';
import { FooterLogos } from '../components/logos';
import { register } from '../services/api';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [rm, setRm] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleCriarConta = async () => {
    if (!nome.trim() || !rm.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    if (senha.length < 8) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 8 caracteres');
      return;
    }
    setCarregando(true);
    try {
      await register({ name: nome.trim(), email: email.trim(), rm: rm.trim(), password: senha });
      Alert.alert('Cadastro realizado', 'Verifique o código enviado para seu e-mail.', [
        { text: 'Continuar', onPress: () => navigation.navigate('VerificarEmail', { email: email.trim() }) },
      ]);
    } catch (error) {
      Alert.alert('Não foi possível criar a conta', error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logo}>
          <View style={[styles.safelyBox, { width: 150, height: 150 }]}>
            <Text style={{ fontSize: 70, fontWeight: 'bold', color: '#3DD6C4' }}>S</Text>
          </View>
        </View>

        <Text style={styles.title}>Criar Conta</Text>

        <TextInput
          style={styles.input}
          placeholder="NOME COMPLETO:"
          placeholderTextColor="#173A7A"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="RM:"
          placeholderTextColor="#173A7A"
          value={rm}
          onChangeText={setRm}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="EMAIL:"
          placeholderTextColor="#173A7A"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="CRIAR SENHA:"
          placeholderTextColor="#173A7A"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="CONFIRMAR SENHA:"
          placeholderTextColor="#173A7A"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleCriarConta} disabled={carregando}>
          <Text style={styles.buttonText}>{carregando ? 'CRIANDO...' : 'CRIAR'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Já possuo cadastro</Text>
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
    width: 150,
    height: 150,
    marginBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#173A7A',
    marginBottom: 20,
    textAlign: 'center',
  },

  label: {
    alignSelf: 'flex-start',
    fontSize: 14,
    color: '#173A7A',
    marginBottom: 10,
    fontWeight: '600',
  },

  select: {
    width: '100%',
    height: 55,
    backgroundColor: '#C7EDF1',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 0,
    marginBottom: 20,
    overflow: 'hidden',
  },

  picker: {
    width: '100%',
    height: 55,
    color: '#173A7A',
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
    marginTop: 30,
    width: '100%',
    height: 55,
    backgroundColor: '#08246D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  link: {
    color: '#3A8FD4',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },

  safelyBox: {
    backgroundColor: '#2E9FB0',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    position: 'absolute',
    bottom: 15,
    alignItems: 'center',
  },

  footerIcon: {
    fontSize: 20,
    color: '#173A7A',
  },

  footerText: {
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: 2,
  },
});