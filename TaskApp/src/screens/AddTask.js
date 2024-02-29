import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { app, auth } from './utils/firebase/firebaseConfig';
import AddTaskInput from '../Components/AddTaskInput.component';

const AddTask = (props) => {
  const [isTaskUrgent, setIsTaskUrgent] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const _addTask = async () => {
    try {
      if (!taskTitle) {
        alert('Please enter the task title');
        return;
      }

      if (!taskDescription) {
        alert('Please enter the task description');
        return;
      }

      setLoading(true);
      const userId= auth.currentUser.uid
      const db = getFirestore(app);
      const response = await addDoc(collection(db, 'Tasks'), {
        title: taskTitle,
        description: taskDescription,
        isUrgent: isTaskUrgent,
        createdOn: new Date(),
        status: 'Pending',
        userId: userId
      });

      setLoading(false);

      if (response.id) {
        props.navigation.navigate('Home');
      }
    } catch (e) {
      console.log(e);
      alert(JSON.stringify(e));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="keyboard-backspace" size={24} color="black" onPress={() => props.navigation.navigate('Home')} />
        <Text style={{ color: 'black', fontSize: 15, paddingLeft: 10 }}>Add New Task</Text>
      </View>

      <AddTaskInput
        value={taskTitle}
        onChangeText={setTaskTitle}
        placeholder={'Task Title'}
      />

      <AddTaskInput
        value={taskDescription}
        onChangeText={setTaskDescription}
        placeholder={'Task Description'}
      />

      <TouchableOpacity
        onPress={() => setIsTaskUrgent((previousValue) => !previousValue)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
        }}>
        <TouchableOpacity style={{
          width: 20,
          height: 20,
          borderWidth: 0.5,
          borderColor: 'grey',
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {isTaskUrgent && <View
            style={{
              width: 15,
              height: 15,
              borderRadius: 5,
              backgroundColor: 'orange'
            }}
          />}
        </TouchableOpacity>
        <Text style={{ color: 'black', paddingLeft: 10 }}>Is the task urgent?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={_addTask}
        style={{
          width: '90%',
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          alignSelf: 'center',
          backgroundColor: 'orange',
          position: 'absolute',
          bottom: 15
        }}>
        {loading ?
          <ActivityIndicator
            size='small'
            color='white'
          />
          :
          <Text style={{ color: 'white', fontWeight: 'bold' }}>CREATE TASK</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 65,
    backgroundColor: 'white',
    borderBottomWidth: 0.3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderBottomColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
});

export default AddTask;
