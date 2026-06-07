const STORAGE_KEY = "examQuizBuilderStatic";

const exampleQuiz = {
  title: "Year 6 Grammar Test",
  description: "A calm revision quiz to practise grammar before next week's exam.",
  questions: [
    {
      id: crypto.randomUUID(),
      text: "Which word is the noun in this sentence: The dog barked loudly?",
      options: ["dog", "barked", "loudly", "the"],
      correctIndex: 0,
      explanation: "A noun names a person, place, thing, or animal. Dog is an animal."
    },
    {
      id: crypto.randomUUID(),
      text: "Which word is the verb in this sentence: Sarah jumped over the rope?",
      options: ["Sarah", "jumped", "rope", "over"],
      correctIndex: 1,
      explanation: "A verb is an action word. Jumped is the action."
    },
    {
      id: crypto.randomUUID(),
      text: "Choose the adjective: The bright sun warmed the garden.",
      options: ["sun", "warmed", "bright", "garden"],
      correctIndex: 2,
      explanation: "An adjective describes a noun. Bright describes the sun."
    },
    {
      id: crypto.randomUUID(),
      text: "Choose the adverb: Tom ran quickly to school.",
      options: ["Tom", "ran", "quickly", "school"],
      correctIndex: 2,
      explanation: "An adverb often describes how an action happens. Quickly describes how Tom ran."
    },
    {
      id: crypto.randomUUID(),
      text: "Which sentence has the correct punctuation?",
      options: ["where are you going", "Where are you going?", "Where are you going.", "where are you going!"],
      correctIndex: 1,
      explanation: "A question starts with a capital letter and ends with a question mark."
    },
    {
      id: crypto.randomUUID(),
      text: "Which sentence is in the past tense?",
      options: ["I walk to school.", "I will walk to school.", "I walked to school.", "I am walking to school."],
      correctIndex: 2,
      explanation: "Walked shows that the action happened in the past."
    },
    {
      id: crypto.randomUUID(),
      text: "Choose the correct subject-verb agreement: The children ____ in the playground.",
      options: ["plays", "play", "playing", "is play"],
      correctIndex: 1,
      explanation: "Children is plural, so the correct verb is play."
    },
    {
      id: crypto.randomUUID(),
      text: "Which pronoun can replace 'Lucy' in this sentence: Lucy is reading a book?",
      options: ["He", "They", "She", "It"],
      correctIndex: 2,
      explanation: "She is the pronoun used to replace Lucy."
    },
    {
      id: crypto.randomUUID(),
      text: "Choose the conjunction: I wanted to play, but it was raining.",
      options: ["wanted", "play", "but", "raining"],
      correctIndex: 2,
      explanation: "But is a conjunction because it joins ideas."
    },
    {
      id: crypto.randomUUID(),
      text: "What type of sentence is this: Please close the door.",
      options: ["Question", "Command", "Exclamation", "Statement"],
      correctIndex: 1,
      explanation: "A command tells someone to do something."
    }
  ]
};

let state = loadState();
let quizQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

const screens = document.querySelectorAll(".screen");
const tabs = document.querySelectorAll(".tab");
const titleInput = document.getElementById("quiz-title");
const descriptionInput = document.getElementById("quiz-description");
const questionsList = document.getElementById("questions-list");
const builderMessage = document.getElementById("builder-message");
const questionCount = document.getElementById("question-count");

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(exampleQuiz);
  try {
    return JSON.parse(saved);
  } catch {
    return structuredClone(exampleQuiz);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.screen === id));
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => showScreen(tab.dataset.screen));
});

