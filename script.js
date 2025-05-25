function Gameboard() {
    // holds each cell in the board    
    let cell = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    //function to display the board
    function displayBoard(index) {
        const cellElement = document.getElementById(`cell${index}`);
        // cellElement.textContent = `${cell[index - 1]}`;
        cellElement.textContent = cell[index - 1];
    }

    // update the board
    function updateBoard(index, marker) {
        return cell[index - 1] = marker;
    }
    return { cell, displayBoard, updateBoard };
}

// function to create players
function Player(name, marker) {
    return { name, marker };
}

function GameController() {
    // create an instance of the gameboard
    const board = Gameboard();

    // local variables
    let count = 1;
    let input;

    let player1, player2, activePlayer;
    let gameActive = true;

    function initializePlayers() {
        const name1 = document.getElementById("player1Name").value || "Player 1";
        const name2 = document.getElementById("player2Name").value || "Player 2";
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");
        activePlayer = player1;
        gameActive = true;
        playGame();
        document.getElementById("inputForm").style.display = "none";
    }

    //DOM variables
    let turnInfo = document.getElementById("turnInfo");
    let winnerInfo = document.getElementById("game-message");

    // function to switch turns
    const switchPlayerTurn = () => {
        return activePlayer = activePlayer === player1 ? player2 : player1;
    }

    // getters / setters / private variables
    const getCount = () => count;
    const setCount = (num) => count = num;
    const incrementCount = () => count++;
    const getActivePlayer = () => activePlayer;
    const getInput = () => input;

    // show messages for validations and results
    const showValidInputMessage = () => console.log(`${getActivePlayer().name} put an ${getActivePlayer().marker} in cell ${board.cell[input - 1]}`);

    const showDrawMessage = () => winnerInfo.textContent = "Game is draw!";
    const showInvalidInputMessage = () => console.log("Invalid input. Please try again.");
    const showCellNotEmptyMessage = () => console.log("That cell is not empty, please choose again!");

    // validations and check for draw
    function isInputValid(input) {
        return board.cell.includes(input);
    }
    function isCellEmpty(input) {
        return board.cell[input - 1] !== "X" && board.cell[input - 1] !== "O";
    }
    function draw() {
        return (getCount() == 10 && !checkWinner());
    }


    // call this function when the user click on an empty cell
    function putMark(index) {
        input = index;
        console.log("You are in putMark function!");
        if (isCellEmpty(input) && gameActive) {
            if (isInputValid(input)) {
                showValidInputMessage();
                board.updateBoard(board.cell[input - 1], getActivePlayer().marker);
                board.displayBoard(input);
                if (checkWinner()) {
                    gameActive = false;
                    console.log("Game over!");
                    setMessage(turnInfo, "Game over!");
                    displayWinner();
                    // resetGame();
                } else {
                    switchPlayerTurn();
                    displayTurn();
                    incrementCount();
                }
                if (draw()) {
                    setMessage(turnInfo, "Game over!");
                    showDrawMessage();
                    console.log("Game is draw!");

                }
            } else { showInvalidInputMessage(); }
        } else { showCellNotEmptyMessage(); }
    }

    function checkWinner() {
        let position1, position2, position3;
        const WIN_COMBOS = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [6, 4, 2]];

        return WIN_COMBOS.find(win_combo => {
            // const [a, b, c] = win_combo;
            return board.cell[win_combo[0]] === getActivePlayer().marker &&
                board.cell[win_combo[1]] === getActivePlayer().marker &&
                board.cell[win_combo[2]] === getActivePlayer().marker;
        });
    }

    // this handles the click event when putting a mark in a cell
    function playGame() {
        for (let i = 0; i < 9; i++) {
            const cellElement = document.getElementById(`cell${i + 1}`);
            cellElement.addEventListener("click", () => putMark(i + 1));
            displayTurn();
        }
    }

    // starts the game when start button is clicked
    function initializeGame() {

        /* for (let i = 0; i < 9; i++) {
            board.displayBoard(i + 1);
        } */
        const startBtn = document.getElementById("start");
        startBtn.addEventListener("click", initializePlayers);

        const restartBtn = document.getElementById("restartBtn");
        restartBtn.addEventListener("click", resetGame);
    }

    function resetBoard() {
        for (let i = 0; i < 9; i++) {
            board.cell[i] = i + 1;
        }
        return board.cell;
    }

    function resetGame() {
        setCount(1);
        resetBoard();
        gameActive = true;
        activePlayer = player2;
        displayTurn();
        setMessage(winnerInfo, "[Place your mark!]");
        for (let i = 0; i < 9; i++) {
            const cellElement = document.getElementById(`cell${i + 1}`);
            cellElement.textContent = "";
        }
        console.log("Reset game!");
    }

    function clearBoard() {

    }

    // change element text content
    function setMessage(elementName, message) {
        elementName.textContent = message;
    }

    function displayTurn() {
        turnInfo.textContent = `${getActivePlayer().name}'s turn [${getActivePlayer().marker}]`;;
    }

    function displayWinner() {
        winnerInfo.textContent = `${getActivePlayer().name} wins! [${getActivePlayer().marker}]`;
    }

    return { putMark, playGame, initializeGame }
}

const tictactoe = GameController();
tictactoe.initializeGame();