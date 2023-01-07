// 定义计分板
export default class ScorePanel {
  score = 0 // 初始分数
  level = 1 // 初始等级
  private scoreEle: HTMLElement // 分数DOM对象
  private levelEle: HTMLElement // 等级DOM对象
  private readonly MAX_LEVEL: number = 10 // 最高的等级
  private readonly UP_SCORE: number = 3 // 每获得3分升级

  // scorePanel:计分板对象(HTMLElement)
  constructor(scorePanel: HTMLElement) {
    this.scoreEle = scorePanel.querySelector('#score')!
    this.levelEle = scorePanel.querySelector('#level')!
  }

  // 设置加分方法
  public addScore() {
    this.scoreEle.innerHTML = ++this.score + ''
    if (this.score % this.UP_SCORE === 0 && this.level < this.MAX_LEVEL) this.levelUp()
  }

  // 设置等级方法
  public levelUp() {
    if (this.level < this.MAX_LEVEL) this.levelEle.innerHTML = ++this.level + ''
  }

  public reset() {
    this.score = 0;
    this.scoreEle.innerHTML = this.score + ''
    this.level = 1;
    this.levelEle.innerHTML = this.level + ''
  }
}
