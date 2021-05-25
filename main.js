const boardContainer = document.getElementById('board-container');
const sizeButton = document.getElementById('changesize-button');
const clearButton = document.getElementById('clear-button');
const colorButtons = document.querySelectorAll('.select-color');
var color = 'rainbow';


window.addEventListener("load", defaultGrid);
sizeButton.addEventListener('click', changeSize);
clearButton.addEventListener('click', clear);
colorButtons.forEach(button => button.addEventListener('click', changeColor));

function defaultGrid() {
  setGrid(16);
  fillGrid(16);
}

function setGrid(size) {
  boardContainer.style.gridTemplateColumns = `repeat(${size},1fr)`;
  boardContainer.style.gridTemplateRows = `repeat(${size},1fr)`;
}

function fillGrid(size) {
  for (let i = 0; i < size * size; i++) {
    let newSquare = document.createElement('div');
    newSquare.addEventListener('mouseover', colorElement)
    newSquare.classList.add('grid-element');
    boardContainer.appendChild(newSquare);
  }
}

function changeColor(e) {
  color = e.target.dataset.color;
  console.log(color);
}

function colorElement(e) {
  switch (color) {
    case 'rainbow':
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
      break;
    
    case 'black':
      e.target.style.backgroundColor = `rgb(0,0,0)`;
      break;

    case 'grey':
      let currentColor = e.target.style.backgroundColor;
      if (currentColor == 'rgb(0, 0, 0)') {
        return;
      }
      if (currentColor.slice(0,4) !== 'rgba') {
        e.target.style.backgroundColor = `rgba(0,0,0,0.1)`;
      }
      else {
        let opacity = +currentColor.slice(-4, -1);
        console.log(opacity);
        e.target.style.backgroundColor = `rgba(0,0,0,${opacity + 0.1})`
      }
      break;
  
    default:
      break;
  }
}

function deleteGridElements() {
  let gridChilds = Array.from(boardContainer.childNodes);
  gridChilds.forEach(element => {
    boardContainer.removeChild(element);
  });
}

function changeSize() {
  newSize = parseInt(prompt('Enter the new size'));
  console.log(newSize);
  if (isNaN(newSize) || newSize < 1 || newSize > 64) {
    alert('Enter a number between 1 and 64')
  }
  else {
    deleteGridElements();
    setGrid(newSize);
    fillGrid(newSize);
  }
}

function clear() {
  let elements = document.querySelectorAll('.grid-element');
  elements.forEach(element => {
    element.removeAttribute('style');
  });
}