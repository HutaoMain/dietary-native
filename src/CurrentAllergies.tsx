import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { FIRESTORE_DB } from "./firebase/FirebaseConfig";

const updateUserAllergies = async (
  userEmail: string,
  selectedAllergies: string[]
) => {
  const allergyCollectionRef = collection(FIRESTORE_DB, "allergies");

  // Check if the user exists in the collection
  const userQuery = query(
    allergyCollectionRef,
    where("email", "==", userEmail)
  );
  const userSnapshot = await getDocs(userQuery);

  if (userSnapshot.empty) {
    // If the user doesn't exist, add a new document with allergies array
    await addDoc(allergyCollectionRef, {
      email: userEmail,
      allergies: selectedAllergies,
    });
  } else {
    // If the user exists, update the allergies array
    const userDoc = userSnapshot.docs[0];
    await updateDoc(userDoc.ref, {
      allergies: arrayUnion(...selectedAllergies),
    });
  }
};

export default updateUserAllergies;
