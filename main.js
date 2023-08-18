const chooseGameContainer = document.querySelector('#choose-game')
const colorsGameContainer = document.querySelector('#colors-game')
const underwaterGameContainer = document.querySelector('#underwater-game-container')
const colorsGameButton = document.querySelector('#colors-button')
const underwaterGameButton = document.querySelector('#underwater-button')

//hide all of the game elements
colorsGameContainer.style.display = 'none'
underwaterGameContainer.style.display = 'none'

//add event listener to both buttons
colorsGameButton.addEventListener('click', () => {
  chooseGameContainer.style.display = 'none'  //hide game choices elements currently displayed
  colorsGameContainer.style.display = ''  //unhide colors game elements to start game
})
underwaterGameButton.addEventListener('click', () => {
    chooseGameContainer.style.display = 'none'
    underwaterGameContainer.style.display = ''
})
