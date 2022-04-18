import Product from './Product'
import data from '../../../data.json'
import Modal from './Modal'
import Basket from './Basket'
import Component from './Component'
import { menuProxy } from './Menu'
import EventEmitter from '../EventEmitter'
const emitter = new EventEmitter()
console.log(emitter)

emitter.subscribe('menu__item pressed', () => {
  console.log('emmiter')
  const navbarMenu = document.querySelector('.navbar__menu')
  navbarMenu.addEventListener('click', (e) => {
    if (e.target.closest('.menu__item')) {
      const categoryId = e.target.closest('.menu__item').id
      const currMenuItem = document.getElementById(categoryId)
      currMenuItem.classList.add('selected')
      if (lastMenuItemId === categoryId) {
        alert('Already opened')
      } else {
        if (lastMenuItemId !== null) {
          const lastMenuItem = document.getElementById(lastMenuItemId)
          lastMenuItem.classList.remove('selected')
        }
        lastMenuItemId = categoryId

        main.destroy('root-subMain-right')
        main.renderComp(main.getContent, document.getElementById(main.id))
        menuProxy.category = categoryId

        const arrayOfProduct = data.menu.filter((el) => el.category === categoryId)
        arrayOfProduct.map((el) => {
          const product = new Product(el)
          return product
        })
        emitter.emit('menu__item pressed')
      }
    }
  })
})
class Main extends Component {
  constructor(props) {
    super()
    this.getContent
    this.id = 'root-main-right'
    this.renderComp(this.content, document.getElementById(this.id))
  }
  get getContent() {
    return (this.content = `<div class="main__content" id="root-subMain-right">
                              <div class="container-content">
                                <div id="root" class="main__flex"></div>
                              </div>
                            </div>`)
  }
}
const main = new Main()
menuProxy.renderComp(menuProxy.getContent, document.getElementById(menuProxy.id))
const sandwiches = data.menu.filter((el) => el.category === menuProxy.category)
let lastMenuItemId = menuProxy.category

const arrayOfProduct = data.menu.filter((el) => el.category === lastMenuItemId)
arrayOfProduct.map((el) => {
  const product = new Product(el)
  return product
})
emitter.emit('menu__item pressed')
