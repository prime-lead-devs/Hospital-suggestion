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

  // Map all inputs and textareas explicitly
  const data = {
    hospital: feedbackForm.hospital.value || "",
    workDuration: feedbackForm.workDuration.value || "",
    employmentStatus: feedbackForm.employmentStatus.value || "",
    employmentOther: feedbackForm.employmentOther.value || "",
    workEnvironment: feedbackForm.workEnvironment.value || "",
    resourcesAvailable: feedbackForm.resourcesAvailable.value || "",
    deptCommunication: feedbackForm.deptCommunication.value || "",
    interDeptCommunication: feedbackForm.interDeptCommunication.value || "",
    feedbackValued: feedbackForm.feedbackValued.value || "",
    supervisorApproach: feedbackForm.supervisorApproach.value || "",
    managementCommunication: feedbackForm.managementCommunication.value || "",
    managementSupport: feedbackForm.managementSupport.value || "",
    leadershipRating: feedbackForm.leadershipRating.value || "",
    roleSatisfaction: feedbackForm.roleSatisfaction.value || "",
    workloadReasonable: feedbackForm.workloadReasonable.value || "",
    skillsUtilized: feedbackForm.skillsUtilized.value || "",
    careerOpportunities: feedbackForm.careerOpportunities.value || "",
    compensation: feedbackForm.compensation.value || "",
    benefits: feedbackForm.benefits.value || "",
    teamwork: feedbackForm.teamwork.value || "",
    fairness: feedbackForm.fairness.value || "",
    motivation: feedbackForm.motivation.value || "",
    likes: feedbackForm.likes.value || "",
    improvements: feedbackForm.improvements.value || "",
    suggestions: feedbackForm.suggestions.value || "",
    signedContract: feedbackForm.signedContract.value || "",
    jobDescription: feedbackForm.jobDescription.value || "",
    kpi: feedbackForm.kpi.value || "",
    additionalServices: feedbackForm.additionalServices.value || "",
    timestamp: Timestamp.now()
  };

  try {
    await addDoc(collection(db, "hospitalFeedback"), data);

    messageContainer.style.color = "green";
    messageContainer.textContent = "Thank you! Your feedback has been submitted ✅";

    feedbackForm.reset();

    setTimeout(() => {
      messageContainer.textContent = "";
    }, 5000);

  } catch (error) {
    console.error("Error submitting feedback:", error);
    messageContainer.style.color = "red";
    messageContainer.textContent = "Oops! Something went wrong. Please try again.";
  }
});

