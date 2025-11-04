import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs,serverTimestamp  } from 'firebase/firestore';

// Add new ministry
export async function addMinistry(data) {
  // You can validate/sanitize data here before sending to Firestore
  return await addDoc(collection(db, "ministerios"), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    active: true
  });
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
    const colRef = collection(db, "ministerios");
    const querySnapshot = await getDocs(colRef);
    console.log(`[MinistryService] Fetched ${querySnapshot.size} ministerios.`);
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
