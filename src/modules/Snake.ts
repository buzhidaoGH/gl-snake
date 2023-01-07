// 创建蛇对象
export default class Snake {
  private snakeElement: HTMLElement // 蛇的容器
  private headElement: HTMLElement // 蛇头的DOM元素
  private bodiesElements: HTMLCollection // 蛇的身体(包括头)

  public isLive = true // 蛇的存活状态
  public speed = 250 // 蛇移动的速率(越小越快)
  private lastTime = new Date().getTime() // 最后时间戳
  public direction = 'ArrowRight' // 存储蛇的移动方向

  // stage:舞台对象(HTMLElement)
  constructor(stage: HTMLElement) {
    const snakeTemp = document.createElement('div'); // 创建临时蛇容器
    const snakeHead = document.createElement('div'); // 创建蛇头
    snakeTemp.classList.add('snake') // 蛇容器=>添加snake类
    this.snakeElement = snakeTemp
    this.headElement = snakeHead
    this.bodiesElements = snakeTemp.getElementsByTagName('div')
    snakeTemp.appendChild(snakeHead) // 蛇头加入蛇容器
    stage.appendChild(snakeTemp) // 蛇容器加入舞台
  }

  // 获取蛇头的X坐标
  get X() {
    return this.headElement.offsetLeft
  }

  //获取蛇头的Y坐标
  get Y() {
    return this.headElement.offsetTop
  }

  //设置蛇头X坐标
  set X(value: number) {
    if (this.X === value) return
    if (value < 0 || value > 290) { // 横轴方向撞墙
      this.isLive = false;
      return;
    }
    // 禁止x掉头
    if (this.bodiesElements[1] &&
        (<HTMLElement>this.bodiesElements[1]).offsetLeft === value) {
      value = value > this.X ? this.X - 10 : this.X + 10
    }
    this._moveBody() // 身体移动
    this.headElement.style.left = value + 'px'
    this._checkHeadBody() // 碰撞检测
  }

  //设置蛇头Y坐标
  set Y(value: number) {
    if (this.Y === value) return
    if (value < 0 || value > 290) { // 纵轴方向撞墙
      this.isLive = false;
      return;
    }
    // 禁止y掉头
    if (this.bodiesElements[1] &&
        (<HTMLElement>this.bodiesElements[1]).offsetTop === value) {
      value = value > this.Y ? this.Y - 10 : this.Y + 10
    }
    this._moveBody() // 身体移动
    this.headElement.style.top = value + 'px'
    this._checkHeadBody() // 碰撞检测
  }

  //蛇身吃东西身体变长
  public addBody() {
    let tempElement = <HTMLElement>this.bodiesElements[this.bodiesElements.length - 1]
    let left = tempElement.offsetLeft + 'px'
    let top = tempElement.offsetTop + 'px'
    this.snakeElement.insertAdjacentHTML('beforeend', `<div style="left:${left};top: ${top} "></div>`)
  }

  //蛇身体移动的方法
  private _moveBody() {
    for (let i = this.bodiesElements.length - 1; i > 0; i--) {
      let X = (<HTMLElement>this.bodiesElements[i - 1]).offsetLeft// 前一节身体
      let Y = (<HTMLElement>this.bodiesElements[i - 1]).offsetTop
      ;(<HTMLElement>this.bodiesElements[i]).style.left = X + 'px' // 将值设置到当前身体
      ;(<HTMLElement>this.bodiesElements[i]).style.top = Y + 'px'
    }
  }

  // 检测蛇头和身体是否碰撞
  private _checkHeadBody() {
    // 获取所有身体,检测是否出现坐标重叠
    for (let i = 1; i < this.bodiesElements.length; i++) {
      if (this.X === (<HTMLElement>this.bodiesElements[i]).offsetLeft &&
          this.Y === (<HTMLElement>this.bodiesElements[i]).offsetTop) {
        this.isLive = false;
      }
    }
  }

  // 蛇的无时无刻的判定方法
  public judge() {
    let currentTime = new Date().getTime()
    if (currentTime - this.lastTime > this.speed) {
      switch (this.direction) {
        case 'ArrowUp':
        case 'Up':
          this.Y -= 10 // 向上移动 top 减少
          break
        case 'ArrowDown':
        case 'Down':
          this.Y += 10 // 向下移动 top 增加
          break
        case 'ArrowLeft':
        case 'Left':
          this.X -= 10 // 向左移动 left 减少
          break
        case 'ArrowRight':
        case 'Right':
          this.X += 10 // 向右移动 left 增加
          break
      }
      this.lastTime = currentTime
    }
  }

  // 蛇初始化状态
  public reset() {
    for (const elementNode of this.snakeElement.querySelectorAll('div:not(:first-child)')) {
      elementNode.remove()
    }
    this.X = 0
    this.Y = 0
    this.speed = 250
    this.isLive = true
    this.direction = 'ArrowRight'
  }

  // 获取所有位置的坐标
  public snakeCoordinateArray() {
    let coordinateArray = [];
    for (let i = 0; i < 30; i++) {
      let iList: any[] = []
      coordinateArray.push(iList)
      for (let j = 0; j < 30; j++) {
        coordinateArray[i].push([i, j])
      }
    }
    for (let bodiesElement of this.bodiesElements) {
      let i = <number>((<HTMLElement>bodiesElement).offsetTop / 10)
      let j = <number>((<HTMLElement>bodiesElement).offsetLeft / 10)
      coordinateArray[i][j] = null
    }
    coordinateArray = coordinateArray.reduce(function (a, b) { return a.concat(b)})
    return coordinateArray.filter((element) => element)
  }
}
