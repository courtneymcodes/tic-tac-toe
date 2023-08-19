class Fish {
    constructor(image) {
        this.image = image
        this.positions = []
        this.wins = 0
    }

    addWin() {
        this.wins += 1
    }

}

let fish1 = new Fish('images/blueFish.jpg')
let fish2 = new Fish('images/stripedFish.jpg')

const allSquares2 = document.querySelectorAll('.squares2')
const currentTurnDisplay2 = document.querySelector('#current-turn-display2')
const currentImageDisplay = document.querySelector('#current-image-display')
const newGameButton2 = document.querySelector('#new-game2')
const displayWinCountFish1 = document.querySelector('#win-count2-p1')
const displayWinCountFish2 = document.querySelector('#win-count2-p2')
console.log(displayWinCountFish1)
console.log(displayWinCountFish2)

startGame2()

//change the squares image src to the players image
function startGame2() {
  allSquares2.forEach((square, index) => {
    square.id = index  //give each img an id of index
    square.addEventListener('click', handleClick2)  //add event listener to eahc sqaure
  })
  
}

function handleClick2(e) {
  const square = e.target
  //if the clicked square images src is blank 
  if (square.src.endsWith('images/blankSquare.png')) {  //sqaure.src returns the absolute path, we only want the relative path
    if(currentPlayerTurn === 1) {  //if it's player1's turn
      square.src = fish1.image  //add player1's image to square if its their turn
      fish1.positions.push(square.id) //push the square's id to player1's positions array
      checkWinner(fish1)  //check if winner
    } else {  //if it's player 2's turn
      square.src = fish2.image  //add player2's image to square if its their turn
      fish2.positions.push(square.id)  //push id to positions array
      checkWinner(fish2)    
    }
    if(playerWon === true){  // if player has won
      fish1.image = 'images/blankSquare.png' //stop players from being able to change squares
      fish2.image = 'images/blankSquare.png'
      displayWinner2()
      winSound.play()
      currentPlayerTurn === 1 ? fish1.addWin() : fish2.addWin() //add win to current players win count
      //update win count display
      currentPlayerTurn === 1 ? displayWinCountFish1.textContent = `Player 1: ${fish1.wins}` : displayWinCountFish2.textContent = `Player 2: ${fish2.wins}`
      startNewGame2()
    }else if(fish1.positions.length + fish2.positions.length === 9){  //if tie
        displayTie2()
        tieSound.play()
        startNewGame2()
    }else {  //no winner yet
      currentPlayerTurn === 1 ? currentPlayerTurn = 2 : currentPlayerTurn = 1  //change to next players turn
      currentFishDisplays() //update display of whose turn it is
    }
    }
  }


//display whos turn it is 
function currentFishDisplays() {
  //if it's player 1's turn, update to player 1
  if(currentPlayerTurn === 1) {
    currentTurnDisplay2.textContent = "Player 1's turn"
    currentImageDisplay.src = fish1.image
    //if it's player 2's
  } else {
    currentTurnDisplay2.textContent = "Player 2's turn"
    currentImageDisplay.src = fish2.image
  }
}


function displayWinner2() {
  if(currentPlayerTurn === 1) {  
    currentTurnDisplay2.textContent = 'Player 1 wins!'
  }else {
    currentTurnDisplay2.textContent = 'Player 2 wins!'
  }
}

function displayTie2() {
    currentTurnDisplay2.textContent = "It's a tie"
}

function startNewGame2() {
  newGameButton2.style.display = ''  //unhide new game button
  
  newGameButton2.addEventListener('click', () => {  ///when new game button clicked:
    allSquares2.forEach(square => {
      square.src = 'images/blankSquare.png'  //make squares blank again by setting the image src back to blank square
      square.removeEventListener('click', handleClick2)  //remove event listeners from squares
      fish1.positions = []//reset both players occupied spaces back to empty
      fish2.positions = []
      //switch turn to other player so the loser goes first
      if(currentPlayerTurn === 1) { //if it's player 1's turn, set current turn to player 2
        currentPlayerTurn === 2
      } else {  //if it's player 2's turn, set current turn to player 1
        currentPlayerTurn === 1
      }
      currentFishDisplays()  //update current player being displayed
      startGame2()  //start game again 
      fish1.image = 'images/blueFish.jpg'  //change player images from blank back to fish
      fish2.image = 'images/stripedFish.jpg'
      playerWon = false  //reset playerWon to false
    })
})
}