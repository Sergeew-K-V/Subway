import Component from './Component'
import data from '../../../data.json'
class Menu extends Component {
  constructor(props) {
    super()
    this.id = 'menu__root'
    this.category = 'sandwiches'
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
  }
  get getContent() {
    return (this.content = `<ul class="navbar__menu" id="menu__subRoot">
                              ${this.arrayOfCategory
                                .map((el) => {
                                  return `<li class="menu__item ${
                                    el.cat === this.category ? 'selected' : ''
                                  }" id="${el.cat}"><a href="#">${el.name}</a></li>`
                                })
                                .join('')}
                            </ul>`)
  }
}
const menuLittle = new Menu()
export const menuProxy = new Proxy(menuLittle, {
  set(target, prop, value) {
    target[prop] = value
    if (target.created) {
      target.destroy('menu__subRoot')
      target.created = false
    }
    target.renderComp(target.getContent, document.getElementById(target.id))
    target.created = true
    console.log("it's proxy render")
    return true
  },
  get(target, prop) {
    return target[prop]
  },
})
