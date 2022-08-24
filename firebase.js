import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyAaulG-MH4aVzvoaIDD4i5ROheOAGDI0l4',
    authDomain: 'chatservice-cf716.firebaseapp.com',
    projectId: 'chatservice-cf716',
    storageBucket: 'chatservice-cf716.appspot.com',
    messagingSenderId: '108337216977',
    appId: '1:108337216977:web:04f70d11240fc8e068b4f0',
    measurementId: 'G-9HRP9FYZ4H',
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export { firebase, db };
