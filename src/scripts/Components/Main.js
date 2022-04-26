import Product from './Product'
import Component from './Component'
export default class Main extends Component {
  constructor(props) {
    super()
    this.id = 'root-main-right'
    this.emitter = props.emitter
    this.category = 'sandwiches'
    this.arrayOfProduct = props.data.menu.filter((el) => el.category === this.category)
    this.renderComp(this.getContent, document.getElementById(this.id))
    this.transformedArrayOfProducts = this.initContent()

    this.emitter.subscribe('onCategoryChanged', (menuData) => {
      const navbarMenu = document.querySelector('.navbar__menu')
      navbarMenu.addEventListener('click', (e) => {
        if (e.target.closest('.menu__item')) {
          const categoryId = e.target.closest('.menu__item').id
          const currMenuItem = document.getElementById(categoryId)
          currMenuItem.classList.add('selected')
          if (categoryId === menuData.category) {
            alert('Already opened')
          } else {
            if (menuData.category !== null) {
              const lastMenuItem = document.getElementById(menuData.category)
              lastMenuItem.classList.remove('selected')
            }
            this.destroy('root-subMain-right')
            this.renderComp(this.getContent, document.getElementById(this.id))

            menuData.category = categoryId

            this.arrayOfProduct = props.data.menu.filter((el) => el.category === categoryId)
            this.transformedArrayOfProducts = this.initContent()
            this.listenerQuantityProduct()
          }
        }
      })
    })
    this.listenerQuantityProduct()
    this.emitter.emit('btnModalOpen')
  }
  listenerQuantityProduct() {
    const mainContentBlock = document.getElementById('root')
    mainContentBlock.addEventListener('click', (e) => {
      //Изменение кол-ва бутербродов
      const currProductId = e.target.closest('.subway__block').id
      const currProductBlock = document.getElementById(currProductId)
      const currProductObj = this.transformedArrayOfProducts.find((el) => {
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
          this.emitter.emit('sendObjToBasket', currProductObj.getObjForBasket)
        } else {
          alert('Укажите кол-во товара, чтобы добавить')
        }
      }
    })
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
      const product = new Product(el, this.emitter)
      return product
    })
    return transformedArrayOfProducts
  }
}
