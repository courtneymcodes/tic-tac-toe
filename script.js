
class Player {
  constructor(color) {
      this.color = color,
      this.positions = [],
      this.wins = 0
  }

  addWin() {
    this.wins += 1
  }
}

//create players
let player1 = new Player('red')
let player2 = new Player('green')

//player 1 goes first
let currentPlayerTurn = 1

//variable to track if a player has won 
let playerWon = false

//add sound effects
const winSound = new Audio('sound/win.wav')
const clickSound = new Audio('sound/clickSquare.wav')
const tieSound = new Audio('sound/tie.mp3')

const allSquares = document.querySelectorAll('.squares')
const currentTurnDisplay = document.querySelector('#current-turn-display')
const currentColorDisplay = document.querySelector('#current-color-display')
const newGameButton = document.querySelector('#new-game')
const displayWinCountPlayer1 = document.querySelector('#win-count-p1')
const displayWinCountPlayer2 = document.querySelector('#win-count-p2')

startGame();

function startGame() {
  allSquares.forEach((square, index) => {
    square.id = index  //give each square an id of index
    square.addEventListener('click', handleClick) //add event listener to each square
  })
}

function handleClick(e) {
  const square = e.target
      //make sure clicked square has not been clicked yet
      if (square.style.backgroundColor === "") {
        clickSound.play()  //play sound when click on square
        //if its player 1's turn, turn square to player1Color, else turn it to player2's color
        currentPlayerTurn === 1 ? square.style.backgroundColor = player1.color : square.style.backgroundColor = player2.color
        //push the id of selected square to current player's positions array
        currentPlayerTurn === 1 ? player1.positions.push(square.id) : player2.positions.push(square.id)
        //if player1's turn, check if player1 has won. If not then its player2's turn, check if player2 has won
        currentPlayerTurn === 1 ? checkWinner(player1) : checkWinner(player2)
        //when player wins, displayWinner else update current player display
        if(playerWon === true){
          player1.color = ""  //remove color so players can not change squares anymore
          player2.color = ""
          displayWinner()  //display winner
          winSound.play()  // play win sound
          currentPlayerTurn === 1 ? player1.addWin() : player2.addWin() // add 1 to current players wins
          //add a win to the current players win count
          currentPlayerTurn === 1 ? displayWinCountPlayer1.textContent = `Player 1: ${player1.wins}` : displayWinCountPlayer2.textContent = `Player 2: ${player2.wins}`
          startNewGame()  //start a new game
        } else if(player1.positions.length + player2.positions.length === 9) { //there is a tie if no winner and all spaces are occupied
          displayTie()
          tieSound.play() 
          startNewGame()
        }else {//if no winner yet:
        //if its player 1's turn, set currentPlayerTurn to 2, else setCurrentPlayer turn to 1
        currentPlayerTurn === 1 ? currentPlayerTurn = 2 : currentPlayerTurn = 1
        //call currentPlayerDisplays functions to updat ecurrent player display
        currentPlayerDisplays(currentPlayerTurn)
        }
      }
    }

//indexes player needs in player.positions to win
const winningCombinations = ['012', '345', '678', '036', '147', '258', '048', '246']

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
    }else {
      //if player 2's turn, update displays to player 2
      currentTurnDisplay.textContent = "Player 2 wins!"
    }
}

function displayTie() {
  currentTurnDisplay.textContent = "It's a tie"
}

function startNewGame() {
  player1.positions = []  //remove id's from player.positions array
  player2.positions = []
  allSquares.forEach(square => square.removeEventListener('click', handleClick))//remove existing event listener from each square)
//show newGame button
newGameButton.style.display = 'flex'
//when clicked
newGameButton.addEventListener('click', () => {
  allSquares.forEach((square) => {
    square.style.backgroundColor = "" //remove background color from each square to reset the game board
    //this changes the current player so the losing player will go first
    currentPlayerTurn === 1 ? currentPlayerTurn = 2 : currentPlayerTurn = 1
    currentPlayerDisplays(currentPlayerTurn) //update current player turn display
    startGame() //start the game
    player1.color = 'red'  //assign colors back to players after new game starts
    player2.color = 'green'
    playerWon = false //set playerWon back to false
  })
})

}