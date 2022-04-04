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

console.log('subwayArray', subwayArray)

const subwayBtnGroup = document.getElementById('root')
subwayBtnGroup.addEventListener('click', (e) => {
  if (
    e.target === subwayBtnGroup.querySelector('.fa-minus') ||
    subwayBtnGroup.querySelector('.fa-plus') ||
    subwayBtnGroup.querySelector('.btns-list__btn icon')
  ) {
    console.log(e.target)
    const currId = e.target.closest('.subway__block').id //тут получил id, а что сделать хотел, забыл

    console.log('id', currId)
    const selectedSubwayBlock = document.getElementById(currId)
    const selectedSubwayInput = selectedSubwayBlock.querySelector('.subway-input')

    let currElement // Сюда помещаем экземпляр класса, который соответствует id блока по которому мы кликнули

    subwayArray.forEach((element) => {
      if (element.id === currId) {
        currElement = element
      }
    })
    //потому что у меня много элементов с таким классом и мб в этом ошибка, что он возвращает первый такой ?
    if (e.target === document.querySelector('.fa-minus')) {
      currElement.quantityValue = -1
      // if (selectedSubwayInput.value == 0) {
      // } else {
      // }
    }
    if (e.target === document.querySelector('.fa-plus')) {
      currElement.quantityValue = 1
    }

    console.log('currElement', currElement)
    // const element = subwayArray.map((el) => el.Id === currId)
    // console.log('element', element)
    // const selectedSubwayInput = selectedSubwayBlock.querySelector('.subway-input')

    // // ////Почему то работает только на 1 инпут, - почему?
    // if (e.target === document.querySelector('.fa-minus')) {
    //   if (selectedSubwayInput.value == 0) {
    //   } else {
    //     selectedSubwayInput.value -= 1
    //   }
    // }
    // if (e.target === document.querySelector('.fa-plus')) {
    //   selectedSubwayInput.value = selectedSubwayInput.value * 1 + 1
    // }

    // console.log(selectedSubwayInput)
  }
})
//получаем id, находим инпут его, меняем стате - добавить стате в компонент
