export default function render(
  component,
  position = document.getElementById('root'),
  tags = 'div'
) {
  position.insertAdjacentHTML('beforeend', `<${tags}>${component}</${tags}>`)
}
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
