import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db, editUser } from "./firebase";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const handleUser = (user) => {
    if (user) {
      //si tengo sesión activa
      setUser(user);

      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.log(error);
      handleUser(false);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      handleUser(false);
    } catch (error) {
      throw error;
    }
  }

  const resetEmail = async (email) => {
    await sendPasswordResetEmail(auth, email);
    return true;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        handleUser(userData);
      } else {
        // User is signed out
        handleUser(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    login,
    logout,
    resetEmail,
  };
}
