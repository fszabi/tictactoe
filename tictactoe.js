const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status-text");
const restartBtn = document.querySelector(".btn--restart");

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let running = false;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartBtn.addEventListener("click", restartGame);
  statusText.innerText = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (options[cellIndex] !== "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.innerText = currentPlayer;
  cell.style.opacity = 1;

  if (currentPlayer === "X") {
    cell.style.backgroundColor = "#00ff00";
  } else {
    cell.style.backgroundColor = "#00ffff";
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if (cellA === "" || cellB === "" || cellC === "") {
      continue;
    }

    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.innerText = `${currentPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.innerText = `Draw!`;
    running = false;
  } else {
    changePlayer();
  }
}

let intervalId;

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.innerText = `${currentPlayer}'s turn`;
  cells.forEach((cell) => {
    cell.style.opacity = "0";
    intervalId = setTimeout(() => {
      cell.innerText = "";
    }, 250);
    cell.style.backgroundColor = "#707070";
  });
  running = true;
}
