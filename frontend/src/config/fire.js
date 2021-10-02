import firebase from 'firebase';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSjCIe7eOKItlGQKJLJvIZUtYH8jSQR3M",
    authDomain: "prm-assist-portal.firebaseapp.com",
    projectId: "prm-assist-portal",
    storageBucket: "prm-assist-portal.appspot.com",
    messagingSenderId: "11497641483",
    appId: "1:11497641483:web:e747975203a733df6ad90e"
  };
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}
const fire = firebase;
export default fire;