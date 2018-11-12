function Game() {
    this.gameBoard = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
    this.tilePosition = {x: 0, y:0}
    this.init()

}

Game.prototype.init = function () {
    this.getNewTilePosition()
    this.placeTileOnBoard()
    this.getNewTilePosition()
    this.placeTileOnBoard()
    console.log(this.gameBoard)
}

Game.prototype.getNewTilePosition = function () {
    const newTilePosition = {
        x: this.getRandomInt(0, 3),
        y: this.getRandomInt(0, 3)
    }
    if (this.gameBoard.join().split(",").filter(x=> x==="0").length === 0) {this.endGame()
    } else if (this.gameBoard[newTilePosition.y][newTilePosition.x] !== 0) {this.getNewTilePosition()
    } else { this.tilePosition = newTilePosition }    
}

Game.prototype.placeTileOnBoard = function () {
    this.gameBoard[this.tilePosition.y][this.tilePosition.x] = 2
}

Game.prototype.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Game.prototype.endGame = function () {
    console.log("Game Over!")
}