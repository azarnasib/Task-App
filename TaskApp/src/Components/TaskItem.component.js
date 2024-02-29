import React from "react";
import { View, Text, Pressable } from 'react-native';

const TaskItem = ({item, onPress}) => {
  return (

    <Pressable style={{

      width: '90%',
      borderRadius: 20,
      backgroundColor: 'white',
      alignSelf: 'center',
      borderWidth: 0.3,
      marginVertical: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
      borderColor: 'white',
      padding: 15
    }}
    onPress={onPress}
    >

      <Text style={{ color: 'black', marginVertical: 2, fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
      <Text style={{ color: 'grey', marginVertical: 2, fontSize: 12, fontWeight: '300' }}>{item.description}</Text>
      <Text style={{ color: 'black', marginVertical: 2, fontSize: 13 }}>{item.createdOn?.seconds}</Text>
    </Pressable>
  );
};

export default TaskItem;
