import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './utils/firebase/firebaseConfig';
import InputComponent from '../Components/Input.component';

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _loginUser = async () => {
    try {
      if (!email) {
        alert('Please enter the correct email');
        return;
      }

      if (!password) {
        alert('Please enter the correct password');
        return;
      }

      setLoading(true);

      const response = await signInWithEmailAndPassword(auth, email, password);
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
    <View style={styles.Container}>
      <View style={styles.loginBox}>
        <Text style={styles.heading}>TaskApp Login</Text>
        <Text style={styles.description}>Create, Manage, Share Tasks easily</Text>

        <View>
          <InputComponent
            value={email}
            onChangeText={setEmail}
            placeholder={'Email Address'}
          />
          <InputComponent
            value={password}
            onChangeText={setPassword}
            placeholder={'Password'}
            secureTextEntry={true}
          />
        </View>

        <View>
          <TouchableOpacity style={styles.LoginBtn} onPress={_loginUser}>
            <Text style={styles.btnText}>LOG IN</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, alignSelf: 'center' }}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
            <Text style={{ fontWeight: 'bold', paddingLeft: 10 }}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  heading: {
    fontSize: 25,
    fontWeight: '800',
    color: 'orange',
    textAlign: 'center',
    marginTop: 15,
  },
  description: {
    fontSize: 13,
    fontWeight: '300',
    color: 'orange',
    textAlign: 'center',
  },
  loginBox: {
    width: '80%',
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  LoginBtn: {
    width: '80%',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;