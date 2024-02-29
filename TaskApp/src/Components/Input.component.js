import react,{useState} from "react";
import { TextInput } from "react-native";
const InputComponent=({value,onChangeText, placeholder,secureTextEntry})=>{
    return (
        <TextInput
         secureTextEntry={secureTextEntry}
         value={value}
         onChangeText={onChangeText}
         placeholder={placeholder}
         placeholderTextColor='gray'
         style={{
            width:"80%",
            height:45,
            backgroundColor:'#dcdcdc',
            alignSelf:"center",
            borderRadius:5,
            paddingLeft:10,
            color:'black',
            marginTop: 5
         }}

        />
    )
}

export default InputComponent;