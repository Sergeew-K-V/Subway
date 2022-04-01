import SubwayComponent from './Components/SubwayComponent'
import data from '../../data.json'
import Modal from './Components/Modal'
import Component from './Components/Component'
const modal = new Modal()

const btnCustom = document.getElementById('btn-custom')
btnCustom.addEventListener('click', () => {
  modal.renderComp()
})
const btnClose = document.getElementById('root')
btnClose.addEventListener('click', () => {
  console.log('2')
  modal.destroy()
  //нужно написать функцию, которая найдет нод в модалке, и вернет его. МБ МБ МБ не точно!
})
// в чем идея, при инициализации компонент, давать ему уникальный индетификатор, на который мы будет ссылаться при рендере и уже отрисовывать элемент заново, в нужно блоке с этим id
const sub = new SubwayComponent()
const comp = new Component()
sub.renderComp()
console.log(sub)
console.log(comp)
