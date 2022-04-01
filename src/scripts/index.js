import SubwayComponent from './Components/SubwayComponent'
import data from '../../data.json'
import Modal from './Components/Modal'

const btnCustom = document.getElementById('btn-custom')
btnCustom.addEventListener('click', () => {
  const modal = new Modal()
  const modalClose = document.querySelector('.modal__close')
  modalClose.addEventListener('click', () => {
    modal.destroy()
  })
})

// в чем идея, при инициализации компонент, давать ему уникальный индетификатор, на который мы будет ссылаться при рендере и уже отрисовывать элемент заново, в нужно блоке с этим id
const sandwiches = data.menu.filter((el) => el.category === 'sandwiches')
const subwayArray = sandwiches.map((el) => {
  const subTemp = new SubwayComponent(undefined, el)
  return subTemp // Я получал список undefind, тк объявленные объекты по завершению пропадали, а потом решил вернуть их, и тогда все заработало - вопрос хотел тут задать
})

const subwayBtnGroup = document.getElementById('root')
subwayBtnGroup.addEventListener('click', (e) => {
  if (e.target === document.querySelector('.fa-minus') || document.querySelector('.fa-plus')) {
    console.log(e.target)
    const currId = e.target.closest('.subway__block').id //тут получил id, а что сделать хотел, забыл
    console.log('e', currId)
  }
})
