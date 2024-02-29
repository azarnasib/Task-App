import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import TaskItem from "../Components/TaskItem.component";
import { signOut } from "firebase/auth";
import { app, auth } from "./utils/firebase/firebaseConfig";
import { where,query,collection, getFirestore, getDocs } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = (props) => {
  const [myTotalTasks, setMyTotalTasks] = useState([]);
  const isFocused = useIsFocused('');

  const _getMyTasks = async () => {
    try {
      const db = getFirestore(app);
      const reference = collection(db, "Tasks");
      const userId = auth.currentUser.uid;
      const dbquery = query(reference, where('userId', '==', userId)); // Corrected the '==' operator
      const myTasks = await getDocs(dbquery); // Corrected the query variable
      let myAllTasks = [];

      myTasks.forEach(task => { // Changed map to forEach
        myAllTasks.push({ ...task.data(), id: task.id }); // Added {} to wrap the object
      });

      setMyTotalTasks(myAllTasks);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    _getMyTasks();
  }, [isFocused]);

  const _handleLogout = () => {
    Alert.alert("Logout", 'Do you really want to logout?', [
      { text: 'No' },
      {
        style: 'destructive',
        text: 'Yes',
      
        onPress: async () => {
          await signOut(auth);
          props.navigation.replace("Signup");
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="menu" size={24} color="black" />
        <TouchableOpacity style={styles.plusButtonContainer} onPress={() => props.navigation.navigate("AddTask")}>
          <AntDesign name="pluscircle" size={30} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity onPress={_handleLogout} style={{ paddingHorizontal: 10 }}>
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ margin: 12 }}>
        <Text style={{ color: "orange", fontSize: 20, fontWeight: "bold" }}>
          Welcome Azar
        </Text>
        <Text>Below are the tasks for you today</Text>
      </View>

      <FlatList
        data={myTotalTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TaskItem
            item={item}
            onPress={() => props.navigation.navigate('TaskDetail', { data: item, item })}
            title={item.title ? item.title.substring(0, 3) : ''} // Check if title is defined before using substring
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    width: "100%",
    height: 65,
    backgroundColor: "white",
    borderBottomWidth: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    borderBottomColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  plusButtonContainer: {
    paddingLeft: 250,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  description: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
  logoutButton: {
    alignSelf: "center",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default HomeScreen;