import Product from './Product'
import data from '../../../data.json'
import Modal from './Modal'
import Basket from './Basket'
import Component from './Component'
import Menu from './Menu'
import EventEmitter from '../EventEmitter'
const emitter = new EventEmitter()
console.log(emitter)

emitter.subscribe('onProductQuantityChange', (array) => {
  console.log('Subscribe onProductQuantityChange SET')
  const mainContentBlock = document.getElementById('root')
  mainContentBlock.addEventListener('click', (e) => {
    //Изменение кол-ва бутербродов
    if (
      e.target.closest('.subway__block') === mainContentBlock.querySelector('.fa-minus') ||
      mainContentBlock.querySelector('.fa-plus') ||
      mainContentBlock.querySelector('.btns-list__btn')
    ) {
      const currProductId = e.target.closest('.subway__block').id
      const currProductBlock = document.getElementById(currProductId)

      const currProductObj = array.find((el) => {
        if (el.id === currProductId) {
          return el
        }
      })

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
    // if (e.target === subwayCurrBlock.querySelector('.btn-to-basket__btn')) {
    //   if (this.dataProduct.quantity != 0) {
    //     this.emitter.emit('sendObjToBasket', this.getObjForBasket)
    //   } else {
    //     alert('Укажите кол-во товара, чтобы добавить')
    //   }
    // }
  })
})

emitter.subscribe('onCategoryChanged', () => {
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
        lastMenuItemId = categoryId

        main.destroy('root-subMain-right')
        main.renderComp(main.getContent, document.getElementById(main.id))
        menu.data.category = categoryId
        const arrayOfProducts = data.menu.filter((el) => el.category === menu.data.category)
        const convertedArrayOfProducts = arrayOfProducts.map((el) => {
          const product = new Product(el, emitter)
          return product
        })
        emitter.emit(
          'onProductQuantityChange',
          convertedArrayOfProducts,
          console.log('GOT on RE-RENDER by Menu onProductQuantityChange')
        )
      }
    }
  })
})

emitter.subscribe('btnModalClose', (modal) => {
  const modalClose = document.querySelector('.modal__close')
  modalClose.addEventListener('click', () => {
    modal.destroyModal()
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

    this.emitter.emit(
      'onProductQuantityChange',
      this.transformedArrayOfProducts,
      console.log('GOT on INIT onProductQuantityChange')
    )
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
emitter.subscribe('btnModalOpen', () => {
  console.log('You are opening modal emitter')
  const btnCustom = document.getElementById('btn-custom')
  let idChanged = false
  btnCustom.addEventListener('click', () => {
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
    // basket not needed
    const modal = new Modal(dataForModal, basket)
    modal.listenerForBtnBack()
    //Закрытие модального окна
    emitter.emit('btnModalClose', modal)

    // move to modal
    //Переключение страниц && //Анимация вернего nabvar item
    const btnBack = document.getElementById('btn-back')
    btnBack.addEventListener('click', () => {
      if (modal.currentPageValue === 0) {
      } else {
        //Решил не делать из этих 5 строк метод, тк это будет менее читабельно в классе, чем непосредственно здесь
        const selectedNavbar = document.getElementById(`navbar-item-${modal.currentPageValue}`)
        selectedNavbar.classList.remove('selected')
        modal.currentPageValue = modal.currentPageValue - 1
        const selectedNextNavbar = document.getElementById(`navbar-item-${modal.currentPageValue}`)
        selectedNextNavbar.classList.add('selected')
        modal.renderCurrentPage(dataForModal)
      }
      modal.listenerForBtnBack()
    })
    //Переключение страниц && //Анимация вернего nabvar item
    const btnNext = document.getElementById('btn-next')
    btnNext.addEventListener('click', () => {
      if (modal.currentPageValue >= 5) {
      } else {
        //Решил не делать из этих 5 строк метод, тк это будет менее читабельно в классе, чем непосредственно здесь
        const selectedNavbar = document.getElementById(`navbar-item-${modal.currentPageValue}`)
        selectedNavbar.classList.remove('selected')
        modal.currentPageValue = modal.currentPageValue + 1
        const selectedNextNavbar = document.getElementById(`navbar-item-${modal.currentPageValue}`)
        selectedNextNavbar.classList.add('selected')
        modal.renderCurrentPage(dataForModal)
      }
      modal.listenerForBtnBack()
    })
    //Переключение по navbar-item
    const navbarList = document.querySelector('.body__navbar-section')
    navbarList.addEventListener('click', (e) => {
      if (e.target.closest('.navbar__item')) {
        const currNavbarId = e.target.closest('.navbar__item').id
        if (currNavbarId !== `navbar-item-${modal.currentPageValue}`) {
          const selectedNavbar = document.getElementById(`navbar-item-${modal.currentPageValue}`)
          selectedNavbar.classList.remove('selected')
          modal.currentPage = +currNavbarId.slice(-1)
          const selectedNextNavbar = document.getElementById(
            `navbar-item-${modal.currentPageValue}`
          )
          selectedNextNavbar.classList.add('selected')
          modal.renderCurrentPage(dataForModal)
        }
        modal.listenerForBtnBack()
      }
    })
  })
})
const main = new Main({ data, emitter })
const menu = new Menu({ emitter, category: main.category })
const basket = new Basket({ emitter })
emitter.emit('btnModalOpen')
let lastMenuItemId = menu.data.category
