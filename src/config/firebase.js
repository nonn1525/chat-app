import firebase from 'firebase/app';
import "firebase/firestore";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC7wsr4hkbV6nk43lPkWg0RGJjL5lcGfvc",
  authDomain: "chatapp-9b40f.firebaseapp.com",
  projectId: "chatapp-9b40f",
  storageBucket: "chatapp-9b40f.appspot.com",
  messagingSenderId: "483454385154",
  appId: "1:483454385154:web:fb2ab36c9b246c01adbb1b"
}

firebase.initializeApp(firebaseConfig)

export default firebase