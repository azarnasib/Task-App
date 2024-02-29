import react,{useState} from "react";
import {TextInput} from 'react-native';
const AddTaskInput = ({value,onChangeText,placeholder,secureTextEntry}) => {


    return (
        <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor='grey'
        style={{
            width: '100%',
            height: 55,
            backgroundColor: '#EFF2F0',
            alignSelf: 'center',
            paddingLeft: 10,
            color: 'black',
            borderBottomWidth:0.3
        }}
    />
    )
}


export default AddTaskInput;