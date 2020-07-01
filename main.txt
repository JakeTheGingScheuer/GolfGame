// Variables
const CANVAS_WIDTH = 900
const CANVAS_HEIGHT = 700

// [holex, holey, ballx, bally]
const HOLE_1 = [600, 300, 300, 305, 2]
const HOLE_2 = [600, 400, 20, 20, 3]
const HOLE_3 = [800, 600, 20, 20, 4]
const HOLE_4 = [500, 100, 30, 600, 2]
const HOLE_5 = [60, 60, 800, 600, 3]
const HOLE_6 = [100, 400, 800, 600, 2]
const HOLE_7 = [120, 115, 700, 20, 2]
const HOLE_8 = [200, 400, 20, 500, 2]
const HOLE_9 = [450, 350, 550, 350, 1]

const HOLES = [HOLE_1, HOLE_2, HOLE_3, HOLE_4, HOLE_5, HOLE_6, HOLE_7, HOLE_8, HOLE_9]

let ROLLSPEED = 20
const FRICTION = 3
const MAX_POWER = CANVAS_WIDTH/2 + 187
const ROTATE_SPEED = 2

const UPDATE_INTERVAL = 40
const SPACE_BAR = () => {return (myGameArea.key == 32 && myGameArea.key)}
const RIGHT_ARROW = () => {return (myGameArea.key == 39 && myGameArea.key)}
const LEFT_ARROW = () => {return (myGameArea.key == 37 && myGameArea.key)}
const POWER_METER_X_POSITION = CANVAS_WIDTH/2 - 200
const POWER_METER_Y_POSITION = CANVAS_HEIGHT - 25
const POWER_INDICATOR_X = POWER_METER_X_POSITION + 3
const POWER_INDICATOR_Y = POWER_METER_Y_POSITION + 2
const AIMER_LENGTH = 20
const AIMER_CENTER = 10
const HOLE_CENTER = 15
const FLAG_HEIGHT = 40

// MAIN
const startGame = () => {myGameArea.start()}

const myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = CANVAS_WIDTH
    this.canvas.height = CANVAS_HEIGHT
    this.context = this.canvas.getContext("2d")
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    setupController()
    setInterval(updateGame, UPDATE_INTERVAL)
  }
}

// Controls
const setupController = () => {
  window.addEventListener('keydown', function (e) { myGameArea.key = e.keyCode})
  window.addEventListener('keyup', function (e) {myGameArea.key = false})
}

let holeNumber = 0
let CURRENT_HOLE = HOLES[holeNumber]
let HOLE_X_POSITION = CURRENT_HOLE[0]
let HOLE_Y_POSITION = CURRENT_HOLE[1]
let BALL_X_START_POSITION = CURRENT_HOLE[2]
let BALL_Y_START_POSITION = CURRENT_HOLE[3]
let PAR = CURRENT_HOLE[4]

// *********************************************
// Visuals
const endGameScreen = () => {
  createGameObject(CANVAS_WIDTH, CANVAS_HEIGHT, "green", 0,0)
  renderFinalScore()
}

const renderVisuals = () => {
  createGameObject(CANVAS_WIDTH, CANVAS_HEIGHT, "green", 0,0)
  renderGreen(GREEN_X_POSITION, GREEN_Y_POSITION)
  renderSandTrap(SANDTRAP_X, SANDTRAP_Y)
  renderWater(WATER_X, WATER_Y)
  hole.renderHole()
  ball.renderBall()
  powerMeter.renderMeter()
  showAimer()
  renderScoreCard()
  createFlag()
}

let GREEN_X_POSITION = HOLE_X_POSITION-85
let GREEN_Y_POSITION = HOLE_Y_POSITION-80
let SANDTRAP_X = HOLE_X_POSITION+135
let SANDTRAP_Y = HOLE_Y_POSITION-20
let WATER_X = HOLE_X_POSITION-20
let WATER_Y = HOLE_Y_POSITION-160

