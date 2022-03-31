import SubwayComponent from './Components/SubwayComponent'
import data from '../../data.json'
import Modal from './Components/Modal'

const btnCustom = document.getElementById('btn-custom')
const btnModalCLose = document.querySelector('.modal__close')
btnCustom.addEventListener('click', () => {
  const modal = new Modal(template)
  console.log(modal)
})

// в чем идея, при инициализации компонент, давать ему уникальный индетификатор, на который мы будет ссылаться при рендере и уже отрисовывать элемент заново, в нужно блоке с этим id
const sub = new SubwayComponent()
console.log(sub)
