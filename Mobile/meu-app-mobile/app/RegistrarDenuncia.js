// RegistrarDenuncia.js
// Navegação esperada: navigation.navigate('MinhasDenuncias') após envio bem-sucedido
// Contexto: usa DenunciasContext para salvar a denúncia

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import { useDenuncias } from '../components/DenunciasContext';
import { FooterLogos } from '../components/logos';

const { width } = Dimensions.get('window');



// ── Dropdown com Modal bottom-sheet ─────────────────────
const Dropdown = ({ label, value, options, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(true)} activeOpacity={0.8}>
        <Text style={[styles.dropdownTxt, !value && styles.placeholder]}>
          {value || 'Selecionar...'}
        </Text>
        <Text style={styles.arrow}>▾</Text>
      </TouchableOpacity>

      <Modal transparent visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{label}</Text>
            {options.map((op) => (
              <TouchableOpacity
                key={op}
                style={[styles.sheetItem, value === op && styles.sheetItemActive]}
                onPress={() => { onChange(op); setOpen(false); }}
              >
                <Text style={[styles.sheetItemTxt, value === op && styles.sheetItemActiveTxt]}>
                  {op}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.sheetCancel} onPress={() => setOpen(false)}>
              <Text style={styles.sheetCancelTxt}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

// ── Tela principal ───────────────────────────────────────
export default function RegistrarDenuncia({ navigation }) {
  const { addDenuncia } = useDenuncias();

  const [denunciado, setDenunciado]     = useState('');
  const [tipo, setTipo]                 = useState('');
  const [discriminacao, setDiscriminacao] = useState('');
  const [local, setLocal]               = useState('');
  const [descricao, setDescricao]       = useState('');

  const enviar = () => {
    if (!denunciado || !tipo || !discriminacao || !descricao.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios antes de enviar.');
      return;
    }
    addDenuncia({ denunciado, tipo, discriminacao, local, descricao });
    Alert.alert(
      '✅ Denúncia enviada!',
      'Seu relato foi enviado de forma anônima e segura.',
      [{ text: 'Ver minhas denúncias', onPress: () => navigation.navigate('MinhasDenuncias') }]
    );
    // Limpa os campos para uma eventual nova denúncia
    setDenunciado(''); setTipo(''); setDiscriminacao(''); setLocal(''); setDescricao('');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#e4f2fb" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.headerArrow}>←</Text>
          <Text style={styles.headerTitle}>Registrar denúncia</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Seu relato será enviado de forma anônima e segura</Text>

        {/* Formulário */}
        <View style={styles.card}>
          <Dropdown
            label="Deseja denunciar quem?"
            value={denunciado}
            options={['Aluno(a)', 'Professor(a)', 'Funcionário(a)', 'Outro']}
            onChange={setDenunciado}
          />
          <Dropdown
            label="Tipo da denúncia"
            value={tipo}
            options={['Bullying', 'Assédio', 'Violência física', 'Discriminação', 'Outro']}
            onChange={setTipo}
          />
          <Dropdown
            label="Tipo de discriminação"
            value={discriminacao}
            options={['Xingamento', 'Exclusão social', 'Agressão física', 'Cyberbullying', 'Humilhação', 'Outro']}
            onChange={setDiscriminacao}
          />

          <Text style={[styles.fieldLabel, { marginTop: 14 }]}>Local do ocorrido (opcional)</Text>
          <TextInput
            style={styles.input}
            value={local}
            onChangeText={setLocal}
            placeholder="Ex: Corredor do 2º andar"
            placeholderTextColor="#b0c8db"
          />

          <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Descreva o ocorrido:</Text>
          <TextInput
            style={styles.textarea}
            multiline
            numberOfLines={4}
            value={descricao}
            onChangeText={setDescricao}
            textAlignVertical="top"
            placeholderTextColor="#b0c8db"
          />
        </View>

        <TouchableOpacity style={styles.btnEnviar} onPress={enviar} activeOpacity={0.85}>
          <Text style={styles.btnEnviarTxt}>Enviar Denúncia</Text>
        </TouchableOpacity>

        <FooterLogos />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Estilos ──────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#e4f2fb' },
  scroll: {
    paddingHorizontal: width * 0.05,
    paddingBottom: 28,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 16) + 8 : 12,
  },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, marginTop: 4 },
  headerArrow: { fontSize: 22, color: '#3a8fd4', marginRight: 6, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#3a8fd4' },
  subtitle: { fontSize: 12, color: '#5a7a8f', marginBottom: 14, marginTop: 2 },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: width * 0.05,
    marginBottom: 20,
    shadowColor: '#1a5fb4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  // Labels e campos
  fieldLabel: { fontSize: 13, color: '#333', fontWeight: '600', marginBottom: 6, marginTop: 6 },
  dropdown: {
    borderWidth: 1.5,
    borderColor: '#c5dff0',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 11,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dropdownTxt: { fontSize: 13, color: '#222', flex: 1 },
  placeholder: { color: '#b0c8db' },
  arrow: { fontSize: 15, color: '#888', marginLeft: 6 },
  input: {
    borderWidth: 1.5,
    borderColor: '#c5dff0',
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 10,
    fontSize: 13,
    color: '#222',
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  textarea: {
    borderWidth: 1.5,
    borderColor: '#c5dff0',
    borderRadius: 10,
    minHeight: 90,
    padding: 12,
    fontSize: 13,
    color: '#222',
    backgroundColor: '#fff',
    marginBottom: 4,
  },

  // Botão enviar
  btnEnviar: {
    backgroundColor: '#1a5fb4',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#1a5fb4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 5,
  },
  btnEnviarTxt: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },

  // Modal bottom-sheet
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.38)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
  },
  sheetTitle: { fontSize: 15, fontWeight: '700', color: '#1a5fb4', marginBottom: 14, textAlign: 'center' },
  sheetItem: { paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#eef4f9' },
  sheetItemActive: { backgroundColor: '#e8f4fd', borderRadius: 8 },
  sheetItemTxt: { fontSize: 14, color: '#333', paddingHorizontal: 6 },
  sheetItemActiveTxt: { color: '#1a5fb4', fontWeight: '700' },
  sheetCancel: {
    marginTop: 12, paddingVertical: 12, alignItems: 'center',
    backgroundColor: '#f0f5fa', borderRadius: 10,
  },
  sheetCancelTxt: { fontSize: 14, color: '#888', fontWeight: '600' },


});
