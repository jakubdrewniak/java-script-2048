function Game() {
    this.gameBoardArray =  [[0,0,0,0], 
                            [0,0,0,0], 
                            [0,0,0,0], 
                            [0,0,0,0]]
    this.previousGameBoardArray = []
    this.gameBoard = document.querySelector(".board__tiles")
    this.tilePosition = {x: 0, y:0}    
    this.init()

}

Game.prototype.init = function () {
    this.score = 0    
    this.getNewTilePosition()
    this.placeTileOnBoard()
    this.getNewTilePosition()
    this.placeTileOnBoard()
    this.render()
    this.startListeningArrowKeys()
    this.startListeningArrowButtons()
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

Game.prototype.startListeningArrowButtons = function () {
    document.querySelector(".fa-angle-up").addEventListener("click", this.moveUp.bind(this))
    document.querySelector(".fa-angle-down").addEventListener("click", this.moveDown.bind(this))
    document.querySelector(".fa-angle-left").addEventListener("click", this.moveLeft.bind(this))
    document.querySelector(".fa-angle-right").addEventListener("click", this.moveRight.bind(this))
}

Game.prototype.moveUp = function () {    
    this.gameBoardArray = this.sumTiles(this.rotateArray())
    // first rotate the array (first column became first row), make sum like in moveLeft, then rotate it again 
    if(this.previousGameBoardArray.toString() !== this.rotateArray().toString()){
        //checking if previous board is the same as calculated- if yes, movement is forbidden
        this.gameBoardArray = this.rotateArray()
        this.reRender()
    } else {this.gameBoardArray = this.previousGameBoardArray}
}
Game.prototype.moveDown = function () {
    let reversedRotatedGameBoardArray = this.rotateArray().map(x=>x.reverse())
    this.gameBoardArray = this.sumTiles(reversedRotatedGameBoardArray)
    this.gameBoardArray = this.gameBoardArray.map(x=>x.reverse())
    if(this.previousGameBoardArray.toString() !== this.rotateArray().toString()){    
        this.gameBoardArray = this.rotateArray()
        this.reRender()  
    } else {this.gameBoardArray = this.previousGameBoardArray}
}

Game.prototype.moveLeft = function () {
    if(this.previousGameBoardArray.toString() !== this.sumTiles(this.gameBoardArray).toString()){
        this.gameBoardArray = this.sumTiles(this.gameBoardArray)
        this.reRender()
    } else {this.gameBoardArray = this.previousGameBoardArray}
}

Game.prototype.moveRight = function () {
    let reversedGameBoardArray = this.gameBoardArray.map(x=>x.reverse())
    let reversedSumGameBoardArray = this.sumTiles(reversedGameBoardArray).map(x=>x.reverse())
    this.gameBoardArray = this.previousGameBoardArray
    if(this.previousGameBoardArray.map(x=>x.reverse()).toString() !== reversedSumGameBoardArray.toString()){
        this.gameBoardArray = reversedSumGameBoardArray
        //reverse existing array, sum like for moveLeft, then reverse it again
        this.reRender()
    } else {
        this.gameBoardArray = this.previousGameBoardArray
    }
}

Game.prototype.sumTiles = function(arrayToSum) {
    for(let i=0; i<4; i++) {
        let cleanRow = arrayToSum[i].filter(x => x>0)
        for(let j=0; j<cleanRow.length; j++){
            if(cleanRow[j]===cleanRow[j+1]) {
                cleanRow[j] += cleanRow[j+1]
                this.score += cleanRow[j]
                cleanRow[j+1] = 0
            }
        }
        cleanRow = cleanRow.filter(x => x>0)
        while(cleanRow.length<4){cleanRow.push(0)}
        arrayToSum[i] = cleanRow
    }
    return arrayToSum
}

Game.prototype.rotateArray = function() {
    let rotatedGameBoardArray = [[],[],[],[]]
    for (let i=0; i<4; i++){
        for(let j=0; j<4; j++){
            rotatedGameBoardArray[i].push(this.gameBoardArray[j][i])
        }
    }
    return rotatedGameBoardArray
}

Game.prototype.reRender = function() {  
    this.getNewTilePosition()
    this.placeTileOnBoard()
    this.render()
    document.querySelector(".score").innerHTML= this.score
    this.previousGameBoardArray= this.gameBoardArray 
}

Game.prototype.endGame = function () {
    alert("Game Over! Your score is " + this.score)
    this.gameBoardArray =  [[0,0,0,0], 
                            [0,0,0,0], 
                            [0,0,0,0], 
                            [0,0,0,0]]
    this.init()
}