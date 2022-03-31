import SubwayComponent from './Components/SubwayComponent'
import data from '../../data.json'
import Modal from './Components/Modal'
import Component from './Components/Component'
const modal = new Modal()

const btnCustom = document.getElementById('btn-custom')
btnCustom.addEventListener('click', () => {
  modal.renderComp()
})
const btnClose = document.querySelector('.modal-overlay .modal__close')
btnClose.addEventListener('click', () => {
  modal.destroy()
  //нужно написать функцию, которая найдет нод в модалке, и вернет его. МБ МБ МБ не точно!
})
// в чем идея, при инициализации компонент, давать ему уникальный индетификатор, на который мы будет ссылаться при рендере и уже отрисовывать элемент заново, в нужно блоке с этим id
const sub = new SubwayComponent()

console.log(sub)
