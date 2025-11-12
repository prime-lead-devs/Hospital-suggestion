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
const statusDiv = document.getElementById("status");

const hospitalSelect = document.getElementById("hospital");
const hospitalNameInput = document.getElementById("hospitalName");

// ====== Populate hidden hospitalName field automatically ======
hospitalSelect.addEventListener("change", () => {
  const selectedOption = hospitalSelect.options[hospitalSelect.selectedIndex];
  hospitalNameInput.value = selectedOption.text;
});

// ====== Handle Form Submit ======
feedbackForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Clear previous status
  statusDiv.textContent = "";
  statusDiv.classList.remove("success", "error");

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    // Collect all input values
    const feedbackData = {
      hospitalName: hospitalNameInput.value.trim(),
      createdAt: serverTimestamp(),
    };

    // Get all selected radio inputs, textareas, and selects
    const inputs = feedbackForm.querySelectorAll(
      "input[type='radio']:checked, select, textarea, input[type='text']:not(.honeypot)"
    );

    inputs.forEach((el) => {
      if (el.id) {
        feedbackData[el.id] = el.value.trim();
      }
    });

    // Add document to Firestore
    await addDoc(collection(db, "feedbacks"), feedbackData);

    // Success message
    statusDiv.textContent = "✅ Feedback submitted successfully!";
    statusDiv.classList.add("success");

    feedbackForm.reset();
  } catch (err) {
    console.error("Error saving feedback:", err);
    statusDiv.textContent = "❌ Failed to submit feedback. Please try again.";
    statusDiv.classList.add("error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  }
});