function renderBuilder() {
  titleInput.value = state.title;
  descriptionInput.value = state.description;
  const count = state.questions.length;
  questionCount.textContent = count;
  builderMessage.textContent = count === 0
    ? "Add at least 1 question to start the quiz."
    : `${count} question${count > 1 ? "s" : ""} ready — the quiz will use all of them.`;
  document.getElementById("start-quiz").textContent = count > 0
    ? `Start ${count}-question quiz`
    : "Start quiz";

  questionsList.innerHTML = "";
  state.questions.forEach((question, index) => {
    const item = document.createElement("article");
    item.className = "question-item";
    item.innerHTML = `
      <div class="question-item-header">
        <div>
          <strong>${index + 1}. ${escapeHtml(question.text)}</strong>
          <p>Correct answer: ${escapeHtml(question.options[question.correctIndex])}</p>
        </div>
        <div class="small-actions">
          <button data-edit="${question.id}">Edit</button>
          <button data-delete="${question.id}">Delete</button>
        </div>
      </div>
    `;
    questionsList.appendChild(item);
  });

  document.querySelectorAll("[data-edit]").forEach(button => {
    button.addEventListener("click", () => fillForm(button.dataset.edit));
  });
  document.querySelectorAll("[data-delete]").forEach(button => {
    button.addEventListener("click", () => deleteQuestion(button.dataset.delete));
  });
}

function syncMeta() {
  state.title = titleInput.value.trim() || "Untitled quiz";
  state.description = descriptionInput.value.trim();
  saveState();
}

titleInput.addEventListener("input", syncMeta);
descriptionInput.addEventListener("input", syncMeta);

function fillForm(id) {
  const question = state.questions.find(q => q.id === id);
  if (!question) return;
  document.getElementById("editing-id").value = question.id;
  document.getElementById("question-text").value = question.text;
  document.querySelectorAll(".answer-input").forEach(input => {
    input.value = question.options[Number(input.dataset.index)] || "";
  });
  document.getElementById("correct-answer").value = String(question.correctIndex);
  document.getElementById("explanation").value = question.explanation || "";
  window.scrollTo({ top: 380, behavior: "smooth" });
}

function clearQuestionForm() {
  document.getElementById("editing-id").value = "";
  document.getElementById("question-text").value = "";
  document.querySelectorAll(".answer-input").forEach(input => input.value = "");
  document.getElementById("correct-answer").value = "0";
  document.getElementById("explanation").value = "";
}

function saveQuestion() {
  const id = document.getElementById("editing-id").value;
  const text = document.getElementById("question-text").value.trim();
  const options = [...document.querySelectorAll(".answer-input")].map(input => input.value.trim());
  const correctIndex = Number(document.getElementById("correct-answer").value);
  const explanation = document.getElementById("explanation").value.trim();

  if (!text || options.some(option => !option)) {
    alert("Please add a question and all 4 answers.");
    return;
  }

  const payload = { id: id || crypto.randomUUID(), text, options, correctIndex, explanation };
  if (id) {
    state.questions = state.questions.map(q => q.id === id ? payload : q);
  } else {
    state.questions.push(payload);
  }

  saveState();
  clearQuestionForm();
  renderBuilder();
}

function deleteQuestion(id) {
  state.questions = state.questions.filter(q => q.id !== id);
  saveState();
  renderBuilder();
}

document.getElementById("file-import").addEventListener("change", handleFileImport);
document.getElementById("download-template").addEventListener("click", downloadTemplate);
document.getElementById("save-question").addEventListener("click", saveQuestion);
document.getElementById("clear-form").addEventListener("click", clearQuestionForm);
document.getElementById("reset-example").addEventListener("click", () => {
  if (!confirm("Reload the example quiz? This will replace your current questions.")) return;
  state = structuredClone(exampleQuiz);
  saveState();
  clearQuestionForm();
  renderBuilder();
});

document.getElementById("start-quiz").addEventListener("click", startQuiz);

document.getElementById("previous-question").addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuiz();
  }
});

document.getElementById("next-question").addEventListener("click", () => {
  if (userAnswers[currentQuestionIndex] === undefined) {
    alert("Please choose an answer before continuing.");
    return;
  }
  if (currentQuestionIndex === quizQuestions.length - 1) {
    renderResults();
    showScreen("results-screen");
  } else {
    currentQuestionIndex++;
    renderQuiz();
  }
});

