let secretNumber = Math.trunc(20 * Math.random() + 1);
let highscore = { score: 0, time: "N/A" }; // Initialize highscore as an object
let time = [0, 0];
let timer = null;
let gameActive = true;

document.querySelector('.again').addEventListener('click', function () {
  time = [0, 0];
  secretNumber = Math.trunc(20 * Math.random() + 1);
  document.querySelector('.score').textContent = '20';
  document.querySelector('.guess').value = '';
  document.getElementById('timer').innerHTML = '';
  document.querySelector('.check').style.backgroundColor = '#f1356d';
  document.querySelector("body").style.backgroundColor = 'white';
  document.querySelector('.number').textContent = '?';
  clearInterval(timer);
  gameActive = true;
  document.querySelector('.guess').disabled = false;
  document.querySelector('.check').disabled = false;
});

document.querySelector('.check').addEventListener('click', function () {
  if (!gameActive) return;

  clearInterval(timer);

  let guess = parseInt(document.querySelector('.guess').value);

  timer = setInterval(() => {
    time[1]++;
    if (time[1] % 60 === 0) {
      time[0]++;
    }
    document.getElementById('timer').innerHTML = `${time[0]} : ${time[1]}`;
  }, 1000);

  this.style.backgroundColor = 'black';

  if (!guess || isNaN(guess)) {
    document.querySelector(".message").textContent = "Not a valid input";
  } else if (guess === secretNumber) {
    document.querySelector(".message").textContent = "You guessed it right!";
    document.querySelector('.number').style.width = '30rem';
    document.querySelector("body").style.backgroundColor = 'green';
    document.querySelector('.number').textContent = secretNumber;
    
    // Calculate the total time in seconds
    const totalTimeInSeconds = time[0] * 60 + time[1];
    
    // Check if the current score and time beat the previous highscore
    if (
      highscore.score < document.querySelector('.score').textContent ||
      (highscore.score === document.querySelector('.score').textContent &&
        totalTimeInSeconds < highscore.time)
    ) {
      highscore.score = document.querySelector('.score').textContent;
      highscore.time = totalTimeInSeconds;
    }

    document.querySelector('.highscore').textContent = `${highscore.score} (${formatTime(highscore.time)})`;
    clearInterval(timer);
    gameActive = false;
    document.querySelector('.guess').disabled = true;
    document.querySelector('.check').disabled = true;
  } else if (guess > secretNumber) {
    document.querySelector(".message").textContent = "Too high";
    document.querySelector('.score').textContent--;
  } else {
    document.querySelector(".message").textContent = "Too low";
    document.querySelector('.score').textContent--;
  }

  if (parseInt(document.querySelector('.score').textContent) === 0) {
    document.querySelector(".message").textContent = "You lost the game";
    clearInterval(timer);
    document.getElementById('timer').innerHTML = '';
    document.getElementById('hiddenResult').textContent = secretNumber;
    this.style.backgroundColor = '#f1356d';
    document.querySelector("body").style.backgroundColor = 'red';
    gameActive = false;
    document.querySelector('.guess').disabled = true;
    document.querySelector('.check').disabled = true;
  }
});

// Helper function to format time in MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}