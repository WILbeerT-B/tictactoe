function Gameboard() {

    const cell = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    //function to display the board
    function displayBoard() {
        console.log(`${cell[0]} | ${cell[1]} | ${cell[2]}`);
        console.log(`${cell[3]} | ${cell[4]} | ${cell[5]}`);
        console.log(`${cell[6]} | ${cell[7]} | ${cell[8]}`);
        console.log('');
    }
    return { cell, displayBoard };
}

function GameController() {
    const WIN_COMBOS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];
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
    let count = 1;

    let activePlayer = players[0];

    /* function switchPlayerTurn() {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        return activePlayer;
    } */

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    function playRound() {
        board.displayBoard();
        while (count <= 9) {
            let input = prompt(`${getActivePlayer().name}, your marker is ${getActivePlayer().marker}. \nPlease choose a cell from 1-9`);
            console.log(`${getActivePlayer().name} put an ${getActivePlayer().marker} in cell ${board.cell[input - 1]}`);
            board.cell[input - 1] = getActivePlayer().marker;
            board.displayBoard();
            checkWinner();
            switchPlayerTurn();
            count++;
        }
    }

    function checkWinner() {
        let pos1, pos2, pos3;
        WIN_COMBOS.forEach(element => {
            // console.log(element);
            pos1 = board.cell[element[0]];
            pos2 = board.cell[element[1]];
            pos3 = board.cell[element[2]];
            if (pos1 == pos2 && pos2 == pos3) {
                count = 10;
                if (pos1 == "X") {
                    console.log("Player 1 wins");
                } else {
                    console.log("Player 2 wins");
                }
            }
        });
    }
    return { playRound }
}

const tictactoe = GameController();
tictactoe.playRound();