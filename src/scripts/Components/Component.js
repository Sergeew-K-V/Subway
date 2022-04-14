import render from '../render'
export default class Component {
  constructor(props) {
    this.content = null
    if (this.content != null) {
      renderComp(this.content)
    }
  }
  //content - контент, который будет рендериться, root - корень, где будет отрисован элемент
  renderComp(content, root) {
    render(content, root)
  }
}
