import { auth } from "../services/firebase";

export function signup(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
  }

export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function signout() {
    return auth().signOut();
}

// helper function to make Google Authentication available.
export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
  }