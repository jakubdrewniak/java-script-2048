function Game() {
    this.gameBoardArray =  [[2,4,4,4], 
                            [0,0,0,0], 
                            [4,0,0,0], 
                            [0,0,4,0]]
    this.gameBoard = document.querySelector(".board__tiles")
    this.tilePosition = {x: 0, y:0}
    this.init()

}

Game.prototype.init = function () {
    this.getNewTilePosition()
    this.placeTileOnBoard()
    this.getNewTilePosition()
    this.placeTileOnBoard()
    this.render()
    this.startListeningArrowKeys()
    // this.startListeningArrowButtons()

}

Game.prototype.getNewTilePosition = function () {
    const newTilePosition = {
        x: this.getRandomInt(0, 3),
        y: this.getRandomInt(0, 3)
    }
    if (this.gameBoardArray.join().split(",").filter(x=> x==="0").length === 0) {this.endGame()
    } else if (this.gameBoardArray[newTilePosition.y][newTilePosition.x] !== 0) {this.getNewTilePosition()
    } else { this.tilePosition = newTilePosition }    
}

Game.prototype.placeTileOnBoard = function () {
    this.gameBoardArray[this.tilePosition.y][this.tilePosition.x] = 2
}

Game.prototype.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



Game.prototype.render = function () {
    this.gameBoard.innerHTML = ''
    this.gameBoardArray.forEach(row => {
        row.forEach(cell => {
            this.renderSignleCell(cell)
        })
    })
    console.log(this.gameBoardArray)
}

Game.prototype.renderSignleCell = function (cell) {
    let cellElement = document.createElement('div')
    cellElement.classList.add("board__tiles--singletile");
    cellElement.style.backgroundColor = this.getTileColor(cell)
    cellElement.innerHTML = cell? cell : null 
    this.gameBoard.appendChild(cellElement)
}

Game.prototype.getTileColor = function (cell) {
    let lightness =  1.713343 + (85.99032 - 1.713343)/(1 + Math.pow((cell/39.02539), 0.637617))
    //lightness equals 90% for cell 0 and 10% for 2048
    return "hsl(216, 100%, " + lightness +"%)"
}

Game.prototype.startListeningArrowKeys = function () {
    window.addEventListener(
        'keydown',
        event => {
            switch (event.key) {
                case 'ArrowUp':
                    event.preventDefault()
                    this.moveUp()
                    break
                case 'ArrowDown':
                    event.preventDefault()
                    this.moveDown()
                    break
                case 'ArrowLeft':
                    event.preventDefault()
                    this.moveLeft()
                    break
                case 'ArrowRight':
                    event.preventDefault()
                    this.moveRight()
                    break
            }
        }
    )
}

// Game.prototype.startListeningArrowButtons = function () {
//     document.querySelector(".fa-angle-up").addEventListener("click", this.moveUp)
//     document.querySelector(".fa-angle-down").addEventListener("click", this.moveDown)
//     document.querySelector(".fa-angle-left").addEventListener("click", this.moveLeft)
//     document.querySelector(".fa-angle-right").addEventListener("click", this.moveRight)
// }

Game.prototype.moveUp = function () {
    console.log("eventlistener up") 
}
Game.prototype.moveDown = function () {
    console.log("eventlistener down")    
}
Game.prototype.moveLeft = function () {
    for(let i=0; i<4; i++) {
        let cleanRow = this.gameBoardArray[i].filter(x => x>0)
        for(let j=0; j<cleanRow.length; j++){
            if(cleanRow[j]===cleanRow[j+1]) {
                cleanRow[j] += cleanRow[j+1]
                cleanRow[j+1] = 0
            }
        }
        cleanRow = cleanRow.filter(x => x>0)
        while(cleanRow.length<4){cleanRow.push(0)}
    this.gameBoardArray[i] = cleanRow
    }
    console.log(this.gameBoardArray)
    
    this.getNewTilePosition()
    this.placeTileOnBoard()
    this.render()
}
Game.prototype.moveRight = function () {
    console.log("eventlistener right")    
}

Game.prototype.sumTiles = function() {
    console.log("sumtiles")
}

























Game.prototype.endGame = function () {
    alert("Game Over!")
}