const checkIfOnGreen = () => {
  if(greenXCheck(GREEN_X_POSITION) && greenYCheck(GREEN_Y_POSITION) && powerVal < POWER_INDICATOR_X){
    powerVal-=5
  }
}

const greenXCheck = (x) => {
  return (ball.xCord >= x && ball.xCord <= x+200)
}

const greenYCheck = (y) => {
  return (ball.yCord >= y && ball.yCord <= y+200)
}

const renderGreen = (x, y) => {
  createGameObject(200, 200 , "#2FA300", x, y)
  createGameObject(170, 170 , "#33AF00", x+15, y+15)
  createGameObject(160, 160 , "#39C200", x+20, y+20)
}

const createGameObject = (width, height, color, x, y) => {
  area = myGameArea.context
  area.fillStyle = color
  area.fillRect(x, y, width, height)
}

const renderSandTrap = (x,y) => {
  createGameObject(80, 200 , "#E8F8B5", x, y)
}

const checkIfInSand = () => {
  if(sandXCheck(SANDTRAP_X) && sandYCheck(SANDTRAP_Y) && powerVal < POWER_INDICATOR_X+100){
    powerVal-=10
  }
}

const sandXCheck = (x) => {
  return (ball.xCord >= x && ball.xCord <= x+80)
}

const sandYCheck = (y) => {
  return (ball.yCord >= y && ball.yCord <= y+200)
}

const renderWater = (x,y) => {
  createGameObject(160, 60 , "#082EF8", x, y)
}

const checkIfInWater = () => {
  if(waterXCheck(WATER_X) && waterYCheck(WATER_Y) && powerVal < POWER_INDICATOR_X){
    resetGame()
  }
}

const waterXCheck = (x) => {
  return (ball.xCord >= x-10 && ball.xCord <= x+165)
}

const waterYCheck = (y) => {
  return (ball.yCord >= y-10 && ball.yCord <= y+60)
}

const renderScoreCard = () => {
  if(!inMotion){
    area = myGameArea.context
    area.strokeStyle = "black"
    area.font = "30px Arial";
    area.strokeText(`Hole ${holeNumber+1}`, CANVAS_WIDTH - 100, 40);
    area.font = "25px Arial"
    area.strokeStyle = "purple"
    area.strokeText(`Par ${PAR}`, CANVAS_WIDTH - 75, 62);
    area.strokeStyle = "blue"
    area.font = "20px Arial";
    area.strokeText(`Score: ${parseScore()}`, CANVAS_WIDTH - 98, 80);
  }
}

const parseScore = () => {
  if(score > 0){
    return `+${score}`
  } else return score
}

