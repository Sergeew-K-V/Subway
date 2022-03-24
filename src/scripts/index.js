import Component from './Components/Component'
import Header from './Components/Header'
const tags = {
  h1: 'h1',
  div: 'div',
  header: 'header',
}
const header = new Header('Hello world from header', tags.h1)
console.log(header)
