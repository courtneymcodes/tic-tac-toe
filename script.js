
class Player {
    constructor(color) {
        this.color = color,
        this.positions = [],
        this.wins = 0
    }
}

//create players
let player1 = new Player('red')
let player2 = new Player('green')

//player 1 goes first
let currentPlayerTurn = 1

const allSquares = document.querySelectorAll('.squares')

//give each square an id and add event listener
allSquares.forEach((square, index) => {
    square.id = index  //give each square an id of index
    square.addEventListener('click', () => {
        //make sure clicked square has not been clicked yet
        if (square.style.backgroundColor === "") {
          //if its player 1's turn, turn square to player1Color, else turn it to player2's color
          currentPlayerTurn === 1 ? square.style.backgroundColor = player1.color : square.style.backgroundColor = player2.color
          //if its player 1's turn, set currentPlayerTurn to 2, else setCurrentPlayer turn to 1
          currentPlayerTurn === 1 ? currentPlayerTurn = 2 : currentPlayerTurn = 1
          //push the id of selected square to current player's positions array
          currentPlayerTurn === 1 ? player1.positions.push(square.id) : player2.positions.push(square.id)
          
        }
    }) 
})


