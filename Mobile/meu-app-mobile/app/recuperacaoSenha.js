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

export default function RecuperacaoSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [step, setStep] = useState(1);

  const handleEnviarEmail = () => {
    if (!email.trim()) {
      Alert.alert('Atenção', 'Por favor, digite seu email');
      return;
    }
    Alert.alert('Sucesso', 'Link de recuperação enviado para seu email');
    setStep(2);
  };

  const handleRecuperarSenha = () => {
    if (!novaSenha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }
    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }
    Alert.alert('Sucesso', 'Senha recuperada com sucesso!', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logo}>
          <View style={[styles.safelyBox, { width: 140, height: 140 }]}>
            <Text style={{ fontSize: 60, fontWeight: 'bold', color: '#3DD6C4' }}>S</Text>
          </View>
        </View>

        <Text style={styles.title}>Recuperar Senha</Text>

        {step === 1 ? (
          <>
            <Text style={styles.subtitle}>Digite seu email para recuperar a senha</Text>

            <TextInput
              style={styles.input}
              placeholder="EMAIL:"
              placeholderTextColor="#173A7A"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={step === 1}
            />

            <TouchableOpacity style={styles.button} onPress={handleEnviarEmail}>
              <Text style={styles.buttonText}>ENVIAR</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>Digite sua nova senha</Text>

            <TextInput
              style={styles.input}
              placeholder="NOVA SENHA:"
              placeholderTextColor="#173A7A"
              secureTextEntry
              value={novaSenha}
              onChangeText={setNovaSenha}
            />

            <TextInput
              style={styles.input}
              placeholder="CONFIRMAR SENHA:"
              placeholderTextColor="#173A7A"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />

            <TouchableOpacity style={styles.button} onPress={handleRecuperarSenha}>
              <Text style={styles.buttonText}>RECUPERAR</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Voltar ao Login</Text>
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
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#173A7A',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
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
    marginTop: 20,
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
    color: '#3a8fd4',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});
