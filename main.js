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

  // QUESTION ORDER — must match dashboard exactly
  const QUESTION_ORDER = [
    { section: "A", q: 1 },
    { section: "A", q: 3 },
    { section: "B", q: 1 },
    { section: "B", q: 3 },
    { section: "B", q: 5 },
    { section: "B", q: 7 },
    { section: "B", q: 9 },
    { section: "C", q: 1 },
    { section: "C", q: 3 },
    { section: "C", q: 5 },
    { section: "C", q: 7 },
    { section: "D", q: 1 },
    { section: "D", q: 3 },
    { section: "D", q: 5 },
    { section: "D", q: 7 },
    { section: "E", q: 1 },
    { section: "E", q: 3 },
    { section: "F", q: 1 },
    { section: "F", q: 3 },
    { section: "F", q: 5 },
  ];

  function collectPayload() {
    const fd = new FormData(form);
    const data = {};

    // Determine hospital
    const hospital = hospitalSelect.value || hospitalNameInput.value || "Unknown";

    // Flatten form inputs
    QUESTION_ORDER.forEach(q => {
      const key = `${q.section}_q${q.q}`;
      const input = form.querySelector(`[name="${key}"]`);
      if (input && input.value.trim() !== "") {
        data[key] = input.value.trim();
      }
    });

    // Add metadata
    data.hospitalName = hospital.trim();
    data.createdAt = serverTimestamp();
    data.author = "anonymous";

    return data;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    status.className = "status";

    // Spam trap
    if (honeypot && honeypot.value.trim() !== "") return;

    // Fix hospital input if select is used
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
    } catch (err) {
      console.error("Error saving feedback:", err);
      status.textContent = "❌ Failed to submit feedback. Please try again.";
      status.className = "status error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Feedback";
    }
  });
});

