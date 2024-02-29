// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth,getReactNativePersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJWHCNoltBOVcJ9FCgHmSpr0wwJ-uquzA",
  authDomain: "taskapp-142ad.firebaseapp.com",
  databaseURL: "https://taskapp-142ad-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "taskapp-142ad",
  storageBucket: "taskapp-142ad.appspot.com",
  messagingSenderId: "620390424380",
  appId: "1:620390424380:web:7349ef6d42f5f608264839",
  measurementId: "G-BEJXV44BYK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app,{
    persistence:getReactNativePersistence(AsyncStorage)
})