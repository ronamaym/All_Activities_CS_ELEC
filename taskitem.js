import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

// Renders a single task row.
// Tapping the row toggles "completed"; tapping the delete button removes it.
export default function TaskItem({ task, onToggleComplete, onDelete }) {
  return (
    <View style={styles.taskRow}>
      <TouchableOpacity
        style={styles.taskTextWrapper}
        onPress={() => onToggleComplete(task.id)}
        activeOpacity={0.6}
      >
        <View
          style={[
            styles.checkCircle,
            task.completed && styles.checkCircleFilled,
          ]}
        >
          {task.completed && <Text style={styles.checkMark}>✓</Text>}
        </View>
        <Text
          style={[
            styles.taskText,
            task.completed && styles.taskTextCompleted,
          ]}
          numberOfLines={2}
        >
          {task.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}