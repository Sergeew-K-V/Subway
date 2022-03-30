import Component from './Components/Component'
import SubwayComponent from './Components/SubwayComponent'
import Header from './Components/SubwayComponent'
import data from '../../data.json'

const btnCustom = document.getElementById('btn-custom')
btnCustom.addEventListener('click', () => {})

// в чем идея, при инициализации компонент, давать ему уникальный индетификатор, на который мы будет ссылаться при рендере и уже отрисовывать элемент заново, в нужно блоке с этим id
const sub = new SubwayComponent()
console.log(sub)
