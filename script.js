let teamAScore = 0;
let teamBScore = 0;
const STORAGE_KEY = "scoreKeeperScores";

const teamAScoreNumber = document.getElementById("score-number-a");
const teamBScoreNumber = document.getElementById("score-number-b");
const minusButtonA = document.getElementById("minus-button-a");
const minusButtonB = document.getElementById("minus-button-b");

function updateDisplay() {
  teamAScoreNumber.textContent = teamAScore;
  teamBScoreNumber.textContent = teamBScore;
  minusButtonA.disabled = teamAScore === 0;
  minusButtonB.disabled = teamBScore === 0;
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
      teamAScore = Math.max(0, parsedScores.teamAScore);
    }

    if (Number.isFinite(parsedScores.teamBScore)) {
      teamBScore = Math.max(0, parsedScores.teamBScore);
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
  teamAScore = Math.max(0, teamAScore - 1);
  updateDisplay();
  saveScores();
}

function incrementTeamB() {
  teamBScore += 1;
  updateDisplay();
  saveScores();
}

function decrementTeamB() {
  teamBScore = Math.max(0, teamBScore - 1);
  updateDisplay();
  saveScores();
}

function resetTeamA() {
  teamAScore = 0;
  updateDisplay();
  saveScores();
}

function resetTeamB() {
  teamBScore = 0;
  updateDisplay();
  saveScores();
}

document.getElementById("plus-button-a").addEventListener("click", incrementTeamA);
minusButtonA.addEventListener("click", decrementTeamA);
document.getElementById("plus-button-b").addEventListener("click", incrementTeamB);
minusButtonB.addEventListener("click", decrementTeamB);

document.getElementById("reset-button-a").addEventListener("click", resetTeamA);
document.getElementById("reset-button-b").addEventListener("click", resetTeamB);

loadScores();
updateDisplay();