document.getElementById("try-again").addEventListener("click", startQuiz);
document.getElementById("back-builder").addEventListener("click", () => showScreen("builder-screen"));
document.getElementById("download-pdf").addEventListener("click", downloadPdf);

function startQuiz() {
  syncMeta();
  if (state.questions.length === 0) {
    alert("Please add at least 1 question before starting the quiz.");
    return;
  }
  quizQuestions = [...state.questions];
  currentQuestionIndex = 0;
  userAnswers = Array(quizQuestions.length).fill(undefined);
  renderQuiz();
  showScreen("quiz-screen");
}

function renderQuiz() {
  const total = quizQuestions.length;
  const question = quizQuestions[currentQuestionIndex];
  document.getElementById("progress-text").textContent = `Question ${currentQuestionIndex + 1} of ${total}`;
  document.getElementById("progress-fill").style.width = `${((currentQuestionIndex + 1) / total) * 100}%`;
  document.getElementById("motivation-text").textContent = getMotivation(currentQuestionIndex, total);
  document.getElementById("current-question").textContent = question.text;
  document.getElementById("previous-question").disabled = currentQuestionIndex === 0;
  document.getElementById("next-question").textContent = currentQuestionIndex === total - 1 ? "See my grade" : "Next";

  const options = document.getElementById("answer-options");
  options.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-option" + (userAnswers[currentQuestionIndex] === index ? " selected" : "");
    button.textContent = option;
    button.addEventListener("click", () => {
      userAnswers[currentQuestionIndex] = index;
      renderQuiz();
    });
    options.appendChild(button);
  });
}

function getMotivation(index, total) {
  if (index === total - 1) return "Last question. Finish strong.";
  if (index === 0) return "Take your time. You can do this.";
  const ratio = index / (total - 1);
  if (ratio < 0.25) return "One question at a time.";
  if (ratio < 0.5) return "Stay calm and read carefully.";
  if (ratio < 0.6) return "You are halfway there. Keep going.";
  if (ratio < 0.75) return "Good effort. Keep breathing.";
  return "Almost there.";
}

function getScore() {
  return quizQuestions.reduce((score, question, index) => {
    return score + (userAnswers[index] === question.correctIndex ? 1 : 0);
  }, 0);
}

function renderResults() {
  const total = quizQuestions.length;
  const score = getScore();
  const percentage = Math.round((score / total) * 100);
  document.getElementById("final-score").textContent = `Your score: ${score}/${total}`;
  document.getElementById("percentage-grade").textContent = `${percentage}%`;
  document.getElementById("correct-count").textContent = `${score} correct`;
  document.getElementById("wrong-count").textContent = `${total - score} wrong`;
  document.getElementById("final-message").textContent = percentage >= 80
    ? "Excellent work. You are building strong confidence."
    : percentage >= 50
      ? "Good effort. Review the corrections and try once more."
      : "Keep practising. Every try helps you improve.";

  const list = document.getElementById("correction-list");
  list.innerHTML = "";
  quizQuestions.forEach((question, index) => {
    const correct = userAnswers[index] === question.correctIndex;
    const item = document.createElement("article");
    item.className = "correction-item";
    item.innerHTML = `
      <strong>${index + 1}. ${escapeHtml(question.text)}</strong>
      <p>Your answer: ${escapeHtml(question.options[userAnswers[index]] || "No answer")}</p>
      <p>Correct answer: ${escapeHtml(question.options[question.correctIndex])}</p>
      <p>Status: <span class="${correct ? "badge-correct" : "badge-wrong"}">${correct ? "Correct" : "Wrong"}</span></p>
      ${question.explanation ? `<p>Explanation: ${escapeHtml(question.explanation)}</p>` : ""}
    `;
    list.appendChild(item);
  });
}

