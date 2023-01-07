// 引入其他游戏元素
import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'
import Message from "./Message";

// 游戏控制器
export default class GameController {
  private containerElement: HTMLElement // 外部容器元素DOM
  private snakeGameElement: HTMLElement // snake游戏容器DOM

  private snake: Snake // 蛇容对象
  private scorePanel: ScorePanel //分数板对象
  private food: Food // 食物对象
  private message: Message // 信息对象

  private readonly CONTAINERUI = `<div id="gl-snake"><!-- 游戏的舞台 --><div class="stage"></div><!-- 游戏计分板 --><div class="score-panel"><div><span>SCORE：</span><span id="score">0</span></div><div><span>LEVEL：</span><span id="level">1</span></div></div><div class="message"></div></div>` // 外部容器的Ui配置
  private readonly REFRESHRATE = 10 // 屏幕刷新率 100FPS
  private readonly MSGMAP = {
    END: 'GAME OVER！',
    PAUSE: 'GAME PAUSE！',
    EMPTY: '',
    VICTORY: 'GAME VICTORY！'
  }
  private gameStatus = 0 // 0:未开始(初始),1:游戏中,2:游戏暂停,3:游戏死亡,4:游戏胜利

  // selector: string;传入容器选择器
  constructor(container:HTMLElement) {
    this.containerElement = container
    this.containerElement.innerHTML = this.CONTAINERUI
    this.snakeGameElement = this.containerElement.querySelector('#gl-snake')!

    this.snake = new Snake(this.snakeGameElement.querySelector('.stage')!)
    this.food = new Food(this.snakeGameElement.querySelector('.stage')!)
    this.scorePanel = new ScorePanel(this.snakeGameElement.querySelector('.score-panel')!)
    this.message = new Message(this.snakeGameElement.querySelector('.message')!)
  }

  // 循环渲染游戏窗口
  private _refreshGame() {
    let timerId = setInterval(() => {
      if (GameController._checkEat(this.snake.X, this.snake.Y, this.food.X, this.food.Y))
        this._checkedHandler() // 吃到食物后的处理
      this.snake.judge() // 蛇判断
      if (!this.snake.isLive || this.gameStatus === 3) { // 判定是否蛇是否死亡
        clearInterval(timerId)
        this._death() // 死亡事件
      }
      if (this.gameStatus === 0 || this.gameStatus === 2) {
        clearInterval(timerId)
      }
      if (this.gameStatus === 4) { // 判断游戏胜利
        clearInterval(timerId)
        this.message.msg = this.MSGMAP.VICTORY
      }
    }, this.REFRESHRATE);
  }

  // 判断是否x1,y1与x2,y2重叠
  private static _checkEat(x1: number, y1: number, x2: number, y2: number) {
    return x1 === x2 && y1 === y2
  }

  // 初始并执行渲染
  private _init() {
    this.gameStatus = 1
    this.message.msg = this.MSGMAP.EMPTY
    document.addEventListener('keydown', this._keyDownHandler) // 键盘按下绑定事件
    this._refreshGame()
  }

  // 死亡方法
  private _death() {
    this.snake.isLive = false
    this.gameStatus = 3
    this.message.msg = this.MSGMAP.END
    document.removeEventListener('keydown', this._keyDownHandler) // 解绑键盘事件
  }

  // 吃到食物后的处理
  private _checkedHandler() {
    let tempCoordinateArray = this.snake.snakeCoordinateArray();
    if (tempCoordinateArray.length <= 1) this.gameStatus = 4
    this.food.noConflictXY(tempCoordinateArray)
    this.scorePanel.addScore()
    this.snake.speed = 250 - (this.scorePanel.level - 1) * 10
    this.snake.addBody()
  }

  // 键盘按下的响应函数
  private _keyDownHandler = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'Up':
      case 'ArrowDown':
      case 'Down':
      case 'ArrowLeft':
      case 'Left':
      case 'ArrowRight':
      case 'Right':
        this.snake.direction = event.key
        break
    }
  }

  // 游戏启动
  public start() {
    if (this.gameStatus === 0 || this.gameStatus === 2) {
      this._init()
    }
  }

  // 游戏暂停
  public pause() {
    this.gameStatus = 2
    this.message.msg = this.MSGMAP.PAUSE
    document.removeEventListener('keydown', this._keyDownHandler) // 解绑键盘事件
  }

  // 游戏返回初始状态
  public reset() {
    this.gameStatus = 0
    this.message.msg = this.MSGMAP.EMPTY
    this.snake.reset()
    this.food.reset()
    this.scorePanel.reset()
    document.removeEventListener('keydown', this._keyDownHandler) // 解绑键盘事件
  }

  // 更换主题
  public changeTheme(value = 0) {
    switch (value) {
      case 0:
        this.snakeGameElement.setAttribute('class', '')
        break;
      case 1:
        this.snakeGameElement.setAttribute('class', 'theme1')
        break;
      case 2:
        this.snakeGameElement.setAttribute('class', 'theme2')
        break;
    }
  }
}
