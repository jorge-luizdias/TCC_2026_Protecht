// _layout.js
// Layout principal do app — contém o Drawer (menu lateral) que conecta todas as telas.
// Envolva este componente na raiz do app (App.js) junto com o DenunciasProvider.
//
// Estrutura de navegação:
//   App.js
//   └── DenunciasProvider
//       └── NavigationContainer
//           └── AppLayout (_layout.js) ← você está aqui
//               ├── Inicio
//               ├── Perfil
//               ├── RegistrarDenuncia  (Fazer denúncia)
//               ├── MinhasDenuncias
//               ├── ComoFunciona       (Como denunciar)
//               ├── Configuracoes
//               └── Suporte
//
// Dependências: @react-navigation/native, @react-navigation/stack

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Animated,
  Modal,
  Image,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.72;

// ── Ícones simples em texto ──────────────────────────────
const MENU_ITEMS = [
  { key: 'Inicio',             label: 'Início',           icon: '🏠' },
  { key: 'Perfil',             label: 'Perfil',           icon: '👤' },
  { key: 'RegistrarDenuncia',  label: 'Fazer denúncia',   icon: '🔔' },
  { key: 'MinhasDenuncias',    label: 'Minhas denúncias', icon: '📁' },
  { key: 'ComoFunciona',       label: 'Como denunciar',   icon: '💡' },
  { key: 'Configuracoes',      label: 'Configurações',    icon: '⚙️' },
  { key: 'Suporte',            label: 'Suporte',          icon: '🎧' },
];

// ── Logo Prothect ────────────────────────────────────────
const ProthectLogo = ({ size = 22 }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
    <View style={{ width: size, height: size * 1.2, position: 'relative' }}>
      <View style={[logo.shL, { width: size / 2, height: size * 1.2 }]} />
      <View style={[logo.shR, { width: size / 2, height: size * 1.2, left: size / 2 }]} />
      <View style={logo.front}>
        <Text style={[logo.p, { fontSize: size * 0.5 }]}>P</Text>
        <View style={[logo.pin, { width: size * 0.12, height: size * 0.22 }]} />
      </View>
    </View>
    <Text style={[logo.txt, { fontSize: size * 0.55 }]}>Prothect</Text>
  </View>
);

const logo = StyleSheet.create({
  shL: { position: 'absolute', left: 0, top: 0, backgroundColor: '#1e1b6e', borderTopLeftRadius: 4, borderBottomLeftRadius: 99 },
  shR: { position: 'absolute', top: 0, backgroundColor: '#7B3FE4', borderTopRightRadius: 4, borderBottomRightRadius: 99 },
  front: { position: 'absolute', inset: 0, top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  p: { color: '#fff', fontWeight: '900', lineHeight: undefined },
  pin: { backgroundColor: '#7B3FE4', marginTop: 1 },
  txt: { color: '#1e1b6e', fontWeight: '700', letterSpacing: 0.3 },
});

// ── Header bar (barra azul do topo) ─────────────────────
export const AppHeader = ({ title, onMenuPress, onBack, navigation }) => (
  <View style={styles.headerBar}>
    <StatusBar barStyle="light-content" backgroundColor="#1a5fb4" />
    {onBack ? (
      <TouchableOpacity onPress={onBack} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.headerIcon}>←</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={onMenuPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.headerIcon}>☰</Text>
      </TouchableOpacity>
    )}
    <Text style={styles.headerTitle}>{title}</Text>
    <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
      <Text style={styles.headerIcon}>🔔</Text>
    </TouchableOpacity>
  </View>
);

