// Inicio.js
// Tela inicial do app — exibe boas-vindas, botão de denúncia e "Como funciona"
// Props:
//   navigation — objeto de navegação (react-navigation)
//   onOpenDrawer — função para abrir o menu lateral (vinda do _layout.js)

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { FooterLogos } from '../components/logos';

const { width } = Dimensions.get('window');

// ── Tela principal ───────────────────────────────────────
export default function Inicio({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1a5fb4" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero section — fundo azul com texto e ícone */}
        <View style={styles.hero}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroText}>
              <Text style={styles.heroSafely}>Safely </Text>
              um espaço{'\n'}seguro para você
            </Text>
          </View>
          {/* Ícone de balão de chat + escudo */}
          <View style={styles.heroIconWrap}>
            <View style={styles.heroShield}>
              <Text style={styles.heroShieldIcon}>🛡️</Text>
              <View style={styles.heroBubble}>
                <Text style={styles.heroBubbleIcon}>💬</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Área branca com cards */}
        <View style={styles.body}>

          {/* Card — Denunciar */}
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardLock}>🔒</Text>
            </View>
            <View style={styles.cardCenter}>
              <Text style={styles.cardText}>
                Registre sua denúncia de{'\n'}forma <Text style={styles.cardBold}>anônima</Text>
              </Text>
              <TouchableOpacity
                style={styles.btnDenunciar}
                onPress={() => navigation.navigate('RegistrarDenuncia')}
                activeOpacity={0.85}
              >
                <Text style={styles.btnDenunciarTxt}>Denunciar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card — Como funciona */}
          <TouchableOpacity
            style={styles.cardHow}
            onPress={() => navigation.navigate('ComoFuncionaMenu')}
            activeOpacity={0.85}
          >
            <View style={styles.cardHowLeft}>
              <View style={styles.infoCircle}>
                <Text style={styles.infoIcon}>ℹ️</Text>
              </View>
              <View>
                <Text style={styles.howTitle}>Como funciona o aplicativo?</Text>
                <Text style={styles.howSub}>Aprenda a registrar sua{'\n'}primeira denúncia</Text>
              </View>
            </View>
            <Text style={styles.howArrow}>›</Text>
          </TouchableOpacity>

        </View>

        <FooterLogos />
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Estilos ──────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1a5fb4' },
  scroll: { flex: 1, backgroundColor: '#1a5fb4' },
  scrollContent: { paddingBottom: 24, flexGrow: 1 },

  // Hero
  hero: {
    backgroundColor: '#1a5fb4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  heroTextWrap: { flex: 1 },
  heroText: { fontSize: 20, color: '#fff', fontWeight: '500', lineHeight: 28 },
  heroSafely: { color: '#7ec8f7', fontWeight: '700' },
  heroIconWrap: { width: 80, alignItems: 'center' },
  heroShield: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  heroShieldIcon: { fontSize: 52 },
  heroBubble: {
    position: 'absolute', top: -6, right: -10,
    backgroundColor: '#3a8fd4', borderRadius: 12, padding: 4,
  },
  heroBubbleIcon: { fontSize: 14 },

  // Corpo branco
  body: {
    backgroundColor: '#f0f6fc',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    flex: 1,
    gap: 14,
  },

  // Card denunciar
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    shadowColor: '#1a5fb4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 4,
    gap: 14,
  },
  cardLeft: { alignItems: 'center', justifyContent: 'center' },
  cardLock: { fontSize: 36 },
  cardCenter: { flex: 1, gap: 10 },
  cardText: { fontSize: 13, color: '#444', lineHeight: 19 },
  cardBold: { fontWeight: '700', color: '#222' },
  btnDenunciar: {
    backgroundColor: '#1a5fb4',
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 28,
    alignSelf: 'flex-start',
    shadowColor: '#1a5fb4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.28,
    shadowRadius: 6,
    elevation: 4,
  },
  btnDenunciarTxt: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Card como funciona
  cardHow: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    shadowColor: '#1a5fb4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  infoCircle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#e8f0fe', alignItems: 'center', justifyContent: 'center',
  },
  infoIcon: { fontSize: 18 },
  howTitle: { fontSize: 13, fontWeight: '700', color: '#222', marginBottom: 2 },
  howSub: { fontSize: 11, color: '#5a7a8f', lineHeight: 16 },
  howArrow: { fontSize: 22, color: '#1a5fb4', fontWeight: '700' },
});
