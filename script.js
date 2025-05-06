function Gameboard() {
    // holds each cell in the board    
    const cell = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    //function to display the board
    function displayBoard(index) {
        /* console.log(`${cell[0]} | ${cell[1]} | ${cell[2]}`);
        console.log(`${cell[3]} | ${cell[4]} | ${cell[5]}`);
        console.log(`${cell[6]} | ${cell[7]} | ${cell[8]}`);
        console.log(''); */
        // for (let i = 0; i < 9; i++) {
        const cellElement = document.getElementById(`cell${index}`);
        cellElement.textContent = `${cell[index - 1]}`;
        // console.log(`cell${i + 1}`);
        // }

    }
    // update the board
    function updateBoard(index, marker) {
        return cell[index - 1] = marker;
    }
    return { cell, displayBoard, updateBoard };
}

function GameController() {
    // winning combinations that our check winner function will loop through
    const WIN_COMBOS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [6, 4, 2]];

    // create an instance of the gameboard
    const board = Gameboard();
    const players = [
        {
            name: "Player One",
            marker: "X"
        },
        {
            name: "Player Two",
            marker: "O"
        }
    ]
    // local variables
    let count = 1;
    let input;

    // set our active player to player one
    let activePlayer = players[0];

    // function to switch turns throughout the game
    const switchPlayerTurn = () => {
        return activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    // getters / setters / private variables
    const getCount = () => count;
    const setCount = (num) => count = num;
    const incrementCount = () => count++;
    const getActivePlayer = () => activePlayer;
    const getInput = () => input;

    // show messages for validations and results
    const showValidInputMessage = () => console.log(`${getActivePlayer().name} put an ${getActivePlayer().marker} in cell ${board.cell[input - 1]}`);
    const showDrawMessage = () => console.log("Game is draw!");
    const showInvalidInputMessage = () => console.log("Invalid input. Please try again.");
    const showCellNotEmptyMessage = () => console.log("That cell is not empty, please choose again!");

    // call this function when the user click on an empty cell
    function putMark(index) {
        // board.displayBoard();
        // while (count <= 9) {
        // input = promptInput();
        input = index;

        if (isCellEmpty(input)) {
            if (isInputValid(input)) {
                showValidInputMessage();
                board.updateBoard(board.cell[input - 1], getActivePlayer().marker);
                board.displayBoard(input);
                checkWinner();
                switchPlayerTurn();
                incrementCount();
                if (draw()) {
                    showDrawMessage();
                }
            } else {
                showInvalidInputMessage();
            }
        } else {
            showCellNotEmptyMessage();
        }
        // }
    }
    function checkWinner() {
        let position1, position2, position3;
        WIN_COMBOS.find(win_combo => {
            // console.log(element);
            position1 = board.cell[win_combo[0]];
            position2 = board.cell[win_combo[1]];
            position3 = board.cell[win_combo[2]];
            if (position1 == position2 && position2 == position3) {
                setCount(10);
                if (position1 == "X") {
                    console.log("Player 1 wins");
                } else {
                    console.log("Player 2 wins");
                }
            }
        });
    }
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

    // this handles the click event when putting a mark in a cell
    function playGame() {
        for (let i = 0; i < 9; i++) {
            const cellElement = document.getElementById(`cell${i + 1}`);
            cellElement.addEventListener("click", () => putMark(i + 1));
        }
    }

    return { putMark, playGame }
}

const tictactoe = GameController();
tictactoe.playGame();