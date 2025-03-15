const allSkills = [
    "Java", "JavaScript", "Python", "React", "Node.js", "HTML", "CSS", 
    "SQL", "MongoDB", "Angular", "Vue.js", "TypeScript", "C++", "C#", 
    "PHP", "Ruby", "Swift", "Kotlin", "Go", "Rust"
  ];

  const skillsInput = document.getElementById("skills");
  const skillSuggestions = document.getElementById("skillSuggestions");


  skillsInput.addEventListener("input", (e) => {
    const inputText = e.target.value.toLowerCase();
    const filteredSkills = allSkills.filter((skill) =>
      skill.toLowerCase().includes(inputText)
    );

    if (inputText && filteredSkills.length > 0) {
      skillSuggestions.innerHTML = filteredSkills
        .map((skill) => `<div class="skill-suggestion">${skill}</div>`)
        .join("");
      skillSuggestions.style.display = "block";
    } else {
      skillSuggestions.style.display = "none";
    }
  });

  skillSuggestions.addEventListener("click", (e) => {
    if (e.target.classList.contains("skill-suggestion")) {
      skillsInput.value = e.target.textContent;
      skillSuggestions.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (!skillsInput.contains(e.target) && !skillSuggestions.contains(e.target)) {
      skillSuggestions.style.display = "none";
    }
  });