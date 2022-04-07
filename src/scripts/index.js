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
  if (e.target === selectedSubwayBlock.querySelector('.btn-to-basket__btn')) {
    const objForBasket = currElement.sendToBasket()
    if (currElement.quantityValue != 0) {
      basket.quantityValue = objForBasket.quantityValue
      basket.priceValue = objForBasket.price
      basket.nameValue = objForBasket.name
      basket.addItem(objForBasket.id)
    } else {
      console.log('id removing', objForBasket.id)
      basket.removeItem(objForBasket.id)
    }
  }
})

////Модальное окно, появление и уничтожение(доработка потом)
const btnCustom = document.getElementById('btn-custom')
const dataForModal = {
  sizes: data.sizes,
  breads: data.breads,
  vegetables: data.vegetables,
  sauces: data.sauces,
  fillings: data.fillings,
}
btnCustom.addEventListener('click', () => {
  const modal = new Modal(dataForModal)

  //Закрытие модального окна
  const modalClose = document.querySelector('.modal__close')
  modalClose.addEventListener('click', () => {
    modal.destroy()
  })
  //Переключение страниц
  const btnBack = document.getElementById('btn-back')
  btnBack.addEventListener('click', () => {
    if (modal.currentPageValue === 0) {
      modal.destroy()
    } else {
      const selectedNavbar = document.getElementById(`navbar-item-${modal.currentPageValue}`)
      selectedNavbar.classList.remove('selected')
      modal.currentPageValue = modal.currentPageValue - 1
      const selectedNextNavbar = document.getElementById(`navbar-item-${modal.currentPageValue}`)
      selectedNextNavbar.classList.add('selected')
      modal.renderCurrentPage(dataForModal)
    }
    console.log('btn-back : crrPage:', modal.currentPageValue)
  })
  const btnNext = document.getElementById('btn-next')
  btnNext.addEventListener('click', () => {
    if (modal.currentPageValue >= 5) {
      alert('last page')
    } else {
      const selectedNavbar = document.getElementById(`navbar-item-${modal.currentPageValue}`)
      selectedNavbar.classList.remove('selected')
      modal.currentPageValue = modal.currentPageValue + 1
      const selectedNextNavbar = document.getElementById(`navbar-item-${modal.currentPageValue}`)
      selectedNextNavbar.classList.add('selected')
      modal.renderCurrentPage(dataForModal)
    }
    console.log('btn-next: crrPage:', modal.currentPageValue)
  })
  //Добавление анимации выбора
  const modalContent = document.getElementById('content-card-root')
  let selected = false
  let lastClickObjId = modalContent.addEventListener('click', (e) => {
    if (e.target.closest('.modal__content-card')) {
      const currId = e.target.closest('.modal__content-card').id
      const currContentCard = document.getElementById(currId)
      if (selected) {
        if (lastClickObjId === e.target.closest('.modal__content-card').id) {
          currContentCard.classList.toggle('select')
          selected = false
          lastClickObjId = e.target.closest('.modal__content-card').id
        } else {
          const removeToggleNode = document.getElementById(lastClickObjId)
          removeToggleNode.classList.toggle('select')
          currContentCard.classList.toggle('select')
          lastClickObjId = e.target.closest('.modal__content-card').id
        }
      } else {
        currContentCard.classList.toggle('select')
        selected = true
        lastClickObjId = e.target.closest('.modal__content-card').id
      }
      console.log('select')
      console.log('selectedState', selected)
    }
  })
  //Анимация вернего nabvar item
})
