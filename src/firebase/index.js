// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, query, where, updateDoc, doc } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMAuw4fNl47SfPuhesjXJfIFE7r7lZu6k",
    authDomain: "promocion-79214.firebaseapp.com",
    projectId: "promocion-79214",
    storageBucket: "promocion-79214.appspot.com",
    messagingSenderId: "1055309833425",
    appId: "1:1055309833425:web:3d6796324752c5f3b191f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const GuardarData = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "clients"),{
            ...data,
            status : "active"
        }
          
        );
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

const listarData = async () => {
    try {
        const q = query(collection(db, "clients"), where("status", "==", "active"));
        const querySnapshot = await getDocs(q);
        return await querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
    } catch (error) {
        console.log(error);
    }
}
const borrar = async (id) => {
    try {
        const data = doc(db, "clients", id)
        await updateDoc(data, {
            status: "deleted",
        })
    } catch (error) {
        console.log(error);
    }
}



export { GuardarData, listarData,borrar }
