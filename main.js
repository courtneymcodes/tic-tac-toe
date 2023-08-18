const chooseGameContainer = document.querySelector('#choose-game')
const colorsGameContainer = document.querySelector('#colors-game')
//const underwaterGameContainer = document.querySelector('#underwater-game')
const colorsGameButton = document.querySelector('#colors-button')
const underwaterGameButton = document.querySelector('#underwater-button')

colorsGameContainer.style.display = 'none'  //hide all of the game elements

//add event listener to both buttons (do seperately)
//when clicked: 
//set style.display = 'none' of choose-game div to hide it
//unhide the div of the colors game or underwater game - game should start working

colorsGameButton.addEventListener('click', () => {
  chooseGameContainer.style.display = 'none'  //hide game choices elements currently displayed
  colorsGameContainer.style.display = ""  //unhide colors game elements
})

