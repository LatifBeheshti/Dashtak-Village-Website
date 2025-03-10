// Firebase Configuration (Replace with your Firebase config)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Register User
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Registration successful! Redirecting to login.");
            window.location.href = "login.html";
        })
        .catch(error => alert(error.message));
}

// Login User
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Login successful! Redirecting to dashboard.");
            window.location.href = "dashboard.html";
        })
        .catch(error => alert(error.message));
}

// Logout User
function logout() {
    auth.signOut().then(() => {
        alert("Logged out!");
        window.location.href = "index.html";
    });
}

// Protect Dashboard Page
firebase.auth().onAuthStateChanged(user => {
    if (!user && window.location.pathname.includes("dashboard.html")) {
        alert("You must be logged in to access this page!");
        window.location.href = "login.html";
    }
});
