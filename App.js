import React, { useState, useEffect } from 'react';

import { Alert, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Task from './components/Task';

const colors = {
  gray: '#E8EAED',
  blue: '#55BCF6'
};


export default function App() {
  
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      let items;
      try {
        items = await AsyncStorage.getItem('@MyTasks');
      }
      catch (e) {
        Alert.alert('Error !😔', 'There is an error when getting your tasks');
        return;
      }
      if (items !== null) {
        setTasks(JSON.parse(items));
      }
      setTasks([]);
    }

    getTasks();
  }, []);
  
  const handleAddTask = async () => {
    const item = {
      id: Date.now(),
      task: task
    }

    setTasks(prevTasks => [item, ...prevTasks]);

    //console.log(tasks);

    try {
      const items = JSON.stringify(tasks);
      await AsyncStorage.setItem('@MyTasks', items);
    }
    catch (e) {
      Alert.alert('Error !😔', 'There is an error when saving your tasks');
    }

    setTask('');
    Keyboard.dismiss();
  }

  const handleDeleteTask = async (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
 
    try {
      const items = JSON.stringify(newTasks);
      await AsyncStorage.setItem('MyTasks', items);
    }
    catch (e) {
      Alert.alert('Error !😔', 'There is an error when saving your tasks');
    }
  }

  return (
    <View style={styles.container}>
      {/* Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.item}>
          {/* This is where tasks appear */}
          {
            tasks?.map(({ id, task }) => (
              <Task
                key={id}  
                id={id}
                task={task}
                handleDeleteTask={handleDeleteTask}
              />
            ))
          }
        </View>
      </View>
      {/* Write a Task */}
      <KeyboardAvoidingView behavior='height' style={styles.writeTextWrapper}>
        <TextInput 
          value={task}
          onChangeText={setTask}
          style={styles.input} 
          placeholder='Write a task'
        />

        <TouchableOpacity
          onPress={handleAddTask}
        >
          <View style={styles.addWrapper}>
            <Text style={styles.addTask}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  item: {
    marginTop: 30
  },
  writeTextWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    width: 250,
    paddingHorizontal: 15,
    borderRadius: 60,
    borderColor: '#C0C0C0',
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
});
