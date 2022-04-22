import Component from './Component'

export default class Menu extends Component {
  constructor(props) {
    super()
    this.emitter = props.emitter
    this.id = 'menu__root'
    this.created = true
    this.arrayOfCategory = [
      { cat: 'sandwiches', name: 'Сендвичи' },
      { cat: 'pizza', name: 'Блины' },
      { cat: 'shaurma', name: 'Шаурма' },
      { cat: 'burgers', name: 'Бургеры' },
      { cat: 'chicken', name: 'Курица & Картофель' },
      { cat: 'salads', name: 'Тортилья & Салаты' },
      { cat: 'drinks', name: 'Напитки & Десерты' },
    ]
    this.data = new Proxy(
      {
        category: props.category,
      },
      {
        set: (target, key, value) => {
          console.log('we are in proxy data')
          if (this.created) {
            this.destroy('menu__subRoot')
            this.created = false
          }
          target.category = value
          this.renderComp(this.getContent, document.getElementById(this.id))
          this.created = true
          this.emitter.emit('onCategoryChanged', this.data)
          return true
        },
      }
    )

    this.renderComp(this.getContent, document.getElementById(this.id))
    this.emitter.emit('onCategoryChanged', this.data)
  }

  get getContent() {
    return (this.content = `<ul class="navbar__menu" id="menu__subRoot">
                              ${this.arrayOfCategory
                                .map((el) => {
                                  return `<li class="menu__item ${
                                    el.cat === this.data.category ? 'selected' : ''
                                  }" id="${el.cat}"><a href="#">${el.name}</a></li>`
                                })
                                .join('')}
                            </ul>`)
  }
}
