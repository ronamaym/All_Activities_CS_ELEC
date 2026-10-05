import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

export default function App() {
  // State management
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState([]);

  // Add new task
  const addTask = () => {
    if (inputText.trim() === '') return;
    const newTask = {
      id: Date.now().toString(),
      text: inputText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputText(''); // Clear input
  };

  // Toggle complete status
  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // Render each list item
  const renderTask = ({ item }) => (
    <View style={styles.taskRow}>
      <TouchableOpacity
        style={styles.taskTextContainer}
        onPress={() => toggleComplete(item.id)}
      >
        <Text
          style={[
            styles.taskText,
            item.completed && styles.completedText,
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📋 My To-Do List</Text>

      {/* Input Area */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={inputText}
          onChangeText={setInputText}
        />

        <TouchableOpacity style={styles.addBtn} onPress={addTask}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        style={styles.list}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#2d2d2d',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  addBtn: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  list: {
    marginTop: 10,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteBtn: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  deleteText: {
    fontSize: 18,
    color: '#e53935',
    fontWeight: 'bold',
  },
});