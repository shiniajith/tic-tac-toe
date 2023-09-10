const gamestate = {
  currentPlayer: "X",
  gridItems: new Array(9).fill(null),
  winningCombinations: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [0, 4, 8],
    [2, 5, 8],
  ],
};

// function to find winner
const winner = (grItems, winComb) => {
  var winStatus = false;
  loop1: for (let i = 0; i < winComb.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (
        grItems[winComb[i][j]] !== null &&
        grItems[winComb[i][0]] === grItems[winComb[i][1]] &&
        grItems[winComb[i][1]] === grItems[winComb[i][2]]
      ) {
        winStatus = true;
        break loop1;
      }
    }
  }
  return winStatus;
};
// function to update the grid items
function updateGrid() {
  document.querySelectorAll(".grid-item").forEach((elm, index) => {
    elm.textContent = gamestate.gridItems[index];
  });
}
//function to update status
function updateUIstatus() {
  document.querySelector(
    "#player-identifier"
  ).innerHTML = ` Current Player: ${gamestate.currentPlayer}`;
  const won = winner(gamestate.gridItems, gamestate.winningCombinations);
  if (won) {
    document.querySelector("#winner").style.display = "block";
    document.querySelector(
      "#winner"
    ).textContent = `HOORAY! "${gamestate.currentPlayer}" has WON`;
    return;
  } else {
    document.querySelector("#winner").style.display = "none";
  }
  const gameOver = gamestate.gridItems.every((item) => item !== null);
  if (gameOver) {
    document.querySelector("#winner").style.display = "block";
    document.querySelector("#winner").textContent =
      "No winner this time, restart the game";
  }
}

function updateUI() {
  updateGrid();
  updateUIstatus();
}

//function to update the griditems array and update game status
function gridEventHandler(e) {
  const won = winner(gamestate.gridItems, gamestate.winningCombinations);
  if (won) {
    return;
  }
  const target = e.target.closest(".grid-item");
  if (target) {
    const gridIndex = parseInt(target.dataset.gridIndex);
    if (gamestate.gridItems[gridIndex] !== null) {
      return;
    }
    gamestate.gridItems[gridIndex] = gamestate.currentPlayer;

    const isWinner = winner(gamestate.gridItems, gamestate.winningCombinations);
    if (!isWinner) {
      gamestate.currentPlayer = gamestate.currentPlayer === "X" ? "O" : "X";
    }
  }

  updateUI();
}
//FUNCTION TO RESTART THE GAME
function restartGame() {
  gamestate.currentPlayer = "X";
  gamestate.gridItems = new Array(9).fill(null);
  updateUI();
}

document.querySelector("#grid-box").addEventListener("click", gridEventHandler);
document.querySelector("#restartButton").addEventListener("click", restartGame);
updateUI();
