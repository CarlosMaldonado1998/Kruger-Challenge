import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updatePassword } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

//functions users
export async function registerEmployee(data) {
  try {
    createUserWithEmailAndPassword(auth, data.email, data.CI)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        const { uid } = userRecord.user;
        const NewData = {
          ...data,
          uid,
        };
        createUser(NewData);
      })
      .catch((error) => {
        console.log("Error creating new user:", error);
      });
  } catch (e) {
    console.error("Error al crear el usuario: ", e);
  }
}

export async function createUser(user) {
  try {
    const q = collection(db, "users");
    const docRef = doc(q, user.uid);
    setDoc(docRef, user);
  } catch (e) {
    console.log("Error al actualizar información de usuario", e);
  }
}

export async function updateMyPassword(pass){
  const user = auth.currentUser;
  await updatePassword(user, pass); 
}
export async function updateUser(user) {
  try {
    const q = collection(db, "users");
    const docRef = doc(q, user.uid);
    updateDoc(docRef, user);
  } catch (e) {
    console.log("Error al actualizar información de usuario", e);
  }
}

export async function deleteUser(user) {
  try {
    const q = collection(db, "users");
    const docRef = doc(q, user.uid);
    await deleteDoc(docRef);
  } catch (e) {
    console.log("Error al eliminar usuario");
  }
}

export async function usersData() {
  const users = [];
  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const user = { ...doc.data() };
    users.push(user);
  });
  return users;
}

export async function myUser(user) {
  const docRef = doc(db, "users", user);
  const docSnap = await getDoc(docRef);
  const userData = docSnap.data();
  return userData;
}

export async function usersExistsData(searchKey) {
  const users = [];
  const q = collection(db, "users");
  const request = query(q, where("CI", "==", searchKey));

  const querySnapshot = await getDocs(request);

  querySnapshot.forEach((doc) => {
    const user = { ...doc.data() };
    users.push(user);
  });
  return users;
}

export async function usersDataVaccine(searchKey) {
  const users = [];
  const q = collection(db, "users");
  const request = query(q, where("stateVaccine", "==", searchKey));

  const querySnapshot = await getDocs(request);

  querySnapshot.forEach((doc) => {
    const user = { ...doc.data() };
    users.push(user);
  });
  return users;
}

export async function usersDataNoVaccine() {
  const users = [];
  const q = collection(db, "users");
  const request = query(q, where("stateVaccine", "!=", "Vacunado"));

  const querySnapshot = await getDocs(request);

  querySnapshot.forEach((doc) => {
    const user = { ...doc.data() };
    users.push(user);
  });
  return users;
}

export async function usersDataTypeVaccine(searchKey) {
  const users = [];
  const q = collection(db, "users");
  const request = query(q, where("typeVaccine", "==", searchKey));

  const querySnapshot = await getDocs(request);

  querySnapshot.forEach((doc) => {
    const user = { ...doc.data() };
    users.push(user);
  });
  return users;
}

export async function usersDataRangeDate(date1, date2) {
  console.log("SE consulto rango");
  const users = [];
  const q = collection(db, "users");
  const request = query(
    q,
    where("dateVaccineTimestamp", ">=", date1),
    where("dateVaccineTimestamp", "<=", date2)
  );

  const querySnapshot = await getDocs(request);

  querySnapshot.forEach((doc) => {
    const user = { ...doc.data() };
    users.push(user);
  });
  return users;
}
