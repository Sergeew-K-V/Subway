import SubwayComponent from './Components/SubwayComponent'
import data from '../../data.json'
import Modal from './Components/Modal'
import Basket from './Components/Basket'
//Инициализации корзины? Чисто шаблон
const basket = new Basket()
////Первая часть - инициализация элементов
// в чем идея, при инициализации компонент, давать ему уникальный индетификатор, на который мы будет ссылаться при рендере и уже отрисовывать элемент заново, в нужно блоке с этим id
const sandwiches = data.menu.filter((el) => el.category === 'sandwiches')
const subwayArray = sandwiches.map((el) => {
  const subTemp = new SubwayComponent(undefined, el)
  return subTemp // Я получал список undefind, тк объявленные объекты по завершению пропадали, а потом решил вернуть их, и тогда все заработало - вопрос хотел тут задать
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

//Изменение кол-ва subways
const subwayBtnGroup = document.getElementById('root')
subwayBtnGroup.addEventListener('click', (e) => {
  if (
    e.target === subwayBtnGroup.querySelector('.fa-minus') ||
    subwayBtnGroup.querySelector('.fa-plus') ||
    subwayBtnGroup.querySelector('.btns-list__btn ')
  ) {
    const currId = e.target.closest('.subway__block').id //тут получил id, а что сделать хотел, забыл
    // console.log('e.target', e.target)
    const selectedSubwayBlock = document.getElementById(currId)

    let currElement // Сюда помещаем экземпляр класса, который соответствует id блока по которому мы кликнули

    subwayArray.forEach((element) => {
      if (element.id === currId) {
        currElement = element
      }
    })
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

    console.log('currElement', currElement)
  }
})
//получаем id, находим инпут его, меняем стате - добавить стате в компонент
