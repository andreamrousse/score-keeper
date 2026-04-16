let teamAScore = 0;
let teamBScore = 0;
const STORAGE_KEY = "scoreKeeperScores";

const teamAScoreNumber = document.getElementById("score-number-a");
const teamBScoreNumber = document.getElementById("score-number-b");

function updateDisplay() {
  teamAScoreNumber.textContent = teamAScore;
  teamBScoreNumber.textContent = teamBScore;
}

function saveScores() {
  const scores = {
    teamAScore,
    teamBScore,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

function loadScores() {
  const storedScores = localStorage.getItem(STORAGE_KEY);
  if (!storedScores) {
    return;
  }

  try {
    const parsedScores = JSON.parse(storedScores);

    if (Number.isFinite(parsedScores.teamAScore)) {
      teamAScore = parsedScores.teamAScore;
    }

    if (Number.isFinite(parsedScores.teamBScore)) {
      teamBScore = parsedScores.teamBScore;
    }
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function incrementTeamA() {
  teamAScore += 1;
  updateDisplay();
  saveScores();
}

function decrementTeamA() {
  teamAScore -= 1;
  updateDisplay();
  saveScores();
}

function incrementTeamB() {
  teamBScore += 1;
  updateDisplay();
  saveScores();
}

function decrementTeamB() {
  teamBScore -= 1;
  updateDisplay();
  saveScores();
}

document.getElementById("plus-button-a").addEventListener("click", incrementTeamA);
document.getElementById("minus-button-a").addEventListener("click", decrementTeamA);
document.getElementById("plus-button-b").addEventListener("click", incrementTeamB);
document.getElementById("minus-button-b").addEventListener("click", decrementTeamB);

loadScores();
updateDisplay();
