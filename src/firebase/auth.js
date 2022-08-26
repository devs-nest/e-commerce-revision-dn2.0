// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";// Initialize Firebase Authentication and get a reference to the service
import { createContext, useContext, useEffect, useState } from "react";

// Your web app's Firebase configuration

const firebaseConfig = {
    // add your config object here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);


function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signUp = (email, password, displayName) => createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
        updateProfile(user, { displayName })
        setUser(user);
        return user;
    });

    const signIn = (username, password) => {
        return signInWithEmailAndPassword(auth, username, password)
            .then(({ user }) => {
                setUser(user);
                return user;
            });
    }


    const signOutUser = () => signOut(auth).then(() => setUser(null));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(null)
        })
        return () => unsubscribe();
    }, [])


    return {
        signUp,
        signIn,
        signOut: signOutUser,
        user
    }
}

export default AuthProvider