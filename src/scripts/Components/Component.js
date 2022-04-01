import render from '../render'
// function createComponent(tag, [props], [...children]) {
//   const element = document.createElement(`"${tag}"`)
//   element.classList.add(props)
// }
export default class Component {
  constructor(props) {
    this.content = null
    if (this.content != null) {
      renderComp(this.content)
    }
  }
  renderComp(content, root) {
    render(content, root)
  }
}
// класс должен получать проп data={} и в компоненте сделать метод, который будет возвращать шаблон с html куда будут подставляться пропсы с даты
