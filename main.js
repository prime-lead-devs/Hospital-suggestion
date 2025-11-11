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

  // Optional checkbox groups
  const checkboxGroups = []; // e.g., ["H_q1", "H_q2"]

  // Helper to collect form data
  function collectPayload() {
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    // Handle "Other" radio inputs
    const otherRadios = form.querySelectorAll('input[type="radio"][name$="_other"]');
    otherRadios.forEach(input => {
      const mainName = input.name.replace("_other", "");
      if (input.value && input.value.trim() !== "") {
        data[mainName] = `${data[mainName]}: ${input.value}`;
      }
    });

    // Handle checkbox groups
    checkboxGroups.forEach(name => {
      const checked = Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
      data[name] = checked; // store as array
    });

    // Add hospital name safely
    const hospital = hospitalSelect.value || hospitalNameInput.value || "Unknown";
    data.hospitalName = hospital.trim();

    // Add readable timestamp
    const now = new Date();
    data.createdAt = now.toLocaleString(); // e.g. "11/11/2025, 10:35 AM"
    data.timestamp = serverTimestamp(); // still keep for sorting if needed

    // Add author (anonymous for now)
    data.author = "anonymous";

    // Message field fallback
    if (!data.message && data.feedback) data.message = data.feedback;

    return data;
  }

  // Handle form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    status.className = "status";

    // Prevent spam
    if (honeypot && honeypot.value.trim() !== "") {
      console.warn("Spam submission blocked");
      return;
    }

    // Fix hospital input if not set
    if (!hospitalNameInput.value && hospitalSelect.selectedIndex > 0) {
      hospitalNameInput.value = hospitalSelect.options[hospitalSelect.selectedIndex].text;
    }

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

