import render from '../render'
// function createComponent(tag, [props], [...children]) {
//   const element = document.createElement(`"${tag}"`)
//   element.classList.add(props)
// }
export default class Component {
  constructor(tag) {
    this.tag = tag
    this.render = render
    render(tag)
  }
}
