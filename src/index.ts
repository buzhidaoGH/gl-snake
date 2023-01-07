import './static/index.less'
import GameController from "./modules/GameController";

declare global {
  interface Window {
    SnakeGame: Function
  }
}

;(function (window) {
  function Temp(selector: string) {
    const tempElement = <HTMLElement>document.querySelector(selector)!
    if (!tempElement) {
      console.error(`选择器有误,${selector}不存在`)
      return
    }
    return new GameController(tempElement)
  }
  Temp.help = function () {
    return `SnakeGame是一个封装后的贪吃蛇游戏,是提供操作DOM来进行游戏
    1. 通过let snakeGame = new window.SnakeGame('选择器')绑定到一个DOM元素中
    2. snakeGame拥有的函数: start()启动函数
    3. snakeGame拥有的函数: pause()暂停函数
    4. snakeGame拥有的函数: reset()重置游戏
    5. snakeGame拥有的函数: theme(number)游戏主题(0,1,2)三个主题`
  }
  window.SnakeGame = Temp
})(window)
