import Component from './Component'

export default class Basket extends Component {
  constructor(props) {
    super()
    this.id = 'basket-content-root'
    this.price = props.price || 0
    this.name = props.name || ''
    this.quantity = props.quantity || 0
    this.headerBlock = `<div class="navbar__basket-block" id="${this.id}">
    
    </div>`
    this.renderComp(this.headerBlock, document.getElementById('basket-root'))
    this.getContent
    this.renderComp(this.content, document.getElementById(this.id))
  }

  get getContent() {
    return (this.content = `
    <div class="basket__flex">
      <div class="basket__header">
        <div class="basket__icon">
          <span class="icon-shadow"></span>
          <i class="fa-solid fa-basket-shopping"></i>
        </div>
        <div class="basket__title"><span>Название</span></div>
      </div>
      <div class="basket__body">
        <div class="body__top">
          <div class="body__name"><span>Название</span></div>
          <div class="body__quantity"><span>Количество</span></div>
        </div>
        <div class="body__bottom">
          <!-- Тут будут появляться добавленнные товары -->
          <div class="body__item">
            <span>${this.nameValue}</span>
            <span>${this.quantityValue}</span>
          </div>
        </div>
      </div>
      <div class="basket__footer">
        <div class="basket__total"><span>Итого: ${this.priceValue} руб.</span></div>
      </div>
      <div class="basket__btn">
        <button><span>Оформить заказ</span></button>
      </div>
    </div>`)
  }

  get priceValue() {
    return this.price
  }
  set priceValue(value) {
    this.price += value
    this.getContent
    // this.renderComp(this.content, document.getElementById(this.id))
  }
  get nameValue() {
    return this.name
  }
  set nameValue(value) {
    this.name += value
    this.getContent
    // this.renderComp(this.content, document.getElementById(this.id))
  }
  get quantityValue() {
    return this.quantity
  }
  set quantityValue(value) {
    this.quantity += value
    this.getContent
    // this.renderComp(this.content, document.getElementById(this.id))
  }
  destroy() {
    const destroyPoint = document.getElementById(this.id)
    destroyPoint.remove()
  }
  add() {
    this.renderComp(this.content, document.getElementById('basket-root'))
  }
}
