import  Firebase from 'firebase';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKKeI_fOyX9I8hxZHiVJJAOcrffIC7s4w",
  authDomain: "pirata-33104.firebaseapp.com",
  projectId: "pirata-33104",
  storageBucket: "pirata-33104.appspot.com",
  messagingSenderId: "330499925144",
  appId: "1:330499925144:web:5a73309c93445d9e8fdced",
  measurementId: "G-PFB55YRB2J"
};

const firebaseApp = Firebase.initializeApp(firebaseConfig)


// exportamos los módulos que utilizaremos
export const Auth = firebaseApp.auth()
export const Storage = firebaseApp.storage()
export const Database = firebaseApp.firestore()
export const GruposRef = Database.collection('Grupos')