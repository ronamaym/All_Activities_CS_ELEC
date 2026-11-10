// NoteItem_act8.js
// Presentational component for a single note row.
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles_act8';

export default function NoteItem({ note, onEdit, onDelete }) {
  return (
    <View style={styles.noteCard}>
      <Text style={styles.noteText}>{note.text}</Text>

      <TouchableOpacity style={styles.actionButton} onPress={() => onEdit(note)}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(note.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
