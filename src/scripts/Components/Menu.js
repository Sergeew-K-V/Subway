import Component from './Component'
import data from '../../../data.json'
import EventEmitter from '../EventEmitter'

export default class Menu extends Component {
  constructor(props) {
    super()
    this.emitter = props.emitter

    this.id = 'menu__root'
    this.category = props.category
    this.created = true
    this.arrayOfCategory = [
      { cat: 'sandwiches', name: 'Сендвичи' },
      { cat: 'pizza', name: 'Блины' },
      { cat: 'shaurma', name: 'Шаурма' },
      { cat: 'burgers', name: 'Бургеры' },
      { cat: 'chicken', name: 'Курица & Картофель' },
      { cat: 'salads', name: 'Тортилья & Салаты' },
      { cat: 'drinks', name: 'Напитки & Десерты' },
    ]
    this.data = new Proxy(
      {
        category: this.category,
      },
      {
        set: (target, key, value) => {
          if (this.created) {
            this.destroy('menu__subRoot')
            this.created = false
          }
          this.created = true
          console.log("it's proxy render")
          this.renderComp(this.getContent, document.getElementById(this.id))
          this.emitter.emit('onCategoryChanged', value)
          return true
        },
      }
    )

    // setTimeout(() => {
    //   this.data.category = 'pizza'
    // }, 2000)
    this.renderComp(this.getContent, document.getElementById(this.id))
    this.emitter.emit('onCategoryChanged')
  }
  get getContent() {
    return (this.content = `<ul class="navbar__menu" id="menu__subRoot">
                              ${this.arrayOfCategory
                                .map((el) => {
                                  return `<li class="menu__item ${
                                    el.cat === this.data.category ? 'selected' : ''
                                  }" id="${el.cat}"><a href="#">${el.name}</a></li>`
                                })
                                .join('')}
                            </ul>`)
  }
}
// const menuProxy = new Proxy(menuLittle, {
//   set(target, prop, value) {
//     target[prop] = value
//     if (target.created) {
//       target.destroy('menu__subRoot')
//       target.created = false
//     }
//     target.renderComp(target.getContent, document.getElementById(target.id))
//     target.created = true
//     console.log("it's proxy render")
//     return true
//   },
//   get(target, prop) {
//     return target[prop]
//   },
// })
