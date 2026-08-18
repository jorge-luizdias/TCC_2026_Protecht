import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { FooterLogos } from '../components/logos';

const { width } = Dimensions.get('window');

// ── Avatar padrão ────────────────────────────────────────
const Avatar = ({ size = 90 }) => (
  <View style={[styles.avatarWrap, { width: size, height: size, borderRadius: size / 2 }]}>
    <View style={styles.avatarHead} />
    <View style={styles.avatarBody} />
    <View style={styles.avatarTie} />
  </View>
);

// ── Componente de Logo (ProtechtLogo) ──────────────────────
const ProtechtLogo = () => (
  <View style={styles.logoRow}>
    <View style={styles.shieldWrap}>
      <View style={styles.shL} />
      <View style={styles.shR} />
      <View style={styles.shFront}>
        <Text style={styles.shP}>P</Text>
      </View>
    </View>
    <Text style={styles.logoTxt}>Protecht</Text>
  </View>
);

// ── Componente de Header Simulado (AppHeader) ──────────────
const AppHeader = ({ title, onBack }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <Text style={styles.backButtonText}>←</Text>
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={{ width: 24 }} /> 
  </View>
);

// ── Tela principal ───────────────────────────────────────
export default function Perfil({ navigation, usuario }) {
  const [responsaveis, setResponsaveis] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nomeResp, setNomeResp] = useState('');
  const [emailResp, setEmailResp] = useState('');
  const [senhaModal, setSenhaModal] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');

  const user = usuario || {
    nome: 'Nome do aluno',
    email: 'email.aluno@escola.com.br',
    turma: '2º Ano B',
    escola: 'ETEC Prof. Milton Gazzetti',
  };

  const adicionarResponsavel = () => {
    if (!nomeResp.trim() || !emailResp.trim()) {
      Alert.alert('Atenção', 'Preencha nome e e-mail do responsável.');
      return;
    }
    setResponsaveis((prev) => [...prev, { id: Date.now().toString(), nome: nomeResp, email: emailResp }]);
    setNomeResp('');
    setEmailResp('');
    setModalVisible(false);
  };

  const removerResponsavel = (id) => {
    Alert.alert('Remover responsável', 'Tem certeza?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => setResponsaveis((p) => p.filter((r) => r.id !== id)),
      },
    ]);
  };

  const alterarSenha = () => {
    if (!senhaAtual || !novaSenha || !confirmSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (novaSenha !== confirmSenha) {
      Alert.alert('Erro', 'A nova senha e a confirmação não coincidem.');
      return;
    }
    Alert.alert('Sucesso', 'Senha alterada com sucesso!');
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmSenha('');
    setSenhaModal(false);
  };

  const sair = () => {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1a5fb4" />

      <AppHeader title="Perfil" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar e dados do usuário */}
        <View style={styles.avatarSection}>
          <Avatar size={90} />
          <Text style={styles.nomeAluno}>{user.nome}</Text>
          <Text style={styles.emailAluno}>{user.email}</Text>
        </View>

        {/* Card — Informações */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📋</Text>
            <Text style={styles.infoLabel}>Turma: </Text>
            <Text style={styles.infoValue}>{user.turma}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>🎓</Text>
            <Text style={styles.infoLabel}>Escola: </Text>
            <Text style={[styles.infoValue, { color: '#1a5fb4', fontWeight: '700' }]}>{user.escola}</Text>
          </View>
        </View>

        {/* Card — Responsáveis */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Cadastrar Responsáveis</Text>

          {responsaveis.length === 0 ? (
            <Text style={styles.semResp}>Nenhum responsável cadastrado</Text>
          ) : (
            responsaveis.map((r) => (
              <View key={r.id} style={styles.respItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.respNome}>{r.nome}</Text>
                  <Text style={styles.respEmail}>{r.email}</Text>
                </View>
                <TouchableOpacity onPress={() => removerResponsavel(r.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text style={styles.respRemover}>✕</Text>
                </TouchableOpacity>
              </View>
            ))
          )}

          <TouchableOpacity
            style={styles.btnAddResp}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.btnAddRespTxt}>+ Adicionar Responsável</Text>
          </TouchableOpacity>
        </View>

        {/* Botões Alterar Senha e Sair */}
        <View style={styles.botoesRow}>
          <TouchableOpacity
            style={styles.btnSenha}
            onPress={() => setSenhaModal(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.btnSenhaTxt}>Alterar Senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSair} onPress={sair} activeOpacity={0.85}>
            <Text style={styles.btnSairTxt}>Sair</Text>
          </TouchableOpacity>
        </View>

        <FooterLogos />
        <ProtechtLogo />
      </ScrollView>

      {/* Modal — Adicionar Responsável */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Adicionar Responsável</Text>
            <Text style={styles.modalLabel}>Nome</Text>
            <TextInput
              style={styles.modalInput}
              value={nomeResp}
              onChangeText={setNomeResp}
              placeholder="Nome completo"
              placeholderTextColor="#b0c8db"
            />
            <Text style={styles.modalLabel}>E-mail</Text>
            <TextInput
              style={styles.modalInput}
              value={emailResp}
              onChangeText={setEmailResp}
              placeholder="email@exemplo.com"
              placeholderTextColor="#b0c8db"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.btnAddResp} onPress={adicionarResponsavel} activeOpacity={0.85}>
              <Text style={styles.btnAddRespTxt}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelTxt}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Modal — Alterar Senha */}
      <Modal
        transparent
        visible={senhaModal}
        animationType="slide"
        onRequestClose={() => setSenhaModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSenhaModal(false)}
        >
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Alterar Senha</Text>
            <Text style={styles.modalLabel}>Senha atual</Text>
            <TextInput style={styles.modalInput} value={senhaAtual} onChangeText={setSenhaAtual} secureTextEntry placeholder="••••••••" placeholderTextColor="#b0c8db" />
            <Text style={styles.modalLabel}>Nova senha</Text>
            <TextInput style={styles.modalInput} value={novaSenha} onChangeText={setNovaSenha} secureTextEntry placeholder="••••••••" placeholderTextColor="#b0c8db" />
            <Text style={styles.modalLabel}>Confirmar nova senha</Text>
            <TextInput style={styles.modalInput} value={confirmSenha} onChangeText={setConfirmSenha} secureTextEntry placeholder="••••••••" placeholderTextColor="#b0c8db" />
            <TouchableOpacity style={styles.btnAddResp} onPress={alterarSenha} activeOpacity={0.85}>
              <Text style={styles.btnAddRespTxt}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setSenhaModal(false)}>
              <Text style={styles.modalCancelTxt}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

// ── Estilos Únicos ─────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f0f6fc' },
  scroll: { paddingHorizontal: width * 0.05, paddingBottom: 28, paddingTop: 20, gap: 14 },

  // Header Simulado
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    paddingVertical: 14,
    backgroundColor: '#1a5fb4',
  },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  backButton: { padding: 4 },
  backButtonText: { color: '#fff', fontSize: 20, fontWeight: '700' },

  // Avatar
  avatarSection: { alignItems: 'center', marginBottom: 6 },
  avatarWrap: {
    backgroundColor: '#3a6bc4',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#1a5fb4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarHead: {
    position: 'absolute', top: 16,
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#f5c5a3',
  },
  avatarBody: {
    width: 70, height: 45,
    backgroundColor: '#1a3a7c',
    borderTopLeftRadius: 35, borderTopRightRadius: 35,
    marginBottom: -2,
  },
  avatarTie: {
    position: 'absolute', bottom: 10,
    width: 10, height: 20,
    backgroundColor: '#e63946',
    borderRadius: 3,
  },
  nomeAluno: { fontSize: 17, fontWeight: '700', color: '#1a1a1a', marginBottom: 3 },
  emailAluno: { fontSize: 12, color: '#5a7a8f' },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#1a5fb4',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#1a5fb4', marginBottom: 12 },

  // Info rows
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 },
  infoIcon: { fontSize: 15 },
  infoLabel: { fontSize: 13, color: '#555', fontWeight: '500' },
  infoValue: { fontSize: 13, color: '#333' },

  // Responsáveis
  semResp: { fontSize: 13, color: '#888', textAlign: 'center', paddingVertical: 8 },
  respItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eef4f9', gap: 8,
  },
  respNome: { fontSize: 13, fontWeight: '600', color: '#222' },
  respEmail: { fontSize: 11, color: '#5a7a8f' },
  respRemover: { fontSize: 16, color: '#e63946', fontWeight: '700' },
  btnAddResp: {
    backgroundColor: '#1a5fb4',
    borderRadius: 22,
    paddingVertical: 11,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#1a5fb4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  btnAddRespTxt: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Botões Alterar Senha / Sair
  botoesRow: { flexDirection: 'row', gap: 12 },
  btnSenha: {
    flex: 1, backgroundColor: '#1a5fb4', borderRadius: 22,
    paddingVertical: 13, alignItems: 'center',
    shadowColor: '#1a5fb4', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25, shadowRadius: 6, elevation: 4,
  },
  btnSenhaTxt: { color: '#fff', fontSize: 13, fontWeight: '700' },
  btnSair: {
    flex: 1, backgroundColor: '#e63946', borderRadius: 22,
    paddingVertical: 13, alignItems: 'center',
    shadowColor: '#e63946', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25, shadowRadius: 6, elevation: 4,
  },
  btnSairTxt: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.38)', justifyContent: 'flex-end' },
  modalBox: {
    backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20,
    paddingHorizontal: 20, paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
  },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#1a5fb4', textAlign: 'center', marginBottom: 16 },
  modalLabel: { fontSize: 13, color: '#333', fontWeight: '600', marginBottom: 6, marginTop: 8 },
  modalInput: {
    borderWidth: 1.5, borderColor: '#c5dff0', borderRadius: 10,
    paddingHorizontal: 13, paddingVertical: 10, fontSize: 13, color: '#222',
  },
  modalCancel: {
    marginTop: 10, paddingVertical: 12, alignItems: 'center',
    backgroundColor: '#f0f5fa', borderRadius: 10,
  },
  modalCancelTxt: { fontSize: 14, color: '#888', fontWeight: '600' },

  // Logo
  logoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10, gap: 6 },
  shieldWrap: { width: 22, height: 26, position: 'relative' },
  shL: { position: 'absolute', left: 0, top: 0, width: 11, height: 26, backgroundColor: '#1e1b6e', borderTopLeftRadius: 4, borderBottomLeftRadius: 13 },
  shR: { position: 'absolute', right: 0, top: 0, width: 11, height: 26, backgroundColor: '#7B3FE4', borderTopRightRadius: 4, borderBottomRightRadius: 13 },
  shFront: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  shP: { color: '#fff', fontSize: 11, fontWeight: '900' },
  logoTxt: { fontSize: 13, color: '#1e1b6e', fontWeight: '700' },
});