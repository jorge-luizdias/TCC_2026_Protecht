import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { FooterLogos } from '../components/logos';

export default function SuporteScreen() {
  const handleEmailPress = () => {
    Linking.openURL('mailto:ProtechtTcc@gmail.com');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Card principal */}
        <View style={styles.introCard}>
          <View style={styles.introTextContainer}>
            <Text style={styles.introTitle}>Precisa de ajuda?</Text>
            <Text style={styles.introDescription}>
              Encontre respostas ou fale diretamente com nosso suporte se
              precisar de ajuda.
            </Text>
          </View>
          <View style={styles.avatarCircle}>
            <Icon name="headset-outline" size={36} color="#FFFFFF" />
          </View>
        </View>

        {/* Entre em contato */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Icon name="chatbubble-ellipses-outline" size={20} color="#1A6E73" />
            <Text style={styles.sectionTitle}>Entre em contato conosco</Text>
          </View>
          <TouchableOpacity onPress={handleEmailPress}>
            <Text style={styles.emailLabel}>
              E-mail:{' '}
              <Text style={styles.emailLink}>ProtechtTcc@gmail.com</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Perguntas frequentes */}
        <TouchableOpacity style={styles.card}>
          <View style={styles.faqRow}>
            <View style={styles.sectionHeader}>
              <Icon name="help-circle-outline" size={20} color="#1A6E73" />
              <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#B0C4C6" />
          </View>
          <Text style={styles.faqDescription}>
            Encontre respostas rápidas para dúvidas comuns
          </Text>
        </TouchableOpacity>

        {/* Card segurança */}
        <View style={styles.securityCard}>
          <Icon
            name="chatbubble-ellipses"
            size={22}
            color="#1A6E73"
            style={styles.securityIcon}
          />
          <View style={styles.securityTextContainer}>
            <Text style={styles.securityTitle}>
              Sua segurança vem em primeiro lugar
            </Text>
            <Text style={styles.securitySubtitle}>
              Todas as denúncias são anônimas e protegidas
            </Text>
          </View>
        </View>

        {/* Brand */}
        <FooterLogos />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAF7F8',
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  introCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  introTextContainer: {
    flex: 1,
    paddingRight: 8,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A6E73',
    marginBottom: 6,
  },
  introDescription: {
    fontSize: 13,
    color: '#5A6B6E',
    lineHeight: 18,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#1A6E73',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A6E73',
    marginLeft: 8,
  },
  emailLabel: {
    fontSize: 13,
    color: '#5A6B6E',
    marginLeft: 28,
    marginTop: 6,
  },
  emailLink: {
    color: '#3DA9FC',
    fontWeight: '600',
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  faqDescription: {
    fontSize: 13,
    color: '#5A6B6E',
    marginLeft: 28,
    marginTop: 6,
  },
  securityCard: {
    backgroundColor: '#D8F2EF',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  securityIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A6E73',
    marginBottom: 2,
  },
  securitySubtitle: {
    fontSize: 12,
    color: '#5A6B6E',
  },
  brandText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8FA6A9',
    fontWeight: '600',
    marginTop: 20,
  },
});