let upHill = false
let downHill = false
const UP_HILL_X_POSITION = BALL_X_START_POSITION+50
const UP_HILL_Y_POSITION = BALL_Y_START_POSITION-10

const checkUpHill = () => {
  if(ball.xCord >= UP_HILL_X_POSITION && ball.xCord <= UP_HILL_X_POSITION+50){
    ROLLSPEED-=1
  }
}

const upHillVisual = () => {
  createGameObject(10, 40 , "#2FA300", UP_HILL_X_POSITION, UP_HILL_Y_POSITION)
  createGameObject(10, 40 , "#33AF00", UP_HILL_X_POSITION+10, UP_HILL_Y_POSITION)
  createGameObject(10, 40 , "#39C200", UP_HILL_X_POSITION+20, UP_HILL_Y_POSITION)
  createGameObject(10, 40 , "#3ED300", UP_HILL_X_POSITION+30, UP_HILL_Y_POSITION)
  createGameObject(10, 40 , "#42E200", UP_HILL_X_POSITION+40, UP_HILL_Y_POSITION)
}

const downHillVisual = () => {
  createGameObject(10, 40 , "#42E200", BALL_X_START_POSITION+100, BALL_Y_START_POSITION-10)
  createGameObject(10, 40 , "#3ED300", BALL_X_START_POSITION+110, BALL_Y_START_POSITION-10)
  createGameObject(10, 40 , "#39C200", BALL_X_START_POSITION+120, BALL_Y_START_POSITION-10)
  createGameObject(10, 40 , "#33AF00", BALL_X_START_POSITION+130, BALL_Y_START_POSITION-10)
  createGameObject(10, 40 , "#2FA300", BALL_X_START_POSITION+140, BALL_Y_START_POSITION-10)

}
