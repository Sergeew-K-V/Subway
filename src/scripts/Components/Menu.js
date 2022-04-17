import Component from './Component'
class Menu extends Component {
  constructor(props) {
    super()
    this.content = `<ul class="navbar__menu">
                        <li class="menu__item" id="pizza"><a href="#">Блины</a></li>
                        <li class="menu__item" id="shaurma"><a href="#">Шаурма</a></li>
                        <li class="menu__item" id="sandwiches"><a href="#">Сендвичи</a></li>
                        <li class="menu__item" id="burgers"><a href="#">Бургеры</a></li>
                        <li class="menu__item" id="chicken"><a href="#">Курица & Картофель</a></li>
                        <li class="menu__item" id="salads"><a href="#">Тортилья & Салаты</a></li>
                        <li class="menu__item" id="drinks"><a href="#">Напитки & Десерты</a></li>
                    </ul>`
    this.id = 'menu__root'
    this.category = 'sandwiches'
    this.renderComp(this.content, document.getElementById(this.id))
    this.listenerChangingCategory()
  }
  listenerChangingCategory() {
    let lastMenuItemId = null // last menu item if was selected
    const navbarMenu = document.querySelector('.navbar__menu')
    navbarMenu.addEventListener('click', (e) => {
      if (e.target.closest('.menu__item')) {
        const categoryId = e.target.closest('.menu__item').id
        const currMenuItem = document.getElementById(categoryId)
        currMenuItem.classList.add('selected')
        if (lastMenuItemId === categoryId) {
          alert('Already opened')
        } else {
          if (lastMenuItemId !== null) {
            const lastMenuItem = document.getElementById(lastMenuItemId)
            lastMenuItem.classList.remove('selected')
          }
          lastMenuItemId = categoryId
          switch (categoryId) {
            case 'sandwiches':
              createMainBlock()
              const subways = data.menu.filter((el) => el.category === categoryId)
              const subwaysArray = subways.map((el) => {
                const subTemp = new SubwayComponent(el, basket)
                subTemp.listeners()
                return subTemp
              })

              break
            case 'shaurma':
              createMainBlock()
              const shaurmas = data.menu.filter((el) => el.category === categoryId)
              shaurmas.map((el) => {
                const shaurmaTemp = new SubwayComponent(el, basket)
                shaurmaTemp.listeners()
                return shaurmaTemp
              })
              break
          }
        }
      }
    })
  }
}
// const menuLittle = new Menu()
export default new Proxy(Menu, {
  set(target, prop, value) {
    target[prop] = value
    target.renderComp(target.content, document.getElementById(target.id))
  },
})

function createMainBlock() {
  const container = document.getElementById('root').remove()
  const position = document.querySelector('.container-content')
  const newRoot = document.createElement('div')
  newRoot.classList.add('main__flex')
  newRoot.id = 'root'
  position.insertAdjacentElement('beforeend', newRoot)
}
