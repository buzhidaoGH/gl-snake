// 定义Food食物类
export default class Food {
  private element: HTMLElement // 定义一个私有属性存储食物对应的 dom 元素

  // stage:舞台对象(HTMLElement)
  constructor(stage: HTMLElement) {
    // 创建一个食物对象
    const elementTemp = document.createElement('div')
    elementTemp.classList.add('food')
    elementTemp.innerHTML = `<div></div><div></div><div></div><div></div>`
    // 将食物对象追加到'舞台'中
    stage.appendChild(elementTemp)
    this.element = elementTemp // 将食物对象保存到私有属性内
    this.element.style.left = Math.floor(Math.random() * 30) * 10 + 'px'
    this.element.style.top = Math.floor(Math.random() * 30) * 10 + 'px'
  }

  // 定义一个获取食物x轴方法,属性
  get X() {
    return this.element.offsetLeft
  }

  // 获取食物的y轴坐标,属性
  get Y() {
    return this.element.offsetTop
  }

  // 生成随机食物的x,y方法
  public changeXY() {
    // 生成随机的位置 [0,300);单位10
    let top = Math.floor(Math.random() * 30) * 10
    let left = Math.floor(Math.random() * 30) * 10
    this.element.style.left = top + 'px'
    this.element.style.top = left + 'px'
  }

  // 无冲突符合条件的x,y坐标
  public noConflictXY(list: any[]) {
    let tempConf = list[Math.floor(Math.random()*list.length)]
    this.element.style.left = tempConf[0]*10 + 'px'
    this.element.style.top = tempConf[1]*10 + 'px'
  }

  public reset() {
    this.changeXY()
  }

}
