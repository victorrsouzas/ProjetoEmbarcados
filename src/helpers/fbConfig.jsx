import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyCjloC60ckg83Y9kA0I6IplNop9JZWYQV8",
  authDomain: "portaria-remota-383bf.firebaseapp.com",
  databaseURL: "https://portaria-remota-383bf-default-rtdb.firebaseio.com",
  projectId: "portaria-remota-383bf",
  storageBucket: "portaria-remota-383bf.appspot.com",
  messagingSenderId: "506876483237",
  appId: "1:506876483237:web:c3ed317f1b408d99a91f4c",
  measurementId: "G-Y860565RX4"
};
const fire = firebase.initializeApp(firebaseConfig);

export default fire;