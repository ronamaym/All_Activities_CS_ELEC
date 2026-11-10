// ProfileTab_act7.js
// Reads AND updates shared state through context.
import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from './AppContext_act7';

export default function ProfileTab() {
  const { name, darkMode, saving, error, setError, updateProfile, theme } = useApp();

  // Local draft values; only committed to global state when "Save" is pressed.
  const [draftName, setDraftName] = useState(name);
  const [draftDark, setDraftDark] = useState(darkMode);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>Edit Profile</Text>

        <Text style={[styles.label, { color: theme.subtext }]}>Name</Text>
        <TextInput
          style={[styles.input, { color: theme.text, borderColor: error ? theme.error : theme.subtext }]}
          value={draftName}
          onChangeText={(text) => {
            setDraftName(text);
            if (error) setError(null);
          }}
          placeholder="Enter your name"
          placeholderTextColor={theme.subtext}
          editable={!saving}
        />

        {/* Error state */}
        {error && <Text style={[styles.error, { color: theme.error }]}>{error}</Text>}

        <View style={styles.row}>
          <Text style={[styles.label, { color: theme.text }]}>Dark mode</Text>
          <Switch value={draftDark} onValueChange={setDraftDark} disabled={saving} />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary, opacity: saving ? 0.6 : 1 }]}
          onPress={() => updateProfile(draftName, draftDark)}
          disabled={saving}
        >
          {/* Loading state */}
          <Text style={styles.buttonText}>{saving ? 'Saving...' : 'Save Changes'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  card: { padding: 24, borderRadius: 16, elevation: 3 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  label: { fontSize: 16, marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 8 },
  error: { fontSize: 14, marginBottom: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 16 },
  button: { padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
