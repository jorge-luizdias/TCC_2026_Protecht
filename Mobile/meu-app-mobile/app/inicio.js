// Inicio.js
// Tela inicial do app Safely — design fiel ao mockup fornecido
// Props:
//   navigation — objeto de navegação (react-navigation)

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { FooterLogos } from '../components/logos';

// ── Ícones inline (SVG) ──────────────────────────────────
const LockIcon = () => (
  <Svg width="60" height="60" viewBox="0 0 24 24" fill="none">
    <Rect x="5" y="11" width="14" height="9" rx="2" fill="#19b3a6" />
    <Path
      d="M8 11V8a4 4 0 0 1 8 0v3"
      stroke="#19b3a6"
      strokeWidth={2.2}
      strokeLinecap="round"
      fill="none"
    />
    <Circle cx="12" cy="15" r="1.4" fill="#fff" />
  </Svg>
);

const InfoIcon = () => (
  <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#16365e" />
    <Rect x="11" y="10" width="2" height="7" rx="1" fill="#fff" />
    <Circle cx="12" cy="7.2" r="1.3" fill="#fff" />
  </Svg>
);

// ── Tela principal ───────────────────────────────────────
export default function Inicio({ navigation }) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Boas-vindas — fundo branco, texto + espaço para logo Safely */}
      <View style={styles.welcome}>
        <View style={styles.welcomeTextWrap}>
          <Text style={styles.welcomeText}>
            <Text style={styles.welcomeSafely}>Safely </Text>
            um espaço{'\n'}seguro para você
          </Text>
        </View>

        {/* Espaço reservado para a logo safely.png (escudo + balão) */}
        <View style={styles.logoWrap}>
          <Image
            source={require('../assets/images/safelysemtxt.png')}
            style={styles.logoImg}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Faixa com degradê azul escuro → azul claro */}
      <LinearGradient
        colors={['#0d3f8f', '#1a5fb4', '#3a8fd4', '#a7d6fa']}
        locations={[0, 0.25, 0.6, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradientArea}
      >
        <View style={styles.body}>

          {/* Card — Denunciar */}
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <LockIcon />
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
                <InfoIcon />
              </View>
              <View style={styles.cardHowTextWrap}>
                <Text style={styles.howTitle}>Como funciona o aplicativo?</Text>
                <Text style={styles.howSub}>Aprenda a registrar sua{'\n'}primeira denúncia</Text>
              </View>
            </View>
            <Text style={styles.howArrow}>›</Text>
          </TouchableOpacity>

        </View>
      </LinearGradient>

      <FooterLogos />
    </ScrollView>
  );
}

// ── Estilos ──────────────────────────────────────────────
const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#ffffff' },
  scrollContent: { paddingBottom: 24, flexGrow: 1 },

  // Boas-vindas (fundo branco)
  welcome: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  welcomeTextWrap: { flex: 1 },
  welcomeText: { fontSize: 19, color: '#1a2b3c', fontWeight: '500', lineHeight: 26 },
  welcomeSafely: { color: '#1a5fb4', fontWeight: '700' },

  // Espaço reservado para a logo (escudo + balão)
  logoWrap: {
    width: 72,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },

  // Faixa com degradê
  gradientArea: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 22,
    paddingBottom: 60,
    flex: 1,
  },

  // Corpo dos cards
  body: {
    paddingHorizontal: 18,
    gap: 14,
  },

  // Card denunciar
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    shadowColor: '#0a2e57',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
    gap: 14,
  },
  cardLeft: { alignItems: 'center', justifyContent: 'center' },
  cardCenter: { flex: 1, alignItems: 'center', gap: 10 },
  cardText: { fontSize: 13, color: '#444', lineHeight: 19, textAlign: 'center' },
  cardBold: { fontWeight: '700', color: '#222' },
  btnDenunciar: {
    backgroundColor: '#1a5fb4',
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 30,
    shadowColor: '#0a2e57',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
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
    shadowColor: '#0a2e57',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  infoCircle: {
    width: 30, height: 30, borderRadius: 15,
    alignItems: 'center', justifyContent: 'center',
  },
  cardHowTextWrap: { flex: 1 },
  howTitle: { fontSize: 13, fontWeight: '700', color: '#222', marginBottom: 2 },
  howSub: { fontSize: 11, color: '#5a7a8f', lineHeight: 16 },
  howArrow: { fontSize: 22, color: '#1a5fb4', fontWeight: '700' },
});