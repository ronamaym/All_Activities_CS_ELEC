// App_act8.js
// Persistent Notes app: CRUD operations backed by AsyncStorage.
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

import NoteItem from './NoteItem_act8';
import { loadNotes, saveNotes } from './StorageService_act8';
import styles from './styles_act8';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null); // null = adding, otherwise editing this id
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // READ: load saved notes from storage once, when the app first mounts.
  useEffect(() => {
    const init = async () => {
      try {
        const saved = await loadNotes();
        setNotes(saved);
      } catch (e) {
        setError('Failed to load notes.');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Keeps state and storage in sync: update state first, then write the same array to storage.
  const updateNotes = async (newNotes) => {
    setNotes(newNotes);
    try {
      await saveNotes(newNotes);
      setError(null);
    } catch (e) {
      setError('Failed to save notes.');
    }
  };

  // CREATE or UPDATE depending on whether we are editing.
  const handleSubmit = () => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;

    if (editingId === null) {
      // CREATE
      const newNote = { id: Date.now().toString(), text: trimmed };
      updateNotes([...notes, newNote]);
    } else {
      // UPDATE
      const updated = notes.map((n) => (n.id === editingId ? { ...n, text: trimmed } : n));
      updateNotes(updated);
    }

    setText('');
    setEditingId(null);
  };

  const handleEdit = (note) => {
    setText(note.text);
    setEditingId(note.id);
  };

  const handleCancelEdit = () => {
    setText('');
    setEditingId(null);
  };

  // DELETE
  const handleDelete = (id) => {
    updateNotes(notes.filter((n) => n.id !== id));
    if (editingId === id) handleCancelEdit();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={editingId === null ? 'Write a note...' : 'Edit your note...'}
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{editingId === null ? 'Add' : 'Save'}</Text>
        </TouchableOpacity>
        {editingId !== null && (
          <TouchableOpacity style={[styles.addButton, styles.cancelButton]} onPress={handleCancelEdit}>
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <Text style={styles.statusText}>Loading notes...</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteItem note={item} onEdit={handleEdit} onDelete={handleDelete} />
          )}
          ListEmptyComponent={<Text style={styles.statusText}>No notes yet. Add one above!</Text>}
        />
      )}
    </View>
  );
}
