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

  // Collect all form data including checkboxes
  function collectPayload() {
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    // Collect checkbox groups manually
    const checkboxGroups = ["servicesUsed", "otherCheckboxGroup"]; // replace with your checkbox names
    checkboxGroups.forEach((name) => {
      const checked = Array.from(form.querySelectorAll(`input[name="${name}"]:checked`))
                          .map(el => el.value);
      data[name] = checked; // array of selected values
    });

    // Capture hospital name from select if not typed
    if (!hospitalNameInput.value && hospitalSelect.selectedIndex > 0) {
      data.hospitalName = hospitalSelect.options[hospitalSelect.selectedIndex].text;
    } else {
      data.hospitalName = hospitalNameInput.value || "";
    }

    data.createdAt = serverTimestamp();
    return data;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "";
    status.className = "status";

    // Spam protection
    if (honeypot && honeypot.value.trim() !== "") {
      console.warn("Spam submission blocked");
      return;
    }

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const payload = collectPayload();

    try {
      await addDoc(collection(db, "quizResponses"), payload);
      status.textContent = "✅ Quiz submitted successfully!";
      status.className = "status success";
      form.reset();
      hospitalNameInput.value = "";
    } catch (error) {
      console.error("Error saving quiz:", error);
      status.textContent = "❌ Failed to submit. Please try again.";
      status.className = "status error";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Quiz";
    }
  });
});
