
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
const currentTurnDisplay = document.querySelector('#current-turn-display')
const currentColorDisplay = document.querySelector('#current-color-display')

//give each square an id and add event listener
allSquares.forEach((square, index) => {
    square.id = index  //give each square an id of index
    square.addEventListener('click', () => {
        //make sure clicked square has not been clicked yet
        if (square.style.backgroundColor === "") {
          //if its player 1's turn, turn square to player1Color, else turn it to player2's color
          currentPlayerTurn === 1 ? square.style.backgroundColor = player1.color : square.style.backgroundColor = player2.color
          //push the id of selected square to current player's positions array
          currentPlayerTurn === 1 ? player1.positions.push(square.id) : player2.positions.push(square.id)
          //if player1's turn, check if player1 has won. If not then its player2's turn, check if player2 has won
          currentPlayerTurn === 1 ? checkWinner(player1) : checkWinner(player2)
          //when player wins, displayWinner else update current player display
          if(playerWon === true){
            displayWinner()
            square.removeEventListener
          }else if(player1.positions.length + player2.positions.length === 9) { //there is a tie if no winner and all spaces are occupied
            displayTie()
          }else {//if no winner or tie yet:
          //if its player 1's turn, set currentPlayerTurn to 2, else setCurrentPlayer turn to 1
          currentPlayerTurn === 1 ? currentPlayerTurn = 2 : currentPlayerTurn = 1
          //call currentPlayerDisplays functions to updat ecurrent player display
          currentPlayerDisplays(currentPlayerTurn)
          }
          
        }
    }) 
})

//indexes player needs in player.positions to win
const winningCombinations = ['012', '345', '678', '036', '147', '258', '048', '246']

//variable to track if a player has won 
let playerWon = false

function checkWinner(player) {
  let currentPlayerPositions = player.positions  //get array of current player's positions
  currentPlayerPositions = currentPlayerPositions.join('') //convert array to a string
  //check if any of the winning conditions are in the player positions string:
  //iterate of the winning combinations array. For each winning combination, check if the player's position str contains all 3 numbers in the current combination
  winningCombinations.forEach((combination) => {
    let check0 = currentPlayerPositions.search(combination[0])  //the search method returns -1 if not found or the position if is found
    let check1 = currentPlayerPositions.search(combination[1])
    let check2 = currentPlayerPositions.search(combination[2])
    //if all numbers in the current combination exist in the playerPositions array, set playerWon to true
    if(check0 >= 0 && check1 >= 0 && check2 >= 0) {
        playerWon = true
    }
})  
}


function currentPlayerDisplays(currentPlayerTurn){
    //if player 1's turn update displays to player 1
  if(currentPlayerTurn === 1){
    currentTurnDisplay.textContent = "Player 1's turn"
    currentColorDisplay.style.backgroundColor = player1.color
  }else {
    //if player 2's turn, update displays to player 2
    currentTurnDisplay.textContent = "Player 2's turn"
    currentColorDisplay.style.backgroundColor = player2.color
  }
}

function displayWinner() {
    //replace cuurentTurnDisplay with winning message
    if(currentPlayerTurn === 1){
        currentTurnDisplay.textContent = "Player 1 wins!"
        console.log(currentTurnDisplay.textContent)
      }else {
        //if player 2's turn, update displays to player 2
        currentTurnDisplay.textContent = "Player 2 wins!"
      }
}

function displayTie() {
  currentTurnDisplay.textContent = "It's a tie"
}

