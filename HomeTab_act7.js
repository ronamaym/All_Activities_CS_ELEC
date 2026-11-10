// HomeTab_act7.js
// Reads shared state from context. No props are passed in.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from './AppContext_act7';

export default function HomeTab() {
  const { name, darkMode, saving, theme } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.label, { color: theme.subtext }]}>Welcome back,</Text>

        {/* Conditional rendering: loading vs. updated data */}
        {saving ? (
          <Text style={[styles.saving, { color: theme.primary }]}>Saving...</Text>
        ) : (
          <>
            <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
            <Text style={[styles.label, { color: theme.subtext }]}>
              Theme: {darkMode ? '🌙 Dark' : '☀️ Light'}
            </Text>
          </>
        )}
      </View>

      <Text style={[styles.hint, { color: theme.subtext }]}>
        Go to the Profile tab and change your name or theme. This screen updates automatically.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  card: { padding: 24, borderRadius: 16, alignItems: 'center', elevation: 3 },
  label: { fontSize: 16, marginTop: 4 },
  name: { fontSize: 28, fontWeight: 'bold', marginVertical: 8 },
  saving: { fontSize: 24, fontWeight: '600', marginVertical: 16 },
  hint: { marginTop: 24, textAlign: 'center', fontSize: 14 },
});
