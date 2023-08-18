class Players {
    constructor(image) {
        this.image = image
        this.positions = this.positions
        this.wins = wins
    }

    addWin() {
        this.wins += 1
    }

}

let players1 = new Players('images/blueFish.jpg')
let players2 = new Players('images/stripedFish.jpg')

const allSquares2 = document.querySelectorAll('.squares2')

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
  console.log(square.src)
  //if the clicked square images src is blank 
  if (square.src.endsWith('images/blankSquare.png')) {  //sqaure.src return the absolute path, we only want the relative path
    console.log(square)
    currentPlayerTurn === 1 ? square.src = players1.image : square.src = players2.image   
    console.log(square)
}
}