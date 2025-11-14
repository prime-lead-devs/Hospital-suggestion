// main.js
import { db } from "./firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const form = document.getElementById("feedbackForm");
const statusDiv = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusDiv.textContent = "Submitting...";

  // Collect form values
  const hospitalSelect = document.getElementById("hospital");
  const hospital = hospitalSelect.value;
  const hospitalName = hospitalSelect.options[hospitalSelect.selectedIndex].text;

  // Section A
  const workDuration = form.querySelector('input[name="workDuration"]:checked')?.value || null;
  const employmentStatus = form.querySelector('input[name="employmentStatus"]:checked')?.value || null;
  const employmentOther = form.querySelector('#employmentOther')?.value || null;

  // Section B
  const workEnvironment = form.querySelector('input[name="workEnvironment"]:checked')?.value || null;
  const toolsAvailable = form.querySelector('input[name="toolsAvailable"]:checked')?.value || null;
  const communicationDept = form.querySelector('input[name="communicationDept"]:checked')?.value || null;
  const communicationCompany = form.querySelector('input[name="communicationCompany"]:checked')?.value || null;
  const feedbackValued = form.querySelector('input[name="feedbackValued"]:checked')?.value || null;

  // Section C
  const supervisorApproachable = form.querySelector('input[name="supervisorApproachable"]:checked')?.value || null;
  const managementCommunication = form.querySelector('input[name="managementCommunication"]:checked')?.value || null;
  const managementSupport = form.querySelector('input[name="managementSupport"]:checked')?.value || null;
  const leadershipRating = form.querySelector('input[name="leadershipRating"]:checked')?.value || null;

  // Section D
  const roleSatisfaction = form.querySelector('input[name="roleSatisfaction"]:checked')?.value || null;
  const workloadReasonable = form.querySelector('input[name="workloadReasonable"]:checked')?.value || null;
  const skillsUtilized = form.querySelector('input[name="skillsUtilized"]:checked')?.value || null;
  const careerOpportunities = form.querySelector('input[name="careerOpportunities"]:checked')?.value || null;

  // Section E
  const compensationSatisfaction = form.querySelector('input[name="compensationSatisfaction"]:checked')?.value || null;
  const benefitsSatisfaction = form.querySelector('input[name="benefitsSatisfaction"]:checked')?.value || null;

  // Section F
  const teamwork = form.querySelector('input[name="teamwork"]:checked')?.value || null;
  const fairness = form.querySelector('input[name="fairness"]:checked')?.value || null;
  const motivation = form.querySelector('input[name="motivation"]:checked')?.value || null;

  // Section G (textarea)
  const likesMost = form.querySelector('#likesMost')?.value || null;
  const areasImprovement = form.querySelector('#areasImprovement')?.value || null;
  const managementSuggestions = form.querySelector('#managementSuggestions')?.value || null;

  // Additional
  const signedContract = form.querySelector('input[name="signedContract"]:checked')?.value || null;
  const clearJobDescription = form.querySelector('input[name="clearJobDescription"]:checked')?.value || null;
  const clearKPIs = form.querySelector('input[name="clearKPIs"]:checked')?.value || null;
  const additionalServices = form.querySelector('#additionalServices')?.value || null;

  // Prepare data object
  const feedbackData = {
    hospital,
    hospitalName,
    workDuration,
    employmentStatus,
    employmentOther,
    workEnvironment,
    toolsAvailable,
    communicationDept,
    communicationCompany,
    feedbackValued,
    supervisorApproachable,
    managementCommunication,
    managementSupport,
    leadershipRating,
    roleSatisfaction,
    workloadReasonable,
    skillsUtilized,
    careerOpportunities,
    compensationSatisfaction,
    benefitsSatisfaction,
    teamwork,
    fairness,
    motivation,
    likesMost,
    areasImprovement,
    managementSuggestions,
    signedContract,
    clearJobDescription,
    clearKPIs,
    additionalServices,
    createdAt: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "staffFeedback"), feedbackData);
    statusDiv.textContent = "Feedback submitted successfully!";
    statusDiv.className = "status success";
    form.reset(); // clear form
  } catch (error) {
    console.error("Error submitting feedback:", error);
    statusDiv.textContent = "Failed to submit feedback. Please try again.";
    statusDiv.className = "status error";
  }
});
