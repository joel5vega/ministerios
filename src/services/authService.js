import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export function loginWithGoogle() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export function logout() {
  const auth = getAuth();
  return signOut(auth);
}

export function onAuthStateChanged(callback) {
  const auth = getAuth();
  return auth.onAuthStateChanged(callback);
}
