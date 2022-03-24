import render from './render'
import Component from './Components/Component'
import Header from './Components/Header'
const root = document.getElementById('root')
const template = `<div>Hellow world</div>`
const tags = {
  div: '<div></div>',
  header: '<header></header>',
}
root.insertAdjacentHTML('beforeend', template)
root.insertAdjacentHTML('beforeend', template)
root.insertAdjacentHTML('beforeend', template)
render(template, root)
render(template, root)
render(template, root)

const App = new Component(tags.div)
console.log(App)
const header = new Header('<h1>Hello world from header</h1>')
console.log(header)
