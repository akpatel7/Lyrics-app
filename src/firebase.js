import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyD0rJ5MGF6_IjHgV4xJXWuUwZ7KKxf_2ME",
  authDomain: "lyrics-finder-861fb.firebaseapp.com",
  databaseURL: "https://lyrics-finder-861fb.firebaseio.com",
  projectId: "lyrics-finder-861fb",
  storageBucket: "lyrics-finder-861fb.appspot.com",
  messagingSenderId: "952185169443"
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseAuth = firebase.auth();
