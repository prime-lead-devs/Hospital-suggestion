// ====== Firebase SDK imports ======
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

// ====== Firebase Config ======
const firebaseConfig = {
  apiKey: "AIzaSyDvVUrCLZj3Afu5MFqu5EhOGejyTfqEjgY",
  authDomain: "suggestion-box-4b869.firebaseapp.com",
  projectId: "suggestion-box-4b869",
  storageBucket: "suggestion-box-4b869.firebasestorage.app",
  messagingSenderId: "263926556991",
  appId: "1:263926556991:web:8c1f585f1f42fb72664b8a",
  measurementId: "G-RHHQJE2Y6B"
};

// ====== Initialize Firebase ======
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ====== DOM Elements ======
const feedbackForm = document.getElementById("feedbackForm");
const submitBtn = document.getElementById("submitBtn");
const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");

// ====== Handle Form Submit ======
feedbackForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  successMsg.textContent = "";
  errorMsg.textContent = "";
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    // Get hospital name
    const hospitalName = document.getElementById("hospitalName").value.trim();

    // Collect all questions by ID (A_q1, A_q3, etc.)
    const feedbackData = {
      hospitalName,
      createdAt: serverTimestamp(),
    };

    // Loop through all inputs with IDs like A_q1, B_q1, etc.
    const inputs = feedbackForm.querySelectorAll("input[type='radio']:checked, select, textarea");
    inputs.forEach((el) => {
      if (el.id && el.id.includes("_q")) {
        feedbackData[el.id] = el.value.trim();
      }
    });

    // Add document to Firestore
    await addDoc(collection(db, "feedbacks"), feedbackData);

    successMsg.textContent = "✅ Feedback submitted successfully!";
    feedbackForm.reset();
  } catch (err) {
    console.error("Error saving feedback:", err);
    errorMsg.textContent = "❌ Failed to submit feedback. Please try again.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});

