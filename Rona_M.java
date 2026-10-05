import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

import TaskItem from './TaskItem';
import styles from './styles';

export default function App() {

  const [tasks, setTasks] = useState([]);
 
  const [inputText, setInputText] = useState('');

  // add new task
  const handleAddTask = () => {
    const trimmed = inputText.trim();
    if (trimmed.length === 0) return;

    const newTask = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setInputText('');
  };

  // pagcomplete task
  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // pagremove
  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const remainingCount = tasks.filter((t) => !t.completed).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>My To-Do List</Text>
          <Text style={styles.subtitle}>
            {tasks.length === 0
              ? 'No tasks yet — add one below'
              : `${remainingCount} of ${tasks.length} remaining`}
          </Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Add a new task..."
            placeholderTextColor="#9AA0A6"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleAddTask}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={[
              styles.addButton,
              inputText.trim().length === 0 && styles.addButtonDisabled,
            ]}
            onPress={handleAddTask}
            disabled={inputText.trim().length === 0}
            activeOpacity={0.7}
          >
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={
            tasks.length === 0 ? styles.emptyListContainer : styles.listContainer
          }
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDeleteTask}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>🗒️ Your list is empty</Text>
              <Text style={styles.emptyStateSubtext}>
                Type something above and tap "Add"
              </Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}