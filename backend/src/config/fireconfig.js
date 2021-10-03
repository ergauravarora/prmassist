// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as  dotenv from 'dotenv'


const result = dotenv.config({path:'.env'})
if (result.error) {
  throw result.error
}
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
const firebaseConfig = {
  
    apiKey: process.env.NODE_APP_FIREBASE_API_KEY,
    authDomain: process.env.NODE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NODE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.NODE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NODE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NODE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NODE_APP_FIREBASE_APP_ID
};

// Initialize Firebase
export default firebaseConfig;