const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let count = 1;

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
    board[input - 1] = activePlayer.marker;
    displayBoard();
    count++;
}