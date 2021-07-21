import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCsCKnfpfgyH5ehGPcshMVdE1UNH-CXFSo",
  authDomain: "dream-of-earth.firebaseapp.com",
  projectId: "dream-of-earth",
  storageBucket: "dream-of-earth.appspot.com",
  messagingSenderId: "785954317476",
  appId: "1:785954317476:web:45c4b624bacc00043b3231",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
