// main.js
import { db } from "./firebase-config.js";
import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const feedbackForm = document.getElementById("feedbackForm");

// Create a container for the submission message
const messageContainer = document.createElement("p");
messageContainer.style.textAlign = "center";
messageContainer.style.color = "green";
messageContainer.style.fontWeight = "bold";
messageContainer.style.marginTop = "15px";
feedbackForm.appendChild(messageContainer);

feedbackForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Collect form data
  const formData = new FormData(feedbackForm);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  data.timestamp = Timestamp.now();

  try {
    // Save to Firestore
    await addDoc(collection(db, "hospitalFeedback"), data);

    // Show submission message
    messageContainer.textContent = "Thank you! Your feedback has been submitted ✅";

    // Reset the form
    feedbackForm.reset();

    // Clear message after 5 seconds
    setTimeout(() => {
      messageContainer.textContent = "";
    }, 5000);

  } catch (error) {
    console.error("Error submitting feedback:", error);
    messageContainer.style.color = "red";
    messageContainer.textContent = "Oops! Something went wrong. Please try again.";
  }
});
