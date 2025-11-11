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

  // Optional: checkbox groups if any
  const checkboxGroups = []; // e.g., ["F_q2"]

  function collectPayload() {
    const fd = new FormData(form);
    const data = {};

    // Determine hospital
    const hospital = hospitalSelect.value || hospitalNameInput.value || "Unknown";

    // Flatten all form inputs
    for (let [key, value] of fd.entries()) {
      if (!value) continue;

      // Check for checkbox groups
      if (checkboxGroups.includes(key)) {
        const checked = Array.from(form.querySelectorAll(`input[name="${key}"]:checked`)).map(el => el.value);
        data[key.replace("_", " ")] = checked; // e.g., F_q2 → F q2
      } else {
        const flatKey = key.replace("_", " "); // e.g., A_q1 → A q1
        data[flatKey] = value;
      }
    }

    // Handle "Other" radio inputs
    const otherRadios = form.querySelectorAll('input[type="radio"][name$="_other"]');
    otherRadios.forEach(input => {
      const mainName = input.name.replace("_other", "");
      if (input.value && input.value.trim() !== "") {
        const flatKey = mainName.replace("_", " ") + " other"; // e.g., A_q2_other → A q2 other
        data[flatKey] = input.value.trim();
      }
    });

    // Add metadata
    data.hospitalName = hospital.trim();
    data.createdAt = serverTimestamp();
    data.author = "anonymous"; // can update later if needed

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

  // Optional: checkbox groups if any
  const checkboxGroups = []; // e.g., ["F_q2"]

  function collectPayload() {
    const fd = new FormData(form);
    const data = {};

    // Determine hospital
    const hospital = hospitalSelect.value || hospitalNameInput.value || "Unknown";

    // Flatten all form inputs
    for (let [key, value] of fd.entries()) {
      if (!value) continue;

      // Check for checkbox groups
      if (checkboxGroups.includes(key)) {
        const checked = Array.from(form.querySelectorAll(`input[name="${key}"]:checked`)).map(el => el.value);
        data[key.replace("_", " ")] = checked; // e.g., F_q2 → F q2
      } else {
        const flatKey = key.replace("_", " "); // e.g., A_q1 → A q1
        data[flatKey] = value;
      }
    }

    // Handle "Other" radio inputs
    const otherRadios = form.querySelectorAll('input[type="radio"][name$="_other"]');
    otherRadios.forEach(input => {
      const mainName = input.name.replace("_other", "");
      if (input.value && input.value.trim() !== "") {
        const flatKey = mainName.replace("_", " ") + " other"; // e.g., A_q2_other → A q2 other
        data[flatKey] = input.value.trim();
      }
    });

    // Add metadata
    data.hospitalName = hospital.trim();
    data.createdAt = serverTimestamp();
    data.author = "anonymous"; // can update later if needed

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

  // Optional: checkbox groups if any
  const checkboxGroups = []; // e.g., ["F_q2"]

  function collectPayload() {
    const fd = new FormData(form);
    const data = {};

    // Determine hospital
    const hospital = hospitalSelect.value || hospitalNameInput.value || "Unknown";

    // Flatten all form inputs
    for (let [key, value] of fd.entries()) {
      if (!value) continue;

      // Check for checkbox groups
      if (checkboxGroups.includes(key)) {
        const checked = Array.from(form.querySelectorAll(`input[name="${key}"]:checked`)).map(el => el.value);
        data[key.replace("_", " ")] = checked; // e.g., F_q2 → F q2
      } else {
        const flatKey = key.replace("_", " "); // e.g., A_q1 → A q1
        data[flatKey] = value;
      }
    }

    // Handle "Other" radio inputs
    const otherRadios = form.querySelectorAll('input[type="radio"][name$="_other"]');
    otherRadios.forEach(input => {
      const mainName = input.name.replace("_other", "");
      if (input.value && input.value.trim() !== "") {
        const flatKey = mainName.replace("_", " ") + " other"; // e.g., A_q2_other → A q2 other
        data[flatKey] = input.value.trim();
      }
    });

    // Add metadata
    data.hospitalName = hospital.trim();
    data.createdAt = serverTimestamp();
    data.author = "anonymous"; // can update later if needed

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

