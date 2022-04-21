import Product from './Product'
import data from '../../../data.json'
import Modal from './Modal/Modal'
import Basket from './Basket'
import Component from './Component'
import Menu from './Menu'
import EventEmitter from '../EventEmitter'
const emitter = new EventEmitter()
console.log(emitter)

emitter.subscribe('btnModalOpen', () => {
  // console.log('You are opening modal emitter')
  const btnCustom = document.getElementById('btn-custom')
  let idChanged = false
  btnCustom.addEventListener('click', () => {
    /////////////// 1 ///////////////
    const dataForModal = {
      sizes: data.sizes,
      breads: data.breads,
      vegetables: data.vegetables,
      sauces: data.sauces,
      fillings: data.fillings,
    }
    //Changing ID for correct seacrh of curr Element
    if (!idChanged) {
      for (let key in dataForModal) {
        for (let secKey in dataForModal[key]) {
          dataForModal[key][secKey].id = 'modal-' + dataForModal[key][secKey].id
          // console.log(dataForModal[key][secKey].id)
        }
        idChanged = true
      }
    }
    const modal = new Modal(dataForModal, emitter)
  })
})

class Main extends Component {
  constructor(props) {
    super()
    this.id = 'root-main-right'
    this.emitter = props.emitter
    this.category = 'sandwiches'
    this.arrayOfProduct = props.data.menu.filter((el) => el.category === this.category)
    this.renderComp(this.getContent, document.getElementById(this.id))
    this.transformedArrayOfProducts = this.initContent()

    this.emitter.subscribe('onProductQuantityChange', (array) => {
      console.log('Subscribe onProductQuantityChange SET')
      const mainContentBlock = document.getElementById('root')
      mainContentBlock.addEventListener('click', (e) => {
        //Изменение кол-ва бутербродов
        const currProductId = e.target.closest('.subway__block').id
        const currProductBlock = document.getElementById(currProductId)
        const currProductObj = array.find((el) => {
          if (el.id === currProductId) {
            return el
          }
        })
        if (
          e.target.closest('.subway__block') === currProductBlock.querySelector('.fa-minus') ||
          currProductBlock.querySelector('.fa-plus') ||
          currProductBlock.querySelector('.btns-list__btn')
        ) {
          if (e.target === currProductBlock.querySelector('.fa-minus')) {
            if (currProductObj.dataProduct.quantity === 0) {
            } else {
              currProductObj.destroy('content-' + currProductObj.id)
              currProductObj.dataProduct.quantity = -1
            }
          }
          if (e.target === currProductBlock.querySelector('.fa-plus')) {
            currProductObj.destroy('content-' + currProductObj.id)
            currProductObj.dataProduct.quantity = 1
          }
        }
        // //Added subway to basket
        if (e.target === currProductBlock.querySelector('.btn-to-basket__btn')) {
          if (currProductObj.dataProduct.quantity != 0) {
            emitter.emit('sendObjToBasket', currProductObj.getObjForBasket)
          } else {
            alert('Укажите кол-во товара, чтобы добавить')
          }
        }
      })
    })
    this.emitter.subscribe('onCategoryChanged', (lastMenuItemId) => {
      // console.log("emmiter, yes it's main")
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
            this.destroy('root-subMain-right')
            this.renderComp(this.getContent, document.getElementById(this.id))
            this.emitter.emit('categoryChanging', categoryId)
          }
        }
      })
    })
    this.emitter.emit(
      'onProductQuantityChange',
      this.transformedArrayOfProducts,
      console.log('GOT on RE-RENDER by Menu onProductQuantityChange')
    )
    this.emitter.emit('btnModalOpen')
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
    const transformedArrayOfProducts = this.arrayOfProduct.map((el) => {
      const product = new Product(el, emitter)
      return product
    })
    return transformedArrayOfProducts
  }
}
const main = new Main({ data, emitter })
const menu = new Menu({ emitter, category: main.category })
const basket = new Basket({ emitter })
