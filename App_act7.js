// App_act7.js
// AppProvider wraps NavigationContainer so every tab screen can access global state.
import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppProvider, useApp } from './AppContext_act7';
import HomeTab from './HomeTab_act7';
import ProfileTab from './ProfileTab_act7';

const Tab = createBottomTabNavigator();

function Tabs() {
  const { theme } = useApp(); // tab bar also follows the shared theme

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.card },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.subtext,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{ tabBarIcon: () => <Text>🏠</Text> }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{ tabBarIcon: () => <Text>👤</Text> }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </AppProvider>
  );
}
