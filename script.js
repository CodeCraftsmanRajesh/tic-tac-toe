const board = document.querySelector('.board');
const message = document.querySelector('.message');
const newGameButton = document.getElementById('new-game');
const cells = [];

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to check for a win or draw
function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            message.textContent = `${currentPlayer} wins!`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        message.textContent = 'It\'s a draw!';
    }
}

// Function to handle cell click
function cellClick(index) {
    if (gameBoard[index] || !gameActive) return;

    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to start a new game
function newGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    message.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

// Create the game board cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => cellClick(i));
    cells.push(cell);
    board.appendChild(cell);
}

// Add event listener to the new game button
newGameButton.addEventListener('click', newGame);

// Start a new game when the page loads
newGame();
