export default function render(component, position = document.getElementById('root')) {
  position.insertAdjacentHTML('beforeend', component)
}

//////////////////// Решил убрать tags, ведь можно передавать полный компонент и оборачивающий тег не нужен

// export default function render(
//   component,
//   position = document.getElementById('root'),
//   tags = 'div'
// ) {
//   position.insertAdjacentHTML('beforeend', `<${tags}>${component}</${tags}>`)
// }

//////////////////////// изначальный вариант, который сделал в офисе, но отошел от этой логики(if все равно нужно будет реализовать)

// export default function render(
//   component,
//   position = document.getElementById('root'),
//   content = null
// ) {
//   if (content != null) {
//     const tagBlock = position.insertAdjacentHTML('beforeend', component)

//   } else {
//     position.insertAdjacentHTML('beforeend', component)
//   }
// }
