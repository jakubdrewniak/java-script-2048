function Game() {
    this.gameBoard = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]
    this.init()
}

Game.prototype.init = function () {
    this.makeGameBoard()
    this.makeEmptyGameBoardArray()
    this.placeTiles()
    this.render()
    this.startListeningArrowKeys()
}