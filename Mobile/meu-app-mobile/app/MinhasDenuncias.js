// MinhasDenuncias.js
// Navegação esperada:
//   - navigation.navigate('RegistrarDenuncia') — botão "Fazer outra Denúncia"
//   - navigation.navigate('StatusDenuncia', { denuncia }) — ao tocar no card
// Contexto: lê lista de denúncias do DenunciasContext

import React from 'react';
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
} from 'react-native';
import { useDenuncias } from '../components/DenunciasContext';
import { FooterLogos } from '../components/logos';

const { width } = Dimensions.get('window');



// ── Tela principal ───────────────────────────────────────
export default function MinhasDenuncias({ navigation }) {
  const { denuncias } = useDenuncias();

  const irParaStatus = (denuncia) => {
    // Passa o objeto completo da denúncia para a tela de status
    navigation.navigate('StatusDenuncia', { denuncia });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#e4f2fb" />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.headerArrow}>←</Text>
          <Text style={styles.headerTitle}>Minhas denúncias</Text>
        </TouchableOpacity>

        {/* Card do histórico */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Histórico de Denúncias</Text>

          {denuncias.length === 0 ? (
            // ── Estado vazio: usuário nunca denunciou ──
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>Nenhuma denúncia registrada</Text>
              <Text style={styles.emptyMsg}>
                Quando você registrar uma denúncia, ela aparecerá aqui para acompanhamento.
              </Text>
            </View>
          ) : (
            // ── Lista de denúncias feitas pelo usuário ──
            denuncias.map((d) => (
              <View key={d.id} style={styles.denunciaCard}>
                <View style={styles.denunciaRow}>
                  <Text style={styles.denunciaNum}>
                    Denúncia #{String(d.numero).padStart(2, '0')}
                  </Text>
                  <Text style={styles.denunciaData}>{d.dataEnvio}</Text>
                </View>
                <TouchableOpacity
                  style={styles.btnStatus}
                  onPress={() => irParaStatus(d)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.btnStatusTxt}>Status da denúncia</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* Botão fazer outra — sempre visível */}
        <TouchableOpacity
          style={styles.btnFazer}
          onPress={() => navigation.navigate('RegistrarDenunciaMenu')}
          activeOpacity={0.85}
        >
          <Text style={styles.btnFazerTxt}>Fazer outra Denúncia</Text>
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
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginTop: 4 },
  headerArrow: { fontSize: 22, color: '#3a8fd4', marginRight: 6, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#3a8fd4' },

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
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1a5fb4', textAlign: 'center', marginBottom: 18 },

  // Card individual de cada denúncia
  denunciaCard: {
    borderWidth: 1.5,
    borderColor: '#d3eaf8',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: '#f5faff',
  },
  denunciaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  denunciaNum: { fontSize: 14, fontWeight: '700', color: '#1a1a1a' },
  denunciaData: { fontSize: 12, color: '#5a7a8f' },
  btnStatus: {
    backgroundColor: '#1a5fb4',
    borderRadius: 20,
    paddingVertical: 9,
    alignItems: 'center',
  },
  btnStatusTxt: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Estado vazio
  empty: { alignItems: 'center', paddingVertical: 30, paddingHorizontal: 16 },
  emptyIcon: { fontSize: 36, marginBottom: 12 },
  emptyTitle: { fontSize: 15, fontWeight: '700', color: '#333', marginBottom: 8 },
  emptyMsg: { fontSize: 13, color: '#5a7a8f', textAlign: 'center', lineHeight: 19 },

  // Botão fazer outra denúncia
  btnFazer: {
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
  btnFazerTxt: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },


});
