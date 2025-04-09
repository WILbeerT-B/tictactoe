const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let count = 1;

WIN_COMBOS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];

//function to display the board
function displayBoard() {
    console.log(`${board[0]} | ${board[1]} | ${board[2]}`);
    console.log(`${board[3]} | ${board[4]} | ${board[5]}`);
    console.log(`${board[6]} | ${board[7]} | ${board[8]}`);
    console.log('');
}

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

let activePlayer = players[0];
displayBoard();

while (count <= 9) {
    //switch player's turn, put active player's name and marker
    if (count % 2 == 0) {
        activePlayer = players[1];
    } else {
        activePlayer = players[0];
    }
    let input = prompt(`${activePlayer.name}, your marker is ${activePlayer.marker}. \nPlease choose a cell from 1-9`);
    console.log(`${activePlayer.name} put an ${activePlayer.marker} in cell ${board[input - 1]}`);
    board[input - 1] = activePlayer.marker;
    displayBoard();
    checkWinner();
    count++;
}

function checkWinner() {
    let pos1, pos2, pos3;
    WIN_COMBOS.forEach(element => {
        // console.log(element);
        pos1 = board[element[0]];
        pos2 = board[element[1]];
        pos3 = board[element[2]];
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