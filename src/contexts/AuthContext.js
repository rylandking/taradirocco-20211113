import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/init-firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    TwitterAuthProvider,
    signInWithPopup
} from 'firebase/auth';

// Tutorial: https://www.youtube.com/watch?v=MsDjbWUn3IE&ab_channel=yoursTRULY

const AuthContext = createContext({
    currentUser: null,
    register: () => Promise,
    login: () => Promise,
    logInWithGoogle: () => Promise,
    logInWithTwitter: () => Promise,
    logout: () => Promise
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logInWithGoogle() {
        const provider = new GoogleAuthProvider();
        // firebase.auth().useDeviceLanguage();
        return signInWithPopup(auth, provider);
    }

    function logInWithTwitter() {
        const provider = new TwitterAuthProvider();
        // firebase.auth().useDeviceLanguage();
        return signInWithPopup(auth, provider);
    }

    function logout() {
        return signOut(auth);
    }

    const value = {
        currentUser,
        register,
        login,
        logInWithGoogle,
        logInWithTwitter,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
