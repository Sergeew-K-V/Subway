import SubwayComponent from './SubwayComponent'
import data from '../../../data.json'
import Modal from './Modal'
import Basket from './Basket'
import Component from './Component'
import Menu from './Menu'
import { menuProxy } from './Menu'
import EventEmitter from '../EventEmitter'

class Main extends Component {
  constructor(props) {
    super()
    this.content = `<div class="container-big">
                      <div class="main__block">
                        <div class="navbar__block">
                          <div class="navbar__top">
                            <div class="navbar__menu-block" id="menu__root"></div>
                          </div>
                          <div class="navbar__middle">
                            <div class="navbar__btn-custom">
                              <button id="btn-custom"><span>Собрать свой</span></button>
                            </div>
                          </div>
                          <div class="navbar__bottom" id="basket-root">
                            <!-- Here is a basket -->
                          </div>
                        </div>
                        <div class="main__content">
                          <div class="container-content">
                            <div id="root" class="main__flex"></div>
                          </div>
                          <!-- hello -->
                        </div>
                      </div>
                    </div>`
    this.id = 'root-main'
    this.renderComp(this.content, document.getElementById(this.id))
  }
}
const main = new Main()
menuProxy.category = 'sandwiches'
const basket = new Basket({})
const sandwiches = data.menu.filter((el) => el.category === 'sandwiches')
sandwiches.map((el) => {
  const subTemp = new SubwayComponent(el, basket)
  subTemp.listeners()
  return subTemp
})
const emitter = new EventEmitter()
console.log(emitter)

let lastMenuItemId = null // last menu item if was selected
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
        switch (categoryId) {
          case 'sandwiches':
            menuProxy.category = 'sandwiches'
            break
          case 'shaurma':
            menuProxy.category = 'shaurma'
            break
        }
      }
    }
  })
})
emitter.emit('menu__item pressed')
// const selected = 'sandwiches';

// setCategory(c) {
//   selected = c;
//   this.render()
// }

//Инициализации корзины? Чисто шаблон

//animation and logic for transition of 'meun__item'

////Модальное окно
// const btnCustom = document.getElementById('btn-custom')
// let idChanged = false
// btnCustom.addEventListener('click', () => {
//   const dataForModal = {
//     sizes: data.sizes,
//     breads: data.breads,
//     vegetables: data.vegetables,
//     sauces: data.sauces,
//     fillings: data.fillings,
//   }
//   //Changing ID for correct seacrh of curr Element
//   if (!idChanged) {
//     for (let key in dataForModal) {
//       for (let secKey in dataForModal[key]) {
//         dataForModal[key][secKey].id = 'modal-' + dataForModal[key][secKey].id
//         // console.log(dataForModal[key][secKey].id)
//       }
//       idChanged = true
//     }
//   }
//   // basket not needed
//   const modal = new Modal(dataForModal, basket)
//   modal.listenerForBtnBack()
//   //Закрытие модального окна
//   const modalClose = document.querySelector('.modal__close')
//   modalClose.addEventListener('click', () => {
//     modal.destroyModal()
//   })
// })
