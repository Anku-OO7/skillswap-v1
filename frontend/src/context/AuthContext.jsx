import React, { createContext, useContext, useState, useEffect } from "react";
import axios from '../api/axios';
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // fetch user data from firestore
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await api.get('/api/users/user/' //axios.get("/users/user/", {
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
            );
            console.log("Fetched user data:", response.data);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.access);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };
    
    return (
        <AuthContext.Provider value={{ user, setUser, loginUser, loading, logout, fetchUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
// // custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};























// earlier version using firebase realtimeDB 

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { auth, realtimeDB } from "../firebase";
// import { signOut } from "firebase/auth";
// import { ref, get, set } from "firebase/database";

// const AuthContext = createContext();

// // export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // fetch user data from firestore
//     const fetchUserData = async (uid) => {
//         try {
//             const userRef = ref(realtimeDB, `users/${uid}`);
//             const snapshot = await get(userRef);
//             if (snapshot.exists()) {
//                 return snapshot.val();
//             }
//             return null;
//         } catch (error) {
//             console.error("Error fetching user data:", error);
//             return null;
//         }
//     };

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
//             if (firebaseUser){
//                 const userData = await fetchUserData(firebaseUser.uid);
//                 setUser({
//                     uid: firebaseUser.uid,
//                     email: firebaseUser.email,
//                     name: userData?.name || firebaseUser.displayName || "User",
//                     photoURL: userData?.photoURL || firebaseUser.photoURL || "",
//                 });
//             } else {
//                 setUser(null);                
//             }
//             setLoading(false);
//         });
//         return () => unsubscribe();
//     }, []);
//     // update profile in firestore
//     const updateProfile = async (newName, newPhotoURL) => {
//         if (!user) return;

//         try {
//             const userRef = ref(realtimeDB, `users/${user.uid}`);
//             await set(userRef, { name: newName, photoURL: newPhotoURL });

//             setUser((prevUser) => ({
//                 ...prevUser,
//                 name: newName,
//                 photoURL: newPhotoURL,
//             }));
//         } catch (error) {
//             console.error("Error updating profile:", error);
//         }
//     };

//     const logout = async () => {
//         try {
//             await signOut(auth); // firebase logout
//         } catch (error) {
//             console.error("Logout failed:", error);
//         }
//     };
    
//     return (
//         <AuthContext.Provider value={{ user, setUser, updateProfile, loading, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export { AuthContext };
// // // custom hook to use the auth context
// export const useAuth = () => {
//     return useContext(AuthContext);
// };