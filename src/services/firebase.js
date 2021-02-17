import firebase from "firebase/app"
import "firebase/auth"

import {firebaseConfig} from 'config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log('logging user');
  }).catch((error) => {
    console.log('error while logging user :(');
    console.log(error.message)
  })
}

export const signOutFromGoogle = () => {
  auth.signOut().then(function() {
    console.log('successful signout')
  }).catch(function(error) {
    console.log('error while signing out');
    console.log(error.message);
  });
}

export const getToken = () => {
  return new Promise(async function (resolve, reject) {
    auth.currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      resolve(idToken);
    }).catch(function(error) {
      reject(error)
    });
  });
}