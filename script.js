var form = document.getElementById("resume-form");
var resumeDiv = document.getElementById("resume");
var editButton = document.getElementById("edit-resume-btn");
var saveButton = document.getElementById("save-resume-btn");
var resumeData;
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(form);
    // Extract data from the form
    resumeData = {
        personalInfo: {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
        },
        education: {
            school: formData.get("school"),
            degree: formData.get("degree"),
            gradYear: parseInt(formData.get("grad-year")),
        },
        workExperience: {
            company: formData.get("company"),
            position: formData.get("position"),
            years: parseInt(formData.get("years")),
        },
        skills: formData.get("skills").split(",").map(function (skill) { return skill.trim(); }),
    };
    // Generate resume HTML
    generateResumeHTML();
    // Show the edit button
    editButton.style.display = "inline";
});
editButton.addEventListener("click", function () {
    switchToEditMode();
});
saveButton.addEventListener("click", function () {
    saveChanges();
    generateResumeHTML(); // Re-render the updated resume
    switchToViewMode();
});
function generateResumeHTML() {
    var resumeHTML = "\n        <h3>".concat(resumeData.personalInfo.name, "</h3>\n        <p>Email: ").concat(resumeData.personalInfo.email, "</p>\n        <p>Phone: ").concat(resumeData.personalInfo.phone, "</p>\n\n        <h4>Education</h4>\n        <p>").concat(resumeData.education.degree, " from ").concat(resumeData.education.school, ", ").concat(resumeData.education.gradYear, "</p>\n\n        <h4>Work Experience</h4>\n        <p>").concat(resumeData.workExperience.position, " at ").concat(resumeData.workExperience.company, " (").concat(resumeData.workExperience.years, " years)</p>\n\n        <h4>Skills</h4>\n        <ul>\n            ").concat(resumeData.skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(""), "\n        </ul>\n    ");
    resumeDiv.innerHTML = resumeHTML;
}
function switchToEditMode() {
    resumeDiv.innerHTML = "\n        <h3><input type=\"text\" id=\"edit-name\" value=\"".concat(resumeData.personalInfo.name, "\"></h3>\n        <p>Email: <input type=\"email\" id=\"edit-email\" value=\"").concat(resumeData.personalInfo.email, "\"></p>\n        <p>Phone: <input type=\"text\" id=\"edit-phone\" value=\"").concat(resumeData.personalInfo.phone, "\"></p>\n\n        <h4>Education</h4>\n        <p>\n            <input type=\"text\" id=\"edit-degree\" value=\"").concat(resumeData.education.degree, "\"> from \n            <input type=\"text\" id=\"edit-school\" value=\"").concat(resumeData.education.school, "\">,\n            <input type=\"number\" id=\"edit-grad-year\" value=\"").concat(resumeData.education.gradYear, "\">\n        </p>\n\n        <h4>Work Experience</h4>\n        <p>\n            <input type=\"text\" id=\"edit-position\" value=\"").concat(resumeData.workExperience.position, "\"> at\n            <input type=\"text\" id=\"edit-company\" value=\"").concat(resumeData.workExperience.company, "\"> \n            (<input type=\"number\" id=\"edit-years\" value=\"").concat(resumeData.workExperience.years, "\"> years)\n        </p>\n\n        <h4>Skills</h4>\n        <input type=\"text\" id=\"edit-skills\" value=\"").concat(resumeData.skills.join(", "), "\">\n    ");
    // Show the save button, hide the edit button
    editButton.style.display = "none";
    saveButton.style.display = "inline";
}
function switchToViewMode() {
    // Hide the save button, show the edit button
    editButton.style.display = "inline";
    saveButton.style.display = "none";
}
function saveChanges() {
    // Capture the updated information from the edit fields
    resumeData.personalInfo.name = document.getElementById("edit-name").value;
    resumeData.personalInfo.email = document.getElementById("edit-email").value;
    resumeData.personalInfo.phone = document.getElementById("edit-phone").value;
    resumeData.education.degree = document.getElementById("edit-degree").value;
    resumeData.education.school = document.getElementById("edit-school").value;
    resumeData.education.gradYear = parseInt(document.getElementById("edit-grad-year").value);
    resumeData.workExperience.position = document.getElementById("edit-position").value;
    resumeData.workExperience.company = document.getElementById("edit-company").value;
    resumeData.workExperience.years = parseInt(document.getElementById("edit-years").value);
    resumeData.skills = document.getElementById("edit-skills").value.split(",").map(function (skill) { return skill.trim(); });
}
