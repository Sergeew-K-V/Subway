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
////Модальное окно, появление и уничтожение(доработка потом)
const btnCustom = document.getElementById('btn-custom')
btnCustom.addEventListener('click', () => {
  const modal = new Modal()
  const modalClose = document.querySelector('.modal__close')
  modalClose.addEventListener('click', () => {
    modal.destroy()
  })
})

const subwayBtnGroup = document.getElementById('root')
subwayBtnGroup.addEventListener('click', (e) => {
  let currElement // Сюда помещаем экземпляр класса, который соответствует id блока по которому мы кликнули

  //тут получил id of block
  const currId = e.target.closest('.subway__block').id
  const selectedSubwayBlock = document.getElementById(currId)

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
      console.log('basket btn')
      const objForBasket = currElement.sendToBasket()
      console.log('objForBasket', objForBasket)
      // basket.destroy()
      basket.quantityValue = objForBasket.quantityValue
      basket.priceValue = objForBasket.price
      basket.nameValue = objForBasket.name
      basket.add()
    }
  }
})
