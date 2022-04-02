import SubwayComponent from './Components/SubwayComponent'
import data from '../../data.json'
import Modal from './Components/Modal'
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

const subwayBtnGroup = document.getElementById('root')
subwayBtnGroup.addEventListener('click', (e) => {
  if (e.target === document.querySelector('.fa-minus') || document.querySelector('.fa-plus')) {
    console.log(e.target)
    const currId = e.target.closest('.subway__block').id //тут получил id, а что сделать хотел, забыл

    console.log('e', currId)
    const selectedSubwayBlock = document.getElementById(currId)
    const selectedSubwayInput = selectedSubwayBlock.querySelector('.subway-input')
    ////Почему то работает только на 1 инпут, - почему?
    if (e.target === document.querySelector('.fa-minus')) {
      if (selectedSubwayInput.value === '0') {
      } else {
        selectedSubwayInput.value -= 1
      }
    }
    if (e.target === document.querySelector('.fa-plus')) {
      selectedSubwayInput.value = selectedSubwayInput.value * 1 + 1
    }

    console.log(selectedSubwayInput)
  }
})
//получаем id, находим инпут его, меняем стате - добавить стате в компонент
