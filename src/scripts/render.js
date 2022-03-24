export default function render(component, position = document.getElementById('root')) {
  position.insertAdjacentElement('beforeend', component)
}
