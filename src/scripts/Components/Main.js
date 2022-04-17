import SubwayComponent from './SubwayComponent'
import data from '../../../data.json'
import Modal from './Modal'
import Basket from './Basket'
import Component from './Component'
import menuProxy from './Menu'

class Main extends Component {
  constructor(props) {
    super()
    this.init()
  }
  init() {
    const basket = new Basket({})
    // const menu = new Menu()
    ////Первая часть - инициализация элементов
    const sandwiches = data.menu.filter((el) => el.category === 'sandwiches')
    sandwiches.map((el) => {
      const subTemp = new SubwayComponent(el, basket)
      subTemp.listeners()
      return subTemp
    })
    const menuInMain = menuProxy
  }
}
const main = new Main()
// const selected = 'sandwiches';

// setCategory(c) {
//   selected = c;
//   this.render()
// }

//Инициализации корзины? Чисто шаблон

//animation and logic for transition of 'meun__item'

////Модальное окно
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
  const modalClose = document.querySelector('.modal__close')
  modalClose.addEventListener('click', () => {
    modal.destroyModal()
  })
})
