// main.js
import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  const status = document.getElementById("status");
  const hospitalSelect = document.getElementById("hospital");
  const hospitalNameInput = document.getElementById("hospitalName");
  const submitBtn = document.getElementById("submitBtn");
  const honeypot = document.getElementById("website"); // spam trap

  // Helper function to collect all form data
  function collectPayload() {
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    data.createdAt = serverTimestamp();
    return data;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    status.className = "status";

    // Prevent bots
    if (honeypot && honeypot.value.trim() !== "") {
      console.warn("Spam submission blocked");
      return;
    }

    // Ensure hospital name matches selected option
    if (!hospitalNameInput.value && hospitalSelect.selectedIndex > 0) {
      hospitalNameInput.value = hospitalSelect.options[hospitalSelect.selectedIndex].text;
    }

    // Disable button while submitting
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const payload = collectPayload();

    try {
      await addDoc(collection(db, "feedbacks"), payload);
      status.textContent = "✅ Feedback submitted successfully!";
      status.className = "status success";
      form.reset();
      hospitalNameInput.value = "";
    } catch (error) {
      console.error("Error saving feedback:", error);
      status.textContent = "❌ Failed to submit feedback. Please try again.";
      status.className = "status error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Feedback";
    }
  });
});
