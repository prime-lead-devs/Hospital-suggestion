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

  function collectPayload() {
    const fd = new FormData(form);
    const data = {};

    // Determine hospital
    const hospital = hospitalSelect.value || hospitalNameInput.value || "Unknown";

    // Flatten all form inputs
    for (let [key, value] of fd.entries()) {
      if (!value) continue;
      const flatKey = key.replaceAll("_", " "); // replace all underscores
      data[flatKey] = value;
    }

    // Handle "Other" radio inputs
    const otherRadios = form.querySelectorAll('input[type="radio"][name$="_other"]');
    otherRadios.forEach(input => {
      const mainName = input.name.replace("_other", "");
      if (input.value && input.value.trim() !== "") {
        const flatKey = mainName.replaceAll("_", " ") + " other";
        data[flatKey] = input.value.trim();
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

    // Fix hospital input
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
