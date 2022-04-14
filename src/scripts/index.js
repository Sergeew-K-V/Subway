import SubwayComponent from './Components/SubwayComponent'
import data from '../../data.json'
import Modal from './Components/Modal'
import Basket from './Components/Basket'
//Инициализации корзины? Чисто шаблон
const basket = new Basket({})
////Первая часть - инициализация элементов
const sandwiches = data.menu.filter((el) => el.category === 'sandwiches')
const subwayArray = sandwiches.map((el) => {
  const subTemp = new SubwayComponent(undefined, el)
  return subTemp
})

const subwayBtnGroup = document.getElementById('root')
subwayBtnGroup.addEventListener('click', (e) => {
  let currElement // Сюда помещаем экземпляр класса, который соответствует id блока по которому мы кликнули

  //тут получил id of block
  const currId = e.target.closest('.subway__block').id
  const selectedSubwayBlock = document.getElementById(currId)
  console.log('currId', currId)
  //получили нужный объект к этому блоку
  subwayArray.forEach((element) => {
    if (element.id === currId) {
      currElement = element
    }
  })

  //Изменение кол-ва бутербродов
  if (
    e.target === selectedSubwayBlock.querySelector('.fa-minus') ||
    selectedSubwayBlock.querySelector('.fa-plus') ||
    selectedSubwayBlock.querySelector('.btns-list__btn')
  ) {
    if (e.target === selectedSubwayBlock.querySelector('.fa-minus')) {
      if (currElement.quantityValue === 0) {
      } else {
        currElement.destroy()
        currElement.quantityValue = -1
      }
    }
    if (e.target === selectedSubwayBlock.querySelector('.fa-plus')) {
      currElement.destroy()
      currElement.quantityValue = 1
    }
  }
  //Added subway to basket
  if (e.target === selectedSubwayBlock.querySelector('.btn-to-basket__btn')) {
    const objForBasket = currElement.sendToBasket()
    if (currElement.quantityValue != 0) {
      basket.quantityValue = objForBasket.quantityValue
      basket.priceValue = objForBasket.price
      basket.nameValue = objForBasket.name
      basket.addItem(objForBasket.id)
    } else {
      basket.removeItem(objForBasket.id)
    }
  }
})

////Модальное окно, появление и уничтожение(доработка потом)
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
  if (!idChanged) {
    for (let key in dataForModal) {
      for (let secKey in dataForModal[key]) {
        dataForModal[key][secKey].id = 'modal-' + dataForModal[key][secKey].id
        console.log(dataForModal[key][secKey].id)
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
    // console.log('btn-back : crrPage:', modal.currentPageValue)
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
    // console.log('btn-next: crrPage:', modal.currentPageValue)
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
    }
    const btnBack = document.getElementById('btn-back')
    const btnNext = document.getElementById('btn-next')
    const btnList = document.querySelector('.modal__btn-list')
    if (modal.currentPageValue === 0) {
      btnBack.classList.add('hidden')
      btnList.classList.add('hiddenBack')
    } else {
      btnBack.classList.remove('hidden')
      btnList.classList.remove('hiddenBack')
    }
    if (modal.currentPageValue === 5) {
      btnNext.classList.add('hidden')
      btnList.classList.add('hiddenNext')
    } else {
      btnNext.classList.remove('hidden')
      btnList.classList.remove('hiddenNext')
    }
  })
})
// На усмотрение
// переключение по клику в navbar-Item +

// Надо сделать
// сверстать итоговую сборку бутерброда и соответсвенно стилизовать +
// сделать возможным выбор для овощей и ингридеентов - безграничным +
// создать в модалке мигрирующий объект, который будет принимать в себя выбранные значения +
// при выборе ингредиентов должны сохраняться выборы из нашего мигрированного объекта +
// написать метод, который будет отдавать этот объект
// не забыть про кол-во и цену
// в корзину должен приниматься этот объект
// потом после этого мб реализовать через наблюдателя и подписки

//navbar-item стилизовать, чтобы пробелов не было   +
//поправить анимацию кнопочек, при переключении через navbar-item  +
