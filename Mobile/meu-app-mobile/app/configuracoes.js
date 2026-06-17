import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { FooterLogos } from '../components/logos';

export default function ConfiguracoesScreen() {
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [temaClaro, setTemaClaro] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>
          Personalize sua experiência no Safely
        </Text>

        <View style={styles.card}>
          {/* Conta */}
          <View style={styles.sectionHeader}>
            <Icon name="person-circle-outline" size={22} color="#1A6E73" />
            <Text style={styles.sectionTitle}>Conta</Text>
          </View>

          <TouchableOpacity style={styles.item}>
            <Icon name="lock-closed-outline" size={20} color="#1A6E73" />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Alterar senha</Text>
              <Text style={styles.itemSubtitle}>
                Altere a senha da sua conta
              </Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#B0C4C6" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Icon name="mail-outline" size={20} color="#1A6E73" />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>E-mail</Text>
              <Text style={styles.itemSubtitle}>email.aluno@escola.com.br</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#B0C4C6" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Notificações */}
          <View style={styles.sectionHeader}>
            <Icon name="notifications-outline" size={22} color="#1A6E73" />
            <Text style={styles.sectionTitle}>Notificações</Text>
          </View>

          <View style={styles.item}>
            <Icon name="notifications-circle-outline" size={20} color="#1A6E73" />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Atualizações de denúncias</Text>
              <Text style={styles.itemSubtitle}>
                Receber notificações sobre o status das denúncias
              </Text>
            </View>
            <Switch
              value={notificacoesAtivas}
              onValueChange={setNotificacoesAtivas}
              trackColor={{ false: '#D1DCDD', true: '#3DD6C4' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          {/* Privacidade e Segurança */}
          <View style={styles.sectionHeader}>
            <Icon name="shield-checkmark-outline" size={22} color="#1A6E73" />
            <Text style={styles.sectionTitle}>Privacidade e Segurança</Text>
          </View>

          <View style={styles.item}>
            <Icon name="lock-closed-outline" size={20} color="#1A6E73" />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitleBold}>Denúncias anônimas</Text>
              <Text style={styles.itemSubtitle}>
                Suas denúncias são enviadas de forma anônima
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Aparência */}
          <View style={styles.sectionHeader}>
            <Icon name="color-palette-outline" size={22} color="#1A6E73" />
            <Text style={styles.sectionTitle}>Aparência</Text>
          </View>

          <View style={styles.item}>
            <Icon name="sunny-outline" size={20} color="#1A6E73" />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitleBold}>Tema do aplicativo</Text>
              <Text style={styles.itemSubtitle}>
                Escolha um tema entre claro e escuro
              </Text>
            </View>
          </View>

          <View style={styles.themeToggleContainer}>
            <TouchableOpacity
              style={[
                styles.themeOption,
                temaClaro && styles.themeOptionActive,
              ]}
              onPress={() => setTemaClaro(true)}
            >
              <Text
                style={[
                  styles.themeOptionText,
                  temaClaro && styles.themeOptionTextActive,
                ]}
              >
                Claro
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.themeOption,
                !temaClaro && styles.themeOptionActive,
              ]}
              onPress={() => setTemaClaro(false)}
            >
              <Text
                style={[
                  styles.themeOptionText,
                  !temaClaro && styles.themeOptionTextActive,
                ]}
              >
                Escuro
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sair da conta */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Sair da conta</Text>
        </TouchableOpacity>

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
  subtitle: {
    fontSize: 13,
    color: '#5A6B6E',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A6E73',
    marginLeft: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B3A3D',
  },
  itemTitleBold: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A6E73',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#8FA6A9',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#EEF4F5',
    marginVertical: 8,
  },
  themeToggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#EAF7F8',
    borderRadius: 12,
    padding: 4,
    marginTop: 8,
  },
  themeOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  themeOptionActive: {
    backgroundColor: '#1A6E73',
  },
  themeOptionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A6E73',
  },
  themeOptionTextActive: {
    color: '#FFFFFF',
  },
  logoutButton: {
    backgroundColor: '#E0524C',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  brandText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8FA6A9',
    fontWeight: '600',
    marginTop: 16,
  },
});