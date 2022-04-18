import Component from './Component'
import data from '../../../data.json'
class Menu extends Component {
  constructor(props) {
    super()
    this.content = `<ul class="navbar__menu" id="menu__subRoot">
                        <li class="menu__item" id="pizza"><a href="#">Блины</a></li>
                        <li class="menu__item" id="shaurma"><a href="#">Шаурма</a></li>
                        <li class="menu__item" id="sandwiches"><a href="#">Сендвичи</a></li>
                        <li class="menu__item" id="burgers"><a href="#">Бургеры</a></li>
                        <li class="menu__item" id="chicken"><a href="#">Курица & Картофель</a></li>
                        <li class="menu__item" id="salads"><a href="#">Тортилья & Салаты</a></li>
                        <li class="menu__item" id="drinks"><a href="#">Напитки & Десерты</a></li>
                    </ul>`
    this.id = 'menu__root'
    this.category = 'sandwiches'
    this.firstInit = true
  }
}
const menuLittle = new Menu()
export const menuProxy = new Proxy(menuLittle, {
  set(target, prop, value) {
    target[prop] = value
    if (!target.firstInit) {
      target.destroy('menu__subRoot')
    } else {
      target.firstInit = false
    }

    target.renderComp(target.content, document.getElementById(target.id))
    console.log("it's proxy render")
    return true
  },
})
