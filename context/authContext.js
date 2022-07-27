import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebaseConfig";
import { updatePractitionersData } from "../model/PractitionersData/practitionersData";

const UserContext = createContext();

// ======================AUTHENTIFICATION===================== //

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignInMobile = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const googleSignInDesktop = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const resetPwd = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // ====================STORAGE===================== //

  const upload = async (file, user, setLoading) => {
    const fileRef = ref(storage, `avatars/${user.uid}`);

    setLoading(true);
    // eslint-disable-next-line no-unused-vars
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(user, { photoURL: photoURL });

    await updatePractitionersData(user, { photoURL: photoURL });

    setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logOut,
        signIn,
        resetPwd,
        googleSignInMobile,
        googleSignInDesktop,
        upload,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};
