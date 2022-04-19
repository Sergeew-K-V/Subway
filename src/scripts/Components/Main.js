import Product from './Product'
import data from '../../../data.json'
import Modal from './Modal'
import Basket from './Basket'
import Component from './Component'
import Menu from './Menu'
import EventEmitter from '../EventEmitter'
const emitter = new EventEmitter()
console.log(emitter)
// this.emitter.emit('onProductQuantityChange',value)
emitter.subscribe('sendObjToBasket', (data) => {
  console.log('sendObjToBasket is now')
  basket.addItem(data)
})

emitter.subscribe('onCategoryChanged', () => {
  console.log("emmiter, yes it's main")
  const navbarMenu = document.querySelector('.navbar__menu')
  navbarMenu.addEventListener('click', (e) => {
    if (e.target.closest('.menu__item')) {
      const categoryId = e.target.closest('.menu__item').id
      const currMenuItem = document.getElementById(categoryId)
      currMenuItem.classList.add('selected')
      if (categoryId === lastMenuItemId) {
        alert('Already opened')
      } else {
        if (lastMenuItemId !== null) {
          const lastMenuItem = document.getElementById(lastMenuItemId)
          lastMenuItem.classList.remove('selected')
        }
        lastMenuItemId = categoryId

        main.destroy('root-subMain-right')
        main.renderComp(main.getContent, document.getElementById(main.id))
        menu.data.category = categoryId

        const arrayOfProduct = data.menu.filter((el) => el.category === menu.data.category)
        arrayOfProduct.map((el) => {
          const product = new Product(el, emitter)
          return product
        })
      }
    }
  })
})

class Main extends Component {
  constructor(props) {
    super()
    this.id = 'root-main-right'
    this.category = 'sandwiches'
    this.arrayOfProduct = props.data.menu.filter((el) => el.category === this.category)
    this.renderComp(this.getContent, document.getElementById(this.id))
    this.initContent()
  }
  get getContent() {
    return (this.content = `<div class="main__content" id="root-subMain-right">
                              <div class="container-content">
                                <div id="root" class="main__flex">
                                </div>
                              </div>
                            </div>`)
  }
  initContent() {
    this.arrayOfProduct.map((el) => {
      const product = new Product(el, emitter)
      return product
    })
  }
}

const main = new Main({ data })
const menu = new Menu({ emitter, category: main.category })
const basket = new Basket()
let lastMenuItemId = menu.data.category
