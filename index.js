let homeDisplay = document.getElementById("home-display-text");
let awayDisplay = document.getElementById("away-display-text");
let homeButtons = document.querySelectorAll("#home");
let awayButtons = document.querySelectorAll("#away");
let newGame = document.getElementById("reset");
let timerDisplay = document.getElementById("timer");

let timer;

function incrementCount(targetButton, count, display) {
  if (targetButton === "+1") {
    count++;
    display.textContent = count;
  }

  if (targetButton === "+2") {
    count += 2;
    display.textContent = count;
  }

  if (targetButton === "+3") {
    count += 3;
    display.textContent = count;
  }
  updateLeaderColor();
}

function countDown() {
  let totalTime = 720;
  clearInterval(timer); //12mins in seconds

  timer = setInterval(() => {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    let digitalTime = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    timerDisplay.textContent = digitalTime;

    if (totalTime <= 0) {
      clearInterval(timer);
      timerDisplay.textContent = "00:00";
      timerDisplay.style.color = "red";
    }

    totalTime--;
  }, 1000);
}

function updateLeaderColor() {
  if (Number(homeDisplay.textContent) > Number(awayDisplay.textContent)) {
    homeDisplay.style.color = "green";
    awayDisplay.style.color = "red";
  } else if (
    Number(homeDisplay.textContent) < Number(awayDisplay.textContent)
  ) {
    awayDisplay.style.color = "green";
    homeDisplay.style.color = "red";
  } else {
    homeDisplay.style.color = "red";
    awayDisplay.style.color = "red";
  }
}

homeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let targetButton = event.target.textContent;
    let homeCount = Number(homeDisplay.textContent);
    incrementCount(targetButton, homeCount, homeDisplay);
  });
});

awayButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    let targetButton = event.target.textContent;
    let awayCount = Number(awayDisplay.textContent);
    incrementCount(targetButton, awayCount, awayDisplay);
  });
});

newGame.addEventListener("click", () => {
  homeDisplay.textContent = 0;
  awayDisplay.textContent = 0;
  timerDisplay.textContent = "12:00";
  updateLeaderColor();
  countDown();
});
