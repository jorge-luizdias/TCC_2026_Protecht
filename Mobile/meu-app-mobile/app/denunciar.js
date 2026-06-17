import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { FooterLogos } from '../components/logos';

const steps = [
  {
    icon: 'shield-checkmark-outline',
    iconColor: '#3DD6C4',
    title: 'Escolha o tipo de denúncia',
    description:
      'No momento da denúncia selecione o tipo que melhor descreve a situação: bullying, agressão, etc.',
  },
  {
    icon: 'create-outline',
    iconColor: '#3DD6C4',
    title: 'Descreva a situação',
    description:
      'Explique o que aconteceu com detalhes, quanto mais informações, melhor.',
  },
  {
    icon: 'paper-plane-outline',
    iconColor: '#3DD6C4',
    title: 'Envie a denúncia',
    description:
      'Depois de revisar envie a denúncia, sua identidade será protegida e sua denúncia será enviada anonimamente.',
  },
  {
    icon: 'checkmark-circle-outline',
    iconColor: '#3DD6C4',
    title: 'Acompanhe o status',
    description:
      'Você poderá acompanhar o status da sua denúncia até a situação ser resolvida.',
  },
];

export default function ComoDenunciarScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Card Passo a Passo */}
        <View style={styles.introCard}>
          <View style={styles.introTextContainer}>
            <Text style={styles.introTitle}>Passo a Passo</Text>
            <Text style={styles.introDescription}>
              Siga os passos abaixo para fazer uma denúncia de forma segura e
              anônima.
            </Text>
          </View>
          <Image
            style={styles.introImage}
            resizeMode="contain"
          />
        </View>

        {/* Steps */}
        {steps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <Icon name={step.icon} size={22} color={step.iconColor} />
              <Text style={styles.stepTitle}>{step.title}</Text>
            </View>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        ))}

        {/* Logo / Brand */}
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
  introImage: {
    width: 90,
    height: 90,
  },
  stepCard: {
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
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A6E73',
    marginLeft: 8,
  },
  stepDescription: {
    fontSize: 13,
    color: '#5A6B6E',
    lineHeight: 18,
    marginLeft: 30,
  },
  brandContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  brandLogo: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  brandText: {
    fontSize: 12,
    color: '#8FA6A9',
    fontWeight: '600',
  },
});