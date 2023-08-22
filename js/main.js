//add sound effects
const winSound = new Audio('sound/win.wav')
const clickSound = new Audio('sound/clickSquare.wav')
const tieSound = new Audio('sound/tie.mp3')
const bubbleSound = new Audio('sound/bubble.wav')

//select elements
const chooseGameContainer = document.querySelector('#choose-game')
const gameContainer = document.querySelector('#game-container')
const colorsGameButton = document.querySelector('#colors-button')
const underwaterGameButton = document.querySelector('#underwater-button')

const allSquares = document.querySelectorAll('.squares')
const currentTurnDisplay = document.querySelector('#current-turn-display')
const currentImageDisplay = document.querySelector('#current-image-display')
const newGameButton = document.querySelector('#new-game')
const displayWinCountPlayer1 = document.querySelector('#win-count-p1')
const displayWinCountPlayer2 = document.querySelector('#win-count-p2')
const homeButton = document.querySelector('#home-button')

//create player class
class Player {
  constructor(image) {
      this.image = image,
      this.positions = [],
      this.wins = 0
  }

  addWin() {
    this.wins += 1
  }
}

//initialize player 1 and player 2 variables
let player1;  
let player2;

//keep track of whose turn it is; player 1 goes first
let currentPlayerTurn = 1

//variable used to track if a player has won 
let playerWon = false

//hide all of the game elements initially
gameContainer.style.display = 'none'

//add event listener to both  game choice buttons
colorsGameButton.addEventListener('click', handleColorClick)  //color game choice
underwaterGameButton.addEventListener('click', handleUnderwaterClick)  //underwater game choice

//when colors game is chosen
function handleColorClick() { 
  chooseGameContainer.style.display = 'none'  //hide game choices elements currently displayed
  gameContainer.style.display = ''  //unhide colors game elements to start game
  player1 = new Player('images/greenSquare.png')  //create green player
  player2 = new Player('images/redSquare.png')  //create red player
  gameContainer.classList.add('colors-container')  //add class to change game background and text color
  newGameButton.classList.add('new-game-button-colors')  //add class to style new game button
  currentImageDisplay.src = player1.image  //show player 1's image in current player display initially
}


//when unerwater game is chosen
function handleUnderwaterClick() {
  chooseGameContainer.style.display = 'none'
  gameContainer.style.display = ''
  player1 = new Player('images/blueFish.png')
  player2 = new Player('images/stripedFish.jpg')
  gameContainer.classList.add('underwater-container')
  newGameButton.classList.add('new-game-button-underwater')
  currentImageDisplay.src = player1.image
}


startGame();

function startGame() {
  newGameButton.style.display = 'none'  //hide new game button
  allSquares.forEach((square, index) => {
    square.id = index  //give each square an id of index
    square.addEventListener('click', handleClick) //add event listener to each square
  })
}

function handleClick(e) {
  const square = e.target
  //make sure clicked square has not been clicked yet
  if (square.src.endsWith('images/blankSquare.png')) {
        clickSound.play()  //play sound when click on square
        if(currentPlayerTurn === 1) {  //if it's player1's turn
          square.src = player1.image  //add player1's image to square if its their turn
          player1.positions.push(square.id) //push the square's id to player1's positions array
          checkWinner(player1)  //check if winner
        }else {  //if it's player 2's turn
          square.src = player2.image  //add player2's image to square if its their turn
          player2.positions.push(square.id)  //push id to positions array
          checkWinner(player2)    
        }

        if(playerWon === true){  // if player has won
          allSquares.forEach(square => square.removeEventListener('click', handleClick))  //remove event listener so players can no longer change squares
          displayWinner()
          winSound.play()
          currentPlayerTurn === 1 ? player1.addWin() : player2.addWin() //add win to current players win count
          //update win count display
          currentPlayerTurn === 1 ? displayWinCountPlayer1.textContent = `Player 1: ${player1.wins}` : displayWinCountPlayer2.textContent = `Player 2: ${player2.wins}`
          startNewGame()
        }else if(player1.positions.length + player2.positions.length === 9){  //if tie
          displayTie()
          tieSound.play()
          startNewGame()
      }else {  //no winner yet
        currentPlayerTurn === 1 ? currentPlayerTurn = 2 : currentPlayerTurn = 1  //change to next players turn
        currentPlayerDisplays() //update display of whose turn it is
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

function currentPlayerDisplays(){
  //if player 1's turn update displays to player 1
if(currentPlayerTurn === 1){
  currentTurnDisplay.textContent = "Player 1's turn"
  currentImageDisplay.src = player1.image
}else {
  //if player 2's turn, update displays to player 2
  currentTurnDisplay.textContent = "Player 2's turn"
  currentImageDisplay.src = player2.image
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
//show newGame button
newGameButton.style.display = 'flex'
//when clicked
newGameButton.addEventListener('click', () => {
  allSquares.forEach((square) => {
    square.src = "images/blankSquare.png" //remove background color from each square to reset the game board
    //this changes the current player so the losing player will go first
    currentPlayerTurn === 1 ? currentPlayerTurn = 2 : currentPlayerTurn = 1
    currentPlayerDisplays() //update current player turn display
    startGame() //start the game
    player1.image = player1.image  //assign colors back to players after new game starts
    player2.image = player2.image
    playerWon = false //set playerWon back to false
  })
})
}


//show game choices if player clicks on home button and reset the game
homeButton.addEventListener('click', navigateHome)

function navigateHome() {
  gameContainer.style.display = 'none'  //hide game
  chooseGameContainer.style.display = ''//unhide game choices
  player1.positions = []  //remove id's from player.positions array
  player2.positions = []
  gameContainer.classList.remove('colors-container')
  gameContainer.classList.remove('underwater-container')
  newGameButton.classList.remove('new-game-button-colors')
  newGameButton.classList.remove('new-game-button-underwater')
  allSquares.forEach(square => {
    square.src = "images/blankSquare.png"  //reset the game board squares
  })
  
}