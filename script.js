// ---------- LIVE PREVIEW FUNCTION ----------
function updatePreview() {
  document.getElementById("p-name").innerText =
    document.getElementById("name").value || "Your Name";
  document.getElementById("p-title").innerText =
    document.getElementById("title").value || "Your Job Title";
  document.getElementById("p-email").innerText =
    document.getElementById("email").value || "email@example.com";
  document.getElementById("p-phone").innerText =
    document.getElementById("phone").value || "1234567890";
  document.getElementById("p-address").innerText =
    document.getElementById("address").value || "Your Address";

  document.getElementById("p-education").innerText =
    document.getElementById("education").value ||
    "Your education details will appear here...";

  // Skills → convert comma text to bullet list
  const skillsText = document.getElementById("skills").value.trim();
  const skillsList = document.getElementById("p-skills");
  skillsList.innerHTML = "";

  if (skillsText) {
    skillsText.split(",").forEach((skill) => {
      const li = document.createElement("li");
      li.innerText = skill.trim();
      skillsList.appendChild(li);
    });
  } else {
    skillsList.innerHTML = "<li>Skills will appear here...</li>";
  }

  document.getElementById("p-experience").innerText =
    document.getElementById("experience").value ||
    "Your experience will appear here...";

  document.getElementById("p-certifications").innerText =
    document.getElementById("certifications").value ||
    "Certifications will appear here...";
}

// ---------- INPUT EVENT LISTENER ----------
document.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("input", updatePreview);
});

// ---------- BASIC VALIDATION ----------
document.getElementById("phone").addEventListener("input", function () {
  // Keep regex here — replaceAll does not support regex
  this.value = this.value.replace(/\D/g, "");
});

// ---------- PDF DOWNLOAD ----------
document.getElementById("downloadBtn").addEventListener("click", () => {
  const resume = document.getElementById("resume");

  // ✅ Use replaceAll for spaces in filename
  const filename =
  (document.getElementById("name").value || "My Resume")
    .replaceAll(" ", "_")   // ✅ SonarLint-friendly
    .toLowerCase() + ".pdf";

  const options = {
    margin: 0.5,
    filename: filename,
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().from(resume).set(options).save();
});