import render from '../render'
// function createComponent(tag, [props], [...children]) {
//   const element = document.createElement(`"${tag}"`)
//   element.classList.add(props)
// }
let renderCount = 0

export default class Component {
  constructor(props) {
    this.content = null
    if (this.content != null) {
      renderComp(this.content)
    }
  }
  //content - контент, который будет рендериться, root - корень, где будет отрисован элемент
  renderComp(content, root) {
    renderCount++
    console.log('render', renderCount)
    render(content, root)
  }
}
