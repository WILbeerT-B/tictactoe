const board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let count = 1;

console.log(`${board[0]} | ${board[1]} | ${board[2]}`);
console.log(`${board[3]} | ${board[4]} | ${board[5]}`);
console.log(`${board[6]} | ${board[7]} | ${board[8]}`);

while (count <= 9) {
    let input = prompt('Player, please choose a cell');
    count++;
}