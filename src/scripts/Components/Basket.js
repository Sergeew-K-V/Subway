import Component from './Component'

export default class Basket extends Component {
  constructor(props) {
    super()
    this.id = 'basket-root'
    this.price = props.price || 0
    this.name = props.name || ''
    this.quantity = props.quantity || ''
    this.content = `
    <div class="navbar__basket-block" >
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
          <div class="body__bottom" id='place-for-body-item'>
            <!-- Тут будут появляться добавленнные товары -->
            
          </div>
        </div>
        <div class="basket__footer" id="place-price">
          <div class="basket__total"><span>Итого: ${this.priceValue} руб.</span></div>
        </div>
        <div class="basket__btn" >
          <button><span>Оформить заказ</span></button>
        </div>
      </div>
    </div>`
    this.renderComp(this.content, document.getElementById(this.id))
    this.id = 'place-for-body-item'
    this.getContent
    this.renderComp(this.content, document.getElementById(this.id))
  }

  get getContent() {
    return (this.content = `<div class="body__item">
    <span>${this.nameValue}</span>
    <span>${this.quantityValue}</span>
  </div>`)
  }

  reRenderPrice() {
    this.content = `
    <div class="basket__total"><span>Итого: ${this.priceValue} руб.</span></div>
    `
    document.querySelector('.basket__total').remove()
    this.renderComp(this.content, document.getElementById('place-price'))
  }

  get priceValue() {
    return this.price
  }
  set priceValue(value) {
    this.price += value * this.quantityValue
    this.reRenderPrice()
    this.getContent
  }
  get nameValue() {
    return this.name
  }
  set nameValue(value) {
    this.name = value
    this.getContent
  }
  get quantityValue() {
    return this.quantity
  }
  set quantityValue(value) {
    this.quantity = value
    this.getContent
  }
  destroy() {
    const destroyPoint = document.getElementById(this.id)
    destroyPoint.remove()
  }
  add() {
    this.renderComp(this.content, document.getElementById(this.id))
  }
}
