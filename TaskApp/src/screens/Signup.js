import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app,auth } from './utils/firebase/firebaseConfig';
import InputComponent from "../Components/Input.component";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = (props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(''); // Added state for email
  const [password, setPassword] = useState(''); // Added state for password

  const _registerUser = async () => {
    try {
      if (!email) {
        alert('Please enter the valid email');
        return;
      }
      if (!password) {
        alert('Please enter the valid password');
        return;
      }
      setLoading(true);

      const response = await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      
      if (response.user) {
        props.navigation.replace('Home');
      }
    } catch (e) {
      setLoading(false);
      alert(JSON.stringify(e));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.heading}>TaskApp SignUp</Text>
        <Text style={styles.description}>Create, Manage, Share tasks easily</Text>
        <View style={{ marginTop: 20 }}>
          <InputComponent
            value={email}
            onChangeText={setEmail} // Removed the incorrect comment syntax
            placeholder={'Email address'}
          />
          <InputComponent
            value={password}
            onChangeText={setPassword}
            placeholder={'Password'}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={_registerUser}
          style={styles.SignUpButton}
        >
          {loading ?
            <ActivityIndicator
              size="small"
              color="white"
            />
            :
            <Text style={styles.buttonText}>Sign Up</Text>
          }
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, alignSelf: 'center' }}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={{ fontWeight: 'bold', paddingLeft: 10 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: '800',
    color: 'orange',
    textAlign: 'center',
    marginTop: 15
  },
  description: {
    fontSize: 13,
    fontWeight: '300',
    color: 'orange',
    textAlign: 'center'
  },
  loginBox: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 25,
  },
  SignUpButton: {
    width: '80%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default Signup;