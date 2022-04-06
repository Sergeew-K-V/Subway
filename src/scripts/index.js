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
    if (currElement.quantityValue != 0) {
      const objForBasket = currElement.sendToBasket()
      basket.quantityValue = objForBasket.quantityValue
      basket.priceValue = objForBasket.price
      basket.nameValue = objForBasket.name
      basket.add(objForBasket.id)
    }
  }
})

////Модальное окно, появление и уничтожение(доработка потом)
const btnCustom = document.getElementById('btn-custom')
const dataForModal = {
  sizes: data.sizes,
  bread: data.breads,
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
})
//клик - есть ли выбранный объект?
// нет - добавляет класс кликнутому объекту,
// да - это тот же объект?
// да, делаю тогл этому классу,
// нет найти нод с этим классом и убрать, и добавить класс текущему
