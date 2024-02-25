// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, set } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqmwtzyxAo_KSD1OoMeK5yTFg4-VF3bgA",
    authDomain: "impnature-db87a.firebaseapp.com",
    databaseURL: "https://impnature-db87a-default-rtdb.firebaseio.com",
    projectId: "impnature-db87a",
    storageBucket: "impnature-db87a.appspot.com",
    messagingSenderId: "331394393334",
    appId: "1:331394393334:web:c56f21a94130fd0e12b8d7",
    measurementId: "G-9ZQSJ61SRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

let userRole = null;

export function getUserRole() {
    userRole = document.getElementById('role').value;
}

export function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in:', user);
            redirectToRolePage(user.displayName);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
        });
}

export function loginWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User logged in with Google:', user);
            redirectToRolePage(user.displayName);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
        });
}

export function register() {
    getUserRole();

    if (auth.currentUser) {
        auth.currentUser.updateProfile({
            displayName: userRole
        })
        .then(() => {
            const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
            set(userDocRef, {
                uid: auth.currentUser.uid,
                email: auth.currentUser.email,
                role: userRole
            })
            .then(() => {
                console.log('User registered successfully!');
                redirectToRolePage(userRole);
            })
            .catch((error) => {
                console.error('Error adding user to Firestore:', error);
            });
        })
        .catch((error) => {
            console.error('Error updating user profile:', error);
        });
    } else {
        console.error('User not logged in');
    }
}

export function redirectToRolePage(role) {
    switch (role) {
        case 'contributor':
            window.location.href = 'contributor.html';
            break;
        case 'common':
            window.location.href = 'common.html';
            break;
        case 'wildlifeOfficer':
            window.location.href = 'wildlife_officer.html';
            break;
        case 'environmentOfficer':
            window.location.href = 'environment_officer.html';
            break;
        default:
            // Redirect to registration page if the role is not recognized
            window.location.href = 'registration.html';
            break;
    }
}
