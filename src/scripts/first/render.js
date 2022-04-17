export default function render(component = `` || null, position = document.getElementById('root')) {
  position.insertAdjacentHTML('beforeend', component)
}