function downloadPdf() {
  if (!window.jspdf) {
    alert("PDF library could not load. Please check your internet connection and try again.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const score = getScore();
  const total = quizQuestions.length;
  const percentage = Math.round((score / total) * 100);
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(state.title || "Quiz summary", 14, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, y);
  y += 7;
  doc.text(`Final grade: ${score}/${total} (${percentage}%)`, 14, y);
  y += 12;

  quizQuestions.forEach((question, index) => {
    const correct = userAnswers[index] === question.correctIndex;
    const lines = [
      `${index + 1}. ${question.text}`,
      `Your answer: ${question.options[userAnswers[index]] || "No answer"}`,
      `Correct answer: ${question.options[question.correctIndex]}`,
      `Status: ${correct ? "Correct" : "Wrong"}`,
      question.explanation ? `Explanation: ${question.explanation}` : ""
    ].filter(Boolean);

    lines.forEach(line => {
      const wrapped = doc.splitTextToSize(line, pageWidth - 28);
      if (y + wrapped.length * 6 > 280) {
        doc.addPage();
        y = 18;
      }
      doc.text(wrapped, 14, y);
      y += wrapped.length * 6;
    });
    y += 4;
  });

  doc.save(`${safeFileName(state.title || "quiz-summary")}.pdf`);
}

function handleFileImport(event) {
  const file = event.target.files[0];
  if (!file) return;
  const feedback = document.getElementById("import-feedback");
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      const imported = parseImportedQuiz(parsed);
      state = imported;
      saveState();
      clearQuestionForm();
      renderBuilder();
      showImportFeedback(`✓ Loaded "${state.title}" — ${state.questions.length} question${state.questions.length > 1 ? "s" : ""} imported.`, "success");
    } catch (err) {
      showImportFeedback(`✗ Invalid file: ${err.message}`, "error");
    }
    event.target.value = "";
  };
  reader.readAsText(file);
}

function parseImportedQuiz(data) {
  if (typeof data !== "object" || data === null) throw new Error("File must be a JSON object.");

  const title = typeof data.title === "string" && data.title.trim() ? data.title.trim() : "Imported quiz";
  const description = typeof data.description === "string" ? data.description.trim() : "";

  if (!Array.isArray(data.questions) || data.questions.length === 0) {
    throw new Error("File must contain a non-empty \"questions\" array.");
  }

  const questions = data.questions.map((q, i) => {
    if (typeof q.question !== "string" || !q.question.trim()) throw new Error(`Question ${i + 1}: missing "question" text.`);
    if (!Array.isArray(q.answers) || q.answers.length < 2) throw new Error(`Question ${i + 1}: "answers" must be an array with at least 2 items.`);
    if (q.answers.some(a => typeof a !== "string" || !a.trim())) throw new Error(`Question ${i + 1}: all answers must be non-empty strings.`);
    const correct = Number(q.correct);
    if (!Number.isInteger(correct) || correct < 0 || correct >= q.answers.length) {
      throw new Error(`Question ${i + 1}: "correct" must be a valid answer index (0 to ${q.answers.length - 1}).`);
    }
    return {
      id: crypto.randomUUID(),
      text: q.question.trim(),
      options: q.answers.map(a => a.trim()),
      correctIndex: correct,
      explanation: typeof q.explanation === "string" ? q.explanation.trim() : ""
    };
  });

  return { title, description, questions };
}

function showImportFeedback(message, type) {
  const el = document.getElementById("import-feedback");
  el.textContent = message;
  el.className = `import-feedback import-feedback--${type}`;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 5000);
}

function downloadTemplate() {
  const template = {
    title: "My quiz title",
    description: "A short description of this quiz.",
    questions: [
      {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2,
        explanation: "Paris is the capital and largest city of France."
      },
      {
        question: "Which planet is closest to the Sun?",
        answers: ["Venus", "Mercury", "Earth", "Mars"],
        correct: 1,
        explanation: "Mercury is the closest planet to the Sun."
      }
    ]
  };
  const blob = new Blob([JSON.stringify(template, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quiz-template.json";
  a.click();
  URL.revokeObjectURL(url);
}

function safeFileName(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

renderBuilder();
