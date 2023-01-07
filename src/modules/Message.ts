export default class Message {
  private MessageElement: HTMLElement

  constructor(message: HTMLElement) {
    this.MessageElement = message
  }

  get msg() {
    return this.MessageElement.innerHTML
  }

  set msg(value: string) {
    if (value !== null && value !== '') {
      this.MessageElement.classList.add('show')
      this.MessageElement.innerHTML = value
    } else {
      this.MessageElement.classList.remove('show')
      this.MessageElement.innerHTML = ''
    }
  }

  public msgTime(value:string,time=2000){
    this.msg = value;
    setTimeout(()=>{
      this.MessageElement.classList.remove('show')
      this.MessageElement.innerHTML = ''
    },time);
  }
}