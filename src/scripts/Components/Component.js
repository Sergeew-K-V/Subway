import render from '../render'
// function createComponent(tag, [props], [...children]) {
//   const element = document.createElement(`"${tag}"`)
//   element.classList.add(props)
// }
export default class Component {
  constructor(props, content = null) {
    // render(undefined, undefined)
    this.content = content
    if (this.content != null) {
      render(this.content)
    }
  }
  renderComp() {
    render(this.content)
  }
}
// класс должен получать проп data={} и в компоненте сделать метод, который будет возвращать шаблон с html куда будут подставляться пропсы с даты
