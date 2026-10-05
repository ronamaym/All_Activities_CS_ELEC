import React, { useState } from 'react';

import {

  View,

  Text,

  TextInput,

  TouchableOpacity,

  FlatList,

  StyleSheet,

} from 'react-native';

export default function App() {

  const [task, setTask] = useState('');

  const [tasks, setTasks] = useState([]);

  // Add a new task

  const addTask = () => {

    if (task.trim() === '') {

      return;

    }

    const newTask = {

      id: Date.now().toString(),

      name: task,

      completed: false,

    };

    setTasks([...tasks, newTask]);

    setTask('');

  };

  // Mark task as completed

  const completeTask = (id) => {

    setTasks(

      tasks.map((item) =>

        item.id === id

          ? { ...item, completed: !item.completed }

          : item

      )

    );

  };

  // Delete task

  const deleteTask = (id) => {

    setTasks(tasks.filter((item) => item.id !== id));

  };

  // Display each task

  const renderItem = ({ item }) => (

    <View style={styles.taskContainer}>

      <TouchableOpacity

        style={styles.taskTextContainer}

        onPress={() => completeTask(item.id)}

      >

        <Text

          style={[

            styles.taskText,

            item.completed && styles.completedTask,

          ]}

        >

          {item.name}

        </Text>

      </TouchableOpacity>

      <TouchableOpacity

        style={styles.deleteButton}

        onPress={() => deleteTask(item.id)}

      >

        <Text style={styles.deleteText}>Delete</Text>

      </TouchableOpacity>

    </View>

  );

  return (

    <View style={styles.container}>

      <Text style={styles.title}>My To-Do List</Text>

      <TextInput

        style={styles.input}

        placeholder="Enter a task..."

        value={task}

        onChangeText={setTask}

      />

      <TouchableOpacity

        style={styles.addButton}

        onPress={addTask}

      >

        <Text style={styles.addText}>+ Add Task</Text>

      </TouchableOpacity>

      <FlatList

        data={tasks}

        renderItem={renderItem}

        keyExtractor={(item) => item.id}

        ListEmptyComponent={

          <Text style={styles.emptyText}>

            No tasks yet. Add your first task!

          </Text>

        }

      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    padding: 25,

    paddingTop: 60,

    backgroundColor: '#f5f5f5',

  },

  title: {

    fontSize: 30,

    fontWeight: 'bold',

    textAlign: 'center',

    marginBottom: 25,

  },

  input: {

    backgroundColor: 'white',

    borderWidth: 1,

    borderColor: '#ccc',

    borderRadius: 10,

    padding: 15,

    fontSize: 16,

    marginBottom: 10,

  },

  addButton: {

    backgroundColor: '#2196F3',

    padding: 15,

    borderRadius: 10,

    alignItems: 'center',

    marginBottom: 20,

  },

  addText: {

    color: 'white',

    fontSize: 17,

    fontWeight: 'bold',

  },

  taskContainer: {

    backgroundColor: 'white',

    padding: 15,

    borderRadius: 10,

    marginBottom: 10,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',

  },

  taskTextContainer: {

    flex: 1,

  },

  taskText: {

    fontSize: 17,

  },

  completedTask: {

    textDecorationLine: 'line-through',

    color: 'gray',

  },

  deleteButton: {

    backgroundColor: '#f44336',

    paddingVertical: 8,

    paddingHorizontal: 12,

    borderRadius: 7,

    marginLeft: 10,

  },

  deleteText: {

    color: 'white',

    fontWeight: 'bold',

  },

  emptyText: {

    textAlign: 'center',

    color: 'gray',

    marginTop: 30,

    fontSize: 16,

  },

});
