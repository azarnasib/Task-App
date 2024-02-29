import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, auth } from "./utils/firebase/firebaseConfig";

const Splash = (props) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        props.navigation.replace('Home');
      } else {
        props.navigation.replace('Signup');
      }
    });

    return () => unsubscribe();
  }, [props.navigation]); 

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task App</Text>
      <Text style={styles.description}>Create, Manage, Share easily</Text>
      <ActivityIndicator size="small" color="white" style={{ marginVertical: 20 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    paddingTop: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  description: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Splash;