// ── Drawer content ───────────────────────────────────────
const Drawer = ({ currentScreen, onNavigate, onClose, onSair }) => (
  <View style={styles.drawer}>
    {/* Logo no topo do menu */}
    <View style={styles.drawerHeader}>
      <View style={styles.safelyRow}>
        <Text style={styles.safelyIcon}>💬</Text>
        <Text style={styles.safelyTxt}>Safely</Text>
      </View>
      <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.closeBtn}>✕</Text>
      </TouchableOpacity>
    </View>

    {/* Itens do menu */}
    <View style={styles.drawerItems}>
      {MENU_ITEMS.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[styles.drawerItem, currentScreen === item.key && styles.drawerItemActive]}
          onPress={() => onNavigate(item.key)}
          activeOpacity={0.7}
        >
          <Text style={styles.drawerItemIcon}>{item.icon}</Text>
          <Text style={[styles.drawerItemTxt, currentScreen === item.key && styles.drawerItemTxtActive]}>
            {item.label}
          </Text>
          {currentScreen === item.key && <View style={styles.drawerActiveBar} />}
        </TouchableOpacity>
      ))}
    </View>

    {/* Sair */}
    <TouchableOpacity style={styles.sairBtn} onPress={onSair} activeOpacity={0.7}>
      <Text style={styles.drawerItemIcon}>🚪</Text>
      <Text style={styles.sairTxt}>Sair</Text>
    </TouchableOpacity>

    {/* Logo Prothect no rodapé */}
    <View style={styles.drawerFooter}>
      <ProthectLogo size={20} />
    </View>
  </View>
);

// ── AppLayout — componente raiz que gerencia tudo ────────
export default function AppLayout({ children, currentScreen, onNavigate }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 260,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -DRAWER_WIDTH,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  const navigate = (screen) => {
    closeDrawer();
    setTimeout(() => onNavigate(screen), 100);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Conteúdo principal */}
      <View style={{ flex: 1 }}>
        {/* Passa openDrawer para os filhos via clone ou contexto */}
        {typeof children === 'function'
          ? children({ openDrawer, closeDrawer })
          : children}
      </View>

      {/* Overlay escuro quando drawer aberto */}
      {drawerOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeDrawer}
        />
      )}

      {/* Drawer animado */}
      {drawerOpen && (
        <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
          <SafeAreaView style={{ flex: 1 }}>
            <Drawer
              currentScreen={currentScreen}
              onNavigate={navigate}
              onClose={closeDrawer}
              onSair={() => navigate('Sair')}
            />
          </SafeAreaView>
        </Animated.View>
      )}
    </View>
  );
}

// Exporta função helper para abrir o drawer de qualquer tela
export const useDrawer = () => {
  // Implementado via prop drilling — veja exemplo de uso abaixo
};

// ── Estilos ──────────────────────────────────────────────
const styles = StyleSheet.create({
  // Header bar azul
  headerBar: {
    backgroundColor: '#1a5fb4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 50,
    paddingBottom: 14,
  },
  headerIcon: { fontSize: 20, color: '#fff' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#ffffff', flex: 1, textAlign: 'center' },

  // Overlay
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 10,
  },

  // Drawer container
  drawerContainer: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0,
    width: DRAWER_WIDTH,
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 12,
  },
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 16,
  },

  // Cabeçalho do drawer com "Safely"
  drawerHeader: {
    backgroundColor: '#1a5fb4',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 14 : 54,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  safelyRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  safelyIcon: { fontSize: 22 },
  safelyTxt: { fontSize: 20, fontWeight: '700', color: '#fff' },
  closeBtn: { fontSize: 18, color: '#fff', fontWeight: '700' },

  // Itens do menu
  drawerItems: { flex: 1, paddingTop: 8 },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
    position: 'relative',
  },
  drawerItemActive: { backgroundColor: '#eef4ff' },
  drawerItemIcon: { fontSize: 18, width: 26, textAlign: 'center' },
  drawerItemTxt: { fontSize: 15, color: '#333', fontWeight: '500' },
  drawerItemTxtActive: { color: '#1a5fb4', fontWeight: '700' },
  drawerActiveBar: {
    position: 'absolute',
    left: 0, top: 0, bottom: 0,
    width: 4,
    backgroundColor: '#1a5fb4',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },

  // Sair
  sairBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
    borderTopWidth: 1,
    borderTopColor: '#eef0f3',
  },
  sairTxt: { fontSize: 15, color: '#888', fontWeight: '500' },

  // Footer do drawer
  drawerFooter: {
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#eef0f3',
  },
});
