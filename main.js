// main.js
import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const form = document.getElementById("feedbackForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Submitting...";
  statusEl.className = "status";

  try {
    // Collect form data
    const formData = new FormData(form);

    // Build a clean object with only relevant fields
    const data = {
      hospitalId: formData.get("hospital") || null,
      hospitalName: formData.get("hospitalName") || null,
      // SECTION A
      workDuration: formData.get("workDuration") || null,
      employmentStatus: formData.get("employmentStatus") || null,
      employmentOther: formData.get("employmentOther") || null,
      // SECTION B
      workEnvironment: formData.get("workEnvironment") || null,
      toolsAvailable: formData.get("toolsAvailable") || null,
      deptCommunication: formData.get("deptCommunication") || null,
      interDeptCommunication: formData.get("interDeptCommunication") || null,
      feedbackValued: formData.get("feedbackValued") || null,
      // SECTION C
      supervisorApproach: formData.get("supervisorApproach") || null,
      managementCommunication: formData.get("managementCommunication") || null,
      managementSupport: formData.get("managementSupport") || null,
      leadershipRating: formData.get("leadershipRating") || null,
      // SECTION D
      roleSatisfaction: formData.get("roleSatisfaction") || null,
      workloadReasonable: formData.get("workloadReasonable") || null,
      skillsUtilized: formData.get("skillsUtilized") || null,
      careerGrowth: formData.get("careerGrowth") || null,
      // SECTION E
      compensationSatisfaction: formData.get("compensationSatisfaction") || null,
      benefitsSatisfaction: formData.get("benefitsSatisfaction") || null,
      // SECTION F
      teamwork: formData.get("teamwork") || null,
      fairnessPromotion: formData.get("fairnessPromotion") || null,
      motivation: formData.get("motivation") || null,
      // SECTION G
      likeMost: formData.get("likeMost") || null,
      improvementAreas: formData.get("improvementAreas") || null,
      managementSuggestions: formData.get("managementSuggestions") || null,
      // ADDITIONAL
      signedContract: formData.get("signedContract") || null,
      clearJobDescription: formData.get("clearJobDescription") || null,
      kpiClear: formData.get("kpiClear") || null,
      additionalServices: formData.get("additionalServices") || null,
      createdAt: serverTimestamp()
    };

    // Save to Firestore in "staff_feedback" collection
    await addDoc(collection(db, "staff_feedback"), data);

    // Show success
    statusEl.textContent = "Thank you! Your feedback has been submitted.";
    statusEl.className = "status success";
    form.reset();
  } catch (error) {
    console.error("Error submitting feedback:", error);
    statusEl.textContent = "An error occurred. Please try again.";
    statusEl.className = "status error";
  }
});

