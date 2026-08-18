import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DenunciasProvider } from '../components/DenunciasContext';

// Telas de Autenticação
import Loading from './loading';
import Login from './login';
import Cadastro from './Cadastro';
import RecuperacaoSenha from './recuperacaoSenha';

// Telas do App
import Inicio from './inicio';
import Perfil from './Perfil';
import RegistrarDenuncia from './RegistrarDenuncia';
import MinhasDenuncias from './MinhasDenuncias';
import StatusDenuncia from './StatusDenuncia';
import ComoFunciona from './denunciar';
import Configuracoes from './configuracoes';
import Suporte from './suporte';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// ── Drawer Menu (após login) ──────────────────────────────
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#1a5fb4' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        drawerStyle: {
          backgroundColor: '#f0f7fb',
          width: '72%',
        },
        drawerLabelStyle: { fontSize: 16, marginLeft: -20 },
        drawerActiveTintColor: '#08246d',
        drawerInactiveTintColor: '#3a8fd4',
      }}
    >
      <Drawer.Screen
        name="InicioMenu"
        component={Inicio}
        options={{ title: 'Início', drawerLabel: 'Início' }}
      />
      <Drawer.Screen
        name="PerfisMenu"
        component={Perfil}
        options={{ title: 'Perfil', drawerLabel: 'Perfil' }}
      />
      <Drawer.Screen
        name="RegistrarDenunciaMenu"
        component={RegistrarDenuncia}
        options={{ title: 'Fazer denúncia', drawerLabel: 'Fazer denúncia' }}
      />
      <Drawer.Screen
        name="MinhasDenunciasMenu"
        component={MinhasDenuncias}
        options={{ title: 'Minhas denúncias', drawerLabel: 'Minhas denúncias' }}
      />
      <Drawer.Screen
        name="ComoFuncionaMenu"
        component={ComoFunciona}
        options={{ title: 'Como denunciar', drawerLabel: 'Como denunciar' }}
      />
      <Drawer.Screen
        name="ConfiguracoesMenu"
        component={Configuracoes}
        options={{ title: 'Configurações', drawerLabel: 'Configurações' }}
      />
      <Drawer.Screen
        name="SuporteMenu"
        component={Suporte}
        options={{ title: 'Suporte', drawerLabel: 'Suporte' }}
      />
    </Drawer.Navigator>
  );
}

// ── Stack com autenticação e navegação ────────────────────
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer key={isLoggedIn ? 'logged-in' : 'logged-out'}>
      <DenunciasProvider>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={!isLoggedIn ? 'Loading' : 'Home'}
        >
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="Loading" component={Loading} />
              <Stack.Screen name="Login" options={{ animationEnabled: false }}>
                {(props) => <Login {...props} onLogin={() => setIsLoggedIn(true)} />}
              </Stack.Screen>
              <Stack.Screen
                name="Cadastro"
                component={Cadastro}
                options={{ animationEnabled: true }}
              />
              <Stack.Screen
                name="RecuperacaoSenha"
                component={RecuperacaoSenha}
                options={{ animationEnabled: true }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={DrawerNavigator}
                options={{ animationEnabled: false }}
              />
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen
                  name="StatusDenuncia"
                  component={StatusDenuncia}
                  options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: '#e4f2fb' },
                    title: 'Status da Denúncia',
                  }}
                />
              </Stack.Group>
            </>
          )}
        </Stack.Navigator>
      </DenunciasProvider>
    </NavigationContainer>
  );
}
