//STATE
const state = {
  home: 0,
  away: 0,
  time: 600, // 10 minutes in seconds
  isPaused: false,
  timer: null,
};

// DOM REFERENCES
const homeDisplay = document.getElementById("home-display-text");
const awayDisplay = document.getElementById("away-display-text");
const timerDisplay = document.getElementById("timer");

const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");
const resetButton = document.getElementById("reset");

// RENDER FUNCTION
function render() {
  // Update scores
  homeDisplay.textContent = state.home;
  awayDisplay.textContent = state.away;

  // Update timer
  const minutes = Math.floor(state.time / 60);
  const seconds = state.time % 60;

  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Update leader highlight
  updateLeaderColor();
}

// SCORE UPDATE
function addPoints(team, points) {
  state[team] += points;
  render();
}

// TIMER LOGIC
function startTimer() {
  clearInterval(state.timer);

  state.timer = setInterval(() => {
    if (!state.isPaused && state.time > 0) {
      state.time--;
      render();
    }

    if (state.time === 0) {
      clearInterval(state.timer);
      timerDisplay.style.color = "red";
    }
  }, 1000);
}

// LEADER COLOR (uses CSS class)
function updateLeaderColor() {
  homeDisplay.classList.remove("leading");
  awayDisplay.classList.remove("leading");

  if (state.home > state.away) {
    homeDisplay.classList.add("leading");
  } else if (state.away > state.home) {
    awayDisplay.classList.add("leading");
  }
}

// EVENT DELEGATION (for all score buttons)
document.addEventListener("click", (e) => {
  const btn = e.target;

  if (btn.classList.contains("score-btn")) {
    const team = btn.dataset.team;
    const points = Number(btn.dataset.points);

    addPoints(team, points);
  }
});

// CONTROLS
pauseButton.addEventListener("click", () => {
  state.isPaused = true;
});

resumeButton.addEventListener("click", () => {
  state.isPaused = false;
});

resetButton.addEventListener("click", () => {
  state.home = 0;
  state.away = 0;
  state.time = 600;
  state.isPaused = false;

  timerDisplay.style.color = "white";

  render();
  startTimer();
});

// INIT
render();
startTimer();
