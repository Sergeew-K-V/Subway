import SubwayComponent from './Components/SubwayComponent'
import data from '../../data.json'
import Modal from './Components/Modal'
import Basket from './Components/Basket'
//Инициализации корзины? Чисто шаблон
const basket = new Basket({})
////Первая часть - инициализация элементов
const sandwiches = data.menu.filter((el) => el.category === 'sandwiches')
sandwiches.map((el) => {
  const subTemp = new SubwayComponent(el, basket)
  subTemp.listeners()
  return subTemp
})
//animation and logic for transition of 'meun__item'
let lastMenuItemId = null // last menu item if was selected
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
          createMainBlock()
          const subways = data.menu.filter((el) => el.category === categoryId)
          const subwaysArray = subways.map((el) => {
            const subTemp = new SubwayComponent(el, basket)
            subTemp.listeners()
            return subTemp
          })

          break
        case 'shaurma':
          createMainBlock()
          const shaurmas = data.menu.filter((el) => el.category === categoryId)
          shaurmas.map((el) => {
            const shaurmaTemp = new SubwayComponent(el, basket)
            shaurmaTemp.listeners()
            return shaurmaTemp
          })
          break
        case 'burgers':
          createMainBlock()
          const burgers = data.menu.filter((el) => el.category === categoryId)
          burgers.map((el) => {
            const burgerTemp = new SubwayComponent(el, basket)
            burgerTemp.listeners()
            return burgerTemp
          })
          break
        case 'pizza':
          createMainBlock()
          const pizzas = data.menu.filter((el) => el.category === categoryId)
          pizzas.map((el) => {
            const pizzaTemp = new SubwayComponent(el, basket)
            pizzaTemp.listeners()
            return pizzaTemp
          })
          break
        case 'chicken':
          createMainBlock()
          const chickens = data.menu.filter((el) => el.category === categoryId)
          chickens.map((el) => {
            const chickenTemp = new SubwayComponent(el, basket)
            chickenTemp.listeners()
            return chickenTemp
          })
          break
        case 'salads':
          createMainBlock()
          const salads = data.menu.filter((el) => el.category === categoryId)
          salads.map((el) => {
            const saladsTemp = new SubwayComponent(el, basket)
            saladsTemp.listeners()
            return saladsTemp
          })
          break
        case 'drinks':
          createMainBlock()
          const drinks = data.menu.filter((el) => el.category === categoryId)
          drinks.map((el) => {
            const drinksTemp = new SubwayComponent(el, basket)
            drinksTemp.listeners()
            return drinksTemp
          })
          break
        default:
          break
      }
    }
  }
})
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
  const modal = new Modal(dataForModal, basket)
  modal.listenerForBtnBack()
  //Закрытие модального окна
  const modalClose = document.querySelector('.modal__close')
  modalClose.addEventListener('click', () => {
    modal.destroyModal()
  })
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
        const selectedNextNavbar = document.getElementById(`navbar-item-${modal.currentPageValue}`)
        selectedNextNavbar.classList.add('selected')
        modal.renderCurrentPage(dataForModal)
      }
      modal.listenerForBtnBack()
    }
  })
})

function createMainBlock() {
  const container = document.getElementById('root').remove()
  const position = document.querySelector('.container-content')
  const newRoot = document.createElement('div')
  newRoot.classList.add('main__flex')
  newRoot.id = 'root'
  position.insertAdjacentElement('beforeend', newRoot)
}
// На усмотрение
// переключение по клику в navbar-Item +

// Надо сделать
// сверстать итоговую сборку бутерброда и соответсвенно стилизовать +
// сделать возможным выбор для овощей и ингридеентов - безграничным +
// создать в модалке мигрирующий объект, который будет принимать в себя выбранные значения +
// при выборе ингредиентов должны сохраняться выборы из нашего мигрированного объекта +
// написать метод, который будет отдавать этот объект +
// не забыть про кол-во и цену +
// в корзину должен приниматься этот объект +

//navbar-item стилизовать, чтобы пробелов не было   +
//поправить анимацию кнопочек, при переключении через navbar-item  +
