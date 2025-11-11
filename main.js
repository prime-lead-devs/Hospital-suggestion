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

  // Map form inputs to section + question IDs
  const QUESTION_ORDER = [
    "A_q1", "A_q2", "A_q3", "A_q4",
    "B_q1", "B_q2", "B_q3", "B_q4", "B_q5",
    "C_q1", "C_q2", "C_q3", "C_q4",
    "D_q1", "D_q2", "D_q3", "D_q4",
    "E_q1", "E_q2", "E_q3", "E_q4",
    "F_q1", "F_q2", "F_q3", "F_q4",
    "G_q1", "G_q2", "G_q3"
  ];

  function collectPayload() {
    const fd = new FormData(form);
    const data = { sections: {} };

    // Determine hospital
    const hospital = hospitalSelect.value || hospitalNameInput.value || "Unknown";

    // Iterate through all form entries
    for (let [key, value] of fd.entries()) {
      if (!value) continue;

      // Determine section
      const match = key.match(/^([A-G])_q\d+/);
      if (match) {
        const section = match[1];
        if (!data.sections[section]) data.sections[section] = {};
        data.sections[section][key] = value;
      } else {
        data[key] = value; // for other fields (e.g., additional questions)
      }
    }

    // Handle "Other" radios
    const otherRadios = form.querySelectorAll('input[type="radio"][name$="_other"]');
    otherRadios.forEach(input => {
      const mainName = input.name.replace("_other", "");
      if (input.value && input.value.trim() !== "") {
        const section = mainName[0];
        if (!data.sections[section]) data.sections[section] = {};
        data.sections[section][mainName + "_other"] = input.value.trim();
      }
    });

    data.hospitalName = hospital.trim();
    data.createdAt = serverTimestamp(); // Firestore timestamp
    data.author = "anonymous"; // you can update later if needed

    return data;
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    status.textContent = "";
    status.className = "status";

    if (honeypot && honeypot.value.trim() !== "") return; // spam check

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

