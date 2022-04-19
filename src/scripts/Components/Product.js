import Component from './Component'
export default class Product extends Component {
  constructor(props) {
    super()
    this.id = `content-${props.id}`
    this.image = props.image
    this.description = props.description
    this.name = props.name
    this.price = props.price
    this.quantity = 0
    this.objForBasket = {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: this.quantityValue,
    }
    this.headerBlock = `<div class="subway__block" id="${this.id}">
    </div>`
    this.renderComp(this.headerBlock)
    this.getContent
    this.renderComp(this.content, document.getElementById(this.id))
    this.listeners()
  }
  get getContent() {
    return (this.content = `
      <div class="subway__flex" >
        <div class="flex__top">
          <div class="subway__logo">
            <img src="/src/img/icons/markets/subway_logo.png" alt="" />
          </div>
          <div class="subway__img-logo">
            <img src="/src/img/${this.image}" alt=""/>
          </div>
          <div class="subway__title">${this.name}</div>
        </div>
        <div class="flex__middle">
          <div class="subway__link">
            <a href="#">${this.description}</a>
          </div>
        </div>
        <div class="flex__bottom">
          <div class="subway__price">Цена: ${this.price} руб.</div>
          <div class="subway__btn-block">
            <div class="btn-block__text">Количество</div>
            <div class="btn-block__btns-list">
              <button class="btns-list__btn"><i class="fa-solid fa-minus"></i></button>
              <input type="number" class="btns-list__btn subway-input" value="${this.quantityValue}" />
              <button class="btns-list__btn"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
          <div class="subway__btn-to-basket">
            <button class="btn-to-basket__btn">В корзину</button>
          </div>
        </div>
      </div>`)
  }
  get quantityValue() {
    return this.quantity
  }
  set quantityValue(value) {
    this.quantity += value
    this.objForBasket.quantity += value
    this.getContent
    this.renderComp(this.content, document.getElementById(this.id))
  }
  get getObjForBasket() {
    return (this.objForBasket = {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: this.quantityValue,
    })
  }
  sendObjToBasket() {
    this.getObjForBasket
    return this.objForBasket
  }
  listeners() {
    const subwayCurrBlock = document.getElementById(this.id)
    subwayCurrBlock.addEventListener('click', (e) => {
      //Изменение кол-ва бутербродов
      if (
        e.target === subwayCurrBlock.querySelector('.fa-minus') ||
        subwayCurrBlock.querySelector('.fa-plus') ||
        subwayCurrBlock.querySelector('.btns-list__btn')
      ) {
        if (e.target === subwayCurrBlock.querySelector('.fa-minus')) {
          if (this.quantityValue === 0) {
          } else {
            this.destroy('content-' + this.id)
            this.quantityValue = -1
          }
        }
        if (e.target === subwayCurrBlock.querySelector('.fa-plus')) {
          this.destroy('content-' + this.id)
          this.quantityValue = 1
        }
      }
      // //Added subway to basket
      if (e.target === subwayCurrBlock.querySelector('.btn-to-basket__btn')) {
        if (this.quantityValue != 0) {
          this.sendObjToBasket()
        } else {
          alert('Укажите кол-во товара, чтобы добавить')
        }
      }
    })
  }
}