const renderFinalScore = () => {
  area = myGameArea.context
  area.strokeStyle = "red"
  area.font = "100px Arial";
  area.strokeText(`GAME OVER`, CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
  area.strokeStyle = "blue"
  area.font = "100px Arial";
  area.strokeText(`Score: ${parseScore()}`, CANVAS_WIDTH/2, CANVAS_HEIGHT/2+120);
}

const hole = {
  xCord : HOLE_X_POSITION,
  yCord : HOLE_Y_POSITION,
  renderHole : function() {createGameObject(30, 30, "black", this.xCord, this.yCord)}
}

const createFlag = () => {
  area = myGameArea.context
  area.beginPath()
  area.lineWidth = 3
  area.strokeStyle = "grey"
  area.moveTo(hole.xCord+HOLE_CENTER, hole.yCord+15)
  area.lineTo(hole.xCord+HOLE_CENTER, hole.yCord-FLAG_HEIGHT)
  area.stroke()

  area.beginPath()
  area.fillStyle = "red"
  area.moveTo(hole.xCord+HOLE_CENTER, hole.yCord-FLAG_HEIGHT)
  area.lineTo(hole.xCord+HOLE_CENTER+25, hole.yCord-FLAG_HEIGHT+5)
  area.lineTo(hole.xCord+HOLE_CENTER, hole.yCord-FLAG_HEIGHT+10)
  area.fill()
}

const powerMeter = {
  indicatorXCord: POWER_INDICATOR_X,
  indicatorYCord: POWER_INDICATOR_Y,
  renderMeter: function() {
    createGameObject(400, 20, "yellow", POWER_METER_X_POSITION, POWER_METER_Y_POSITION)
    this.renderIndicator("red")
  },
  renderIndicator: function(color) {createGameObject(7, 15, color, this.indicatorXCord, this.indicatorYCord)},
  atMaxPower: false,
}

const ball = {
  xCord : BALL_X_START_POSITION,
  yCord : BALL_Y_START_POSITION,
  clearBall : function() {createGameObject(20, 20, "green", this.xCord, this.yCord)},
  renderBall : function() {createGameObject(20, 20, "white", this.xCord, this.yCord)},
  hitBall : function(xPower, yPower) {
    this.clearBall()
    this.xCord += xPower*ROLLSPEED
    this.yCord += yPower*ROLLSPEED
    this.renderBall()
  }
}

const aimer = {
  xLimit: ball.xCord+AIMER_LENGTH,
  yLimit: ball.yCord+AIMER_LENGTH,
  xCord : ball.xCord+AIMER_LENGTH,
  yCord : ball.yCord+10,
  moveRight : function() {rotate(AIMER_LENGTH,0)},
  moveLeft : function() {rotate(0,AIMER_LENGTH)},
  renderAimer : function() {
    createAimerObject()
  },
  resetAimer : function (){
    this.xCord = ball.xCord+AIMER_LENGTH
    this.yCord = ball.yCord+AIMER_CENTER
    this.xLimit = ball.xCord+AIMER_LENGTH
    this.yLimit = ball.yCord+AIMER_LENGTH
  }
}

const createAimerObject = () => {
  area = myGameArea.context
  area.beginPath()
  area.lineWidth = 1
  area.strokeStyle = "black"
  area.moveTo(ball.xCord+AIMER_CENTER, ball.yCord+AIMER_CENTER)
  area.lineTo(aimer.xCord, aimer.yCord)
  area.stroke()
}

const showAimer = () => {
  if(!inMotion){
    aimer.renderAimer()
  } else {
    aimer.resetAimer()
  }
}

// *********************************************
// ACTIONS

// Main

const updateGame = () => {
  if(RIGHT_ARROW()){
    aimer.moveRight()
  }
  if(LEFT_ARROW()){
    aimer.moveLeft()
  }
  if (SPACE_BAR()) {
    startSwing()
    if(!swung){
      addStroke()
      swung = true
    }
  }
  else{
    finishSwing()
    checkIfInWater()
    checkIfInSand()
    checkIfOnGreen()
    checkIfBallIsInTheHole()
    renderVisuals()
  }
}

// Swing

let inMotion = false
let powerVal = 0
let powerValx = 0
let powerValy = 0

const startSwing = () => {
  let position = powerMeter.indicatorXCord

  if (position > MAX_POWER || position < POWER_INDICATOR_X){
    togglePower()
  }

  if (!inMotion) {
    if (position < MAX_POWER && !powerMeter.atMaxPower) {
      increasePower()

    } else {
      decreasePower()
    }
  }
}

const finishSwing = () => {
  if (!inMotion) {
    ball.aimX = aimer.xCord
    ball.aimY = aimer.yCord
  }
  inMotion = true
  xPower = ((powerVal - POWER_INDICATOR_X)/400)*powerValx
  yPower = ((powerVal - POWER_INDICATOR_X)/400)*powerValy
  ball.hitBall(xPower, yPower)
  slowDownBall()
  swung = false
}

// Power meter

const reset = () => {
  powerMeter.indicatorXCord = POWER_INDICATOR_X
  powerMeter.renderMeter()
  powerVal = POWER_INDICATOR_X
  powerValx = 0
  powerValy = 0
  inMotion = false
}

const slowDownBall = () => {
  if (powerVal > POWER_INDICATOR_X) {
    powerVal -= FRICTION

  } else if (powerVal - 2 < POWER_INDICATOR_X) {
    reset()
    checkIfOutOfBounds()
  }
}

const togglePower = () => {
  powerMeter.atMaxPower = !powerMeter.atMaxPower
}

const decreasePower = () =>{
  powerMeter.renderIndicator("yellow")
  powerMeter.indicatorXCord -= 7
  powerVal = powerMeter.indicatorXCord
  powerValx = ((aimer.xCord - aimer.xLimit)+10)/10
  powerValy = ((aimer.yCord - aimer.yLimit)+10)/10
}

const increasePower = () =>{
  powerMeter.indicatorXCord += 7
  powerMeter.renderIndicator("red")
  powerVal = powerMeter.indicatorXCord
  powerValx = ((aimer.xCord - aimer.xLimit)+10)/10
  powerValy = ((aimer.yCord - aimer.yLimit)+10)/10
}

// Aimer

const rotate = (a,b) => {
  let xDiff = Math.abs(aimer.xCord - aimer.xLimit)
  let yDiff = Math.abs(aimer.yCord - aimer.yLimit)

  if(yDiff == a && xDiff != 0){
    aimer.xCord += ROTATE_SPEED
  }
  if(yDiff == b && xDiff != AIMER_LENGTH){
    aimer.xCord -= ROTATE_SPEED
  }
  if(xDiff == b && yDiff != 0){
    aimer.yCord += ROTATE_SPEED
  }
  if(xDiff == a && yDiff != AIMER_LENGTH){
    aimer.yCord -= ROTATE_SPEED
  }
}

// *********************************************
// Tracking Progress


let strokes = 0
let swung = false
let score = 0
const addStroke = () => {
  strokes++
}

const checkIfBallIsInTheHole = () =>{
  if (ballInHole()){
    checkIfLastHole()
  }
}

const ballInHole = () => {
  return checkXforBall() && checkYforBall()
}

const checkXforBall = () => {
  return (ball.xCord >= hole.xCord - 10 && ball.xCord <= hole.xCord + HOLE_CENTER && powerVal < POWER_INDICATOR_X+100)
}

const checkYforBall = () => {
  return (ball.yCord >= hole.yCord - HOLE_CENTER && ball.yCord <= hole.yCord + 10 && powerVal < POWER_INDICATOR_X+100)
}

const checkIfOutOfBounds = () => {
  if(ball.xCord > CANVAS_WIDTH || ball.xCord < -20 || ball.yCord > CANVAS_HEIGHT || ball.yCord < -20){
    resetGame()
  }
}

const checkIfLastHole = () =>{
  if(holeNumber<HOLES.length-1){
    holeNumber++
    goToNextHole()
    resetGame()
  } else {
    endGameScreen()
  }
}

const goToNextHole = () => {
  score += (strokes - PAR)
  CURRENT_HOLE = HOLES[holeNumber]
  HOLE_X_POSITION = CURRENT_HOLE[0]
  HOLE_Y_POSITION = CURRENT_HOLE[1]
  BALL_X_START_POSITION = CURRENT_HOLE[2]
  BALL_Y_START_POSITION = CURRENT_HOLE[3]
  PAR = CURRENT_HOLE[4]
  GREEN_X_POSITION = HOLE_X_POSITION-50
  GREEN_Y_POSITION = HOLE_Y_POSITION-50
  SANDTRAP_X = HOLE_X_POSITION+165
  SANDTRAP_Y = HOLE_Y_POSITION-20
  WATER_X = HOLE_X_POSITION-20
  WATER_Y = HOLE_Y_POSITION-160
  strokes = 0
}

const resetGame = () => {
  ball.yCord = BALL_Y_START_POSITION
  ball.xCord = BALL_X_START_POSITION
  hole.xCord = HOLE_X_POSITION
  hole.yCord = HOLE_Y_POSITION
  powerMeter.indicatorXCord = POWER_INDICATOR_X
  aimer.resetAimer()
  powerMeter.renderMeter()
  hole.renderHole()
  ball.renderBall()
  createFlag()
  powerVal = POWER_INDICATOR_X
}
