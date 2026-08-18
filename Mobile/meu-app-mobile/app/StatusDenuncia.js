// StatusDenuncia.js
// Navegação esperada: recebe route.params.denuncia vindo de MinhasDenuncias
// O status é SOMENTE LEITURA — o usuário não pode alterar, apenas visualizar

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
import { FooterLogos } from '../components/logos';

const { width } = Dimensions.get('window');



// ── Badge de status (somente leitura) ───────────────────
const STATUS_MAP = {
  Pendente:      { bg: '#fff3cd', color: '#856404', icon: '⚠️' },
  'Em análise':  { bg: '#cce5ff', color: '#004085', icon: '🔍' },
  Resolvida:     { bg: '#d4edda', color: '#155724', icon: '✅' },
  Arquivada:     { bg: '#e2e3e5', color: '#383d41', icon: '📁' },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_MAP[status] || STATUS_MAP['Pendente'];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={styles.badgeIcon}>{cfg.icon}</Text>
      <Text style={[styles.badgeTxt, { color: cfg.color }]}>{status}</Text>
    </View>
  );
};

// ── Linha de informação ─────────────────────────────────
const InfoLinha = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label} </Text>
    <Text style={styles.infoValue}>{value || '—'}</Text>
  </View>
);

// ── Tela principal ───────────────────────────────────────
export default function StatusDenuncia({ navigation, route }) {
  // denuncia vem de MinhasDenuncias via navigation.navigate('StatusDenuncia', { denuncia })
  const { denuncia } = route.params;

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
          <Text style={styles.headerTitle}>Status da denúncia</Text>
        </TouchableOpacity>

        {/* Card principal */}
        <View style={styles.card}>

          {/* Número */}
          <Text style={styles.denunciaNum}>
            Denúncia #{String(denuncia.numero).padStart(2, '0')}
          </Text>

          {/* Status — definido pelo sistema, não pelo usuário */}
          <StatusBadge status={denuncia.status} />
          <Text style={styles.statusDesc}>{denuncia.statusDesc}</Text>

          <View style={styles.divider} />

          {/* Informações da denúncia — preenchidas pelo usuário no registro */}
          <Text style={styles.sectionTitle}>Informações da denúncia</Text>
          <InfoLinha label="Tipo:"          value={denuncia.tipo} />
          <InfoLinha label="Denunciado:"    value={denuncia.denunciado} />
          <InfoLinha label="Discriminação:" value={denuncia.discriminacao} />

          <View style={styles.divider} />

          {/* Detalhes adicionais */}
          <Text style={styles.sectionTitle}>Detalhes</Text>
          {!!denuncia.local && <InfoLinha label="Local:"         value={denuncia.local} />}
          <InfoLinha label="Data de envio:" value={denuncia.dataEnvio} />
          <InfoLinha label="Descrição:"     value={denuncia.descricao} />

          {/* Saber mais */}
          <TouchableOpacity style={styles.saberMais} activeOpacity={0.7}>
            <Text style={styles.saberMaisIcon}>🔍</Text>
            <Text style={styles.saberMaisTxt}>Saber mais</Text>
          </TouchableOpacity>
        </View>

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

  // Número da denúncia
  denunciaNum: { fontSize: 17, fontWeight: '700', color: '#1a1a1a', marginBottom: 10 },

  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 8,
  },
  badgeIcon: { fontSize: 13, marginRight: 5 },
  badgeTxt: { fontSize: 13, fontWeight: '700' },
  statusDesc: { fontSize: 12, color: '#5a7a8f', marginBottom: 6 },

  // Divisor
  divider: { height: 1, backgroundColor: '#e0eef8', marginVertical: 14 },

  // Seções
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#1a5fb4', marginBottom: 10 },
  infoRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 6 },
  infoLabel: { fontSize: 13, fontWeight: '700', color: '#333' },
  infoValue: { fontSize: 13, color: '#444', flex: 1, flexWrap: 'wrap' },

  // Saber mais
  saberMais: {
    flexDirection: 'row', alignItems: 'center',
    alignSelf: 'flex-end', marginTop: 14,
  },
  saberMaisIcon: { fontSize: 14, marginRight: 4 },
  saberMaisTxt: {
    fontSize: 14, color: '#3a8fd4', fontWeight: '600', textDecorationLine: 'underline',
  },


});
