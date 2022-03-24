import Component from './Component'

export default class Header extends Component {
  constructor(tag, content) {
    super(tag)
    this.tag = '<header></header>'
    this.content = content
  }
}
console.log(Header)
