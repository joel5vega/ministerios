import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

// Add
export async function addMinistry(data) {
  return await addDoc(collection(db, 'ministries'), data);
}

// Update
export async function updateMinistry(id, data) {
  return await updateDoc(doc(db, 'ministries', id), data);
}

// Delete
export async function deleteMinistry(id) {
  return await deleteDoc(doc(db, 'ministries', id));
}

// Fetch all
export async function fetchMinistries() {
  const querySnapshot = await getDocs(collection(db, 'ministries'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
