
const symbols = ['♠', '♣', '♢', '♡'];

class PlayingBoard {
  constructor(row, col, board){
    this.row = row,
    this.col = col,
    this.board = board ? board : this.#createRandomBoard(row, col);
  }

  #createRandomBoard = (row, col) => {
    const array = [];
    for (let i = 0; i < row; i++) {
      array[i]=[];
      for (let j = 0; j < col; j++) {
        array[i][j] = symbols[Math.floor(Math.random()*symbols.length)];
      }
    }
    return array
  }

  clickCell(x,y){
    const pickedCell = this.board?.[x]?.[y];
    pickedCell ? this.#clearCell(x,y,pickedCell) : null;
  }

  #clearCell(x,y,pickedCell){
    if (x>=this.row || x<0 || y>=this.col || y<0 ||  pickedCell !== this.board?.[x]?.[y]) {
      return;
    }
    
    this.board[x][y] = null;
    
    this.#clearCell(x+1, y, pickedCell);
    this.#clearCell(x-1, y, pickedCell);
    this.#clearCell(x, y+1, pickedCell);
    this.#clearCell(x, y-1, pickedCell);
  }
}

document.getElementById('start-game-button').addEventListener('click', () => {
  const row = document.getElementById('rows-count').valueAsNumber;
  const col = document.getElementById('cols-count').valueAsNumber;
  const game = new PlayingBoard(row, col);
  printBoard(game)
  document.getElementsByClassName('message')[0].innerHTML=`
  <p>Great! <img src="cool.png" alt="" width="20px"></p>
  <p>Click on cells for deleting</p>
  <p>the group of a similar symbols.</p>`
})


function printBoard(game){
  const table = document.getElementById('game');
  table.innerHTML = null;
  game.board.forEach((row, rowIndex)=>{
    const newRow = document.createElement('tr');

    row.forEach((_, colIndex)=>{
      const newCell = document.createElement('td')
      newCell.innerText = game.board[rowIndex][colIndex];
      newCell.addEventListener('click', () => {
        game.clickCell(rowIndex, colIndex);
        printBoard(game);
        changeMessage();
      });
      newRow.append(newCell);
    })

    table.append(newRow);
  })
  return table
}
