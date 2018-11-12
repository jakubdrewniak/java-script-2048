function Game() {
    this.gameBoardArray = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
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
}

Game.prototype.renderSignleCell = function (cell) {
    let cellElement = document.createElement('div')
    cellElement.classList.add("board__tiles--singletile");
    cellElement.style.backgroundColor = this.getTileColor(cell)
    cellElement.innerHTML = cell? cell : null 
    
    console.log(cellElement)
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
                    console.log("uuup")
                    break
                case 'ArrowDown':
                    event.preventDefault()
                    console.log("dooown")
                    break
                case 'ArrowLeft':
                    event.preventDefault()
                    console.log("leeeft")
                    break
                case 'ArrowRight':
                    event.preventDefault()
                    console.log("right")
                    break
            }
        }
    )
}

                    function myFunction() {
                        console.log("workds")
                        let k = new KeyboardEvent('keydown', {'keyCode':38, 'which':38})
                        document.dispatchEvent(k);
                    }























Game.prototype.endGame = function () {
    console.log("Game Over!")
}