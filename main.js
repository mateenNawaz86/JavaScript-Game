var roundScore, activePlayer, scores, gamePlaying;
init();

var lastDice;
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // Random Score
    var dice1 = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);

    // Create Random Dice
    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "/img/dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "/img/dice-" + dice2 + ".png";

    // Update the score IF scrolled NOT equal to 1
    if (dice1 !== 1 && dice2 !== 1) {
      // add score to the current element
      roundScore += dice1 + dice2;
      document.getElementById("current-" + activePlayer).textContent =
        roundScore;
    } else {
      // next Player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1);
  roundScore = 0;

  document.getElementById("current-0").innerHTML = "0";
  document.getElementById("current-1").innerHTML = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";
}

document.querySelector(".btn-hold").addEventListener("click", function () {
  // add the current score to the Global score
  if (gamePlaying) {
    scores[activePlayer] += roundScore;

    // Update the UI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    var inp = document.querySelector(".final-score").value;
    var winningScore;

    if (inp) {
      winningScore = inp;
    } else {
      winningScore = 40;
    }

    // IF player reaches the global score = 100 then the activePlayer win the game
    if (scores[activePlayer] >= winningScore) {
      document.getElementById("name-" + activePlayer).textContent = "Winner";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document.getElementById("dice-1").style.display = "none";
      document.getElementById("dice-2").style.display = "none";
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById("dice-1").style.display = "none";
  document.getElementById("dice-2").style.display = "none";

  document.getElementById("score-0").innerHTML = "0";
  document.getElementById("score-1").innerHTML = "0";
  document.getElementById("current-0").innerHTML = "0";
  document.getElementById("current-1").innerHTML = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
