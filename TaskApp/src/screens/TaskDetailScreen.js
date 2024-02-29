import react, {useEffect, useState} from "react";
import {View, Text, StyleSheet, FlatList, TextInput,TouchableOpacity,ActivityIndicator} from "react-native";
import COLORS from "./utils/Colors";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import TaskItem from "../Components/TaskItem.component";
import AddTaskInput from "../Components/AddTaskInput.component";
import {doc, addDoc,updateDoc,deleteDoc,getFirestore, collection} from "firebase/firestore";
import {app} from "./utils/firebase/firebaseConfig"
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import { Colors } from "react-native/Libraries/NewAppScreen";

const TaskDetail = (props) => {
    const { params } = useRoute();
    const taskDetail = params.data;
    const db = getFirestore(app);
    const documentRef = doc(db, "Tasks", taskDetail?.id);
  
    const _deleteTask = async () => {
      try {
        await deleteDoc(documentRef);
        props.navigation.navigate("Home");
      } catch (e) {
        console.log(e);
        alert(JSON.stringify(e));
      }
    };
  
    const _changeStatus = async () => {
      try {
        await updateDoc(documentRef, {
          status: "Completed",
        });
        props.navigation.navigate("Home");
      } catch (e) {
        alert(JSON.stringify(e));
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            color="black"
            size={24}
          />
          <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>
            Task Details
          </Text>
        </View>
        <Text style={{ color: "black", marginVertical: 2, fontSize: 20, fontWeight: "bold" }}>
          {taskDetail?.title}
        </Text>
        <Text style={{ color: "grey", marginVertical: 2, fontSize: 12, fontWeight: "300" }}>
          {taskDetail?.description}
        </Text>
        <Text style={{ color: "black", marginVertical: 2, fontSize: 13 }}>
          Created On: {moment(taskDetail?.createdOn.seconds).format("DD/MM/YY/ hh:mm:ss A")}
        </Text>
        {taskDetail?.isUrgent && (
          <View
            style={{
              width: 100,
              height: 35,
              backgroundColor: "#FFCCD9",
              borderRadius: 4,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 30,
              marginVertical: 10,
            }}
          >
            <Text style={{ color: "red", fontSize: 13, fontWeight: "bold" }}>Urgent</Text>
          </View>
        )}
        <View
          style={{
            position: "absolute",
            bottom: 20,
            width: "100%",
            alignSelf: "center",
          }}
        >
          {taskDetail.status === "Pending" ? (
            <TouchableOpacity
              style={{
                width: "90%",
                height: 35,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                borderRadius: 10,
                marginBottom: 10,
                backgroundColor: "#0bda51",
              }}
              onPress={_changeStatus}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>This task is completed</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  width: "90%",
                  height: 35,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  borderRadius: 10,
                  marginBottom: 10,
                  backgroundColor: "red",
                }}
                onPress={_deleteTask}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>DELETE</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    header: {
      width: "100%",
      height: 65,
      backgroundColor: "white",
      borderBottomWidth: 0.3,
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
      paddingHorizontal: 10,
    },
    heading: {
      fontSize: 30,
      fontWeight: "bold",
      color: "white",
    },
    description: {
      fontSize: 13,
      fontWeight: "300",
      color: "white",
    },
  });
  
  export default TaskDetail;
    