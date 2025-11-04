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


// Fetch all ministries, with verbose logging
export async function fetchMinistries() {
  console.log('[MinistryService] Fetching ministries...');
  try {
    const colRef = collection(db, "ministries");
    const querySnapshot = await getDocs(colRef);
    console.log(`[MinistryService] Fetched ${querySnapshot.size} ministries.`);
    const ministries = querySnapshot.docs.map(doc => {
      console.log(`[MinistryService] Ministry doc:`, doc.id, doc.data());
      return {
        id: doc.id,
        ...doc.data()
      };
    });
    console.log('[MinistryService] Ministries array:', ministries);
    return ministries;
  } catch (error) {
    console.error('[MinistryService] Error fetching ministries:', error);
    throw error;
  }
}
