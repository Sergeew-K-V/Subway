import Component from './Component'

// const template = `<div class="subway__block">
// <div class="subway__flex">
//   <div class="flex__top">
//     <div class="subway__logo">
//       <img src="/src/img/icons/markets/subway_logo.png" alt="" />
//     </div>
//     <div class="subway__img-logo">
//       <img src="/src/img/icons/sandwiches/ovoshnoy.png" alt="" />
//     </div>
//     <div class="subway__title">Овощной</div>
//   </div>
//   <div class="flex__middle">
//     <div class="subway__link">
//       <a href="#">Соус и овощи на выбор</a>
//     </div>
//   </div>
//   <div class="flex__bottom">
//     <div class="subway__price">Цена: 110 руб.</div>
//     <div class="subway__btn-block">
//       <div class="btn-block__text">Количество</div>
//       <div class="btn-block__btns-list">
//         <button class="btns-list__btn"><i class="fa-solid fa-minus"></i></button>
//         <input type="text" class="btns-list__btn" value="0" />
//         <button class="btns-list__btn"><i class="fa-solid fa-plus"></i></button>
//       </div>
//     </div>
//     <div class="subway__btn-to-basket">
//       <button class="btn-to-basket__btn">В корзину</button>
//     </div>
//   </div>
// </div>
// </div>`

export default class SubwayComponent extends Component {
  // #title
  // #content

  constructor(content, props, id) {
    super()
    this.id = `subway-${props.id}`
    this.headerBlock = `<div class="subway__block" id="subway-${props.id}">
    </div>`
    this.renderComp(this.headerBlock)
    this.quantity = 0
    this.content = `
    <div class="subway__flex">
      <div class="flex__top">
        <div class="subway__logo">
          <img src="/src/img/icons/markets/subway_logo.png" alt="" />
        </div>
        <div class="subway__img-logo">
          <img src="/src/img/${props.image}" alt="" />
        </div>
        <div class="subway__title">${props.name}</div>
      </div>
      <div class="flex__middle">
        <div class="subway__link">
          <a href="#">${props.description}</a>
        </div>
      </div>
      <div class="flex__bottom">
        <div class="subway__price">Цена: ${props.price} руб.</div>
        <div class="subway__btn-block">
          <div class="btn-block__text">Количество</div>
          <div class="btn-block__btns-list">
            <button class="btns-list__btn icon"><i class="fa-solid fa-minus"></i></button>
            <input type="number" class="btns-list__btn subway-input" value="${this.quantityValue}" />
            <button class="btns-list__btn icon"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <div class="subway__btn-to-basket">
          <button class="btn-to-basket__btn">В корзину</button>
        </div>
      </div>
    </div>`
    this.renderComp(this.content, document.getElementById(`subway-${props.id}`))
    //в конструкторе нельзя использовать уже определенные в нем свойства? в рендер пробовал записать во второй параметр this.id вместо props.id
  }
  get quantityValue() {
    return this.quantity
  }
  set quantityValue(value) {
    console.log('quantity', this.quantity)
    this.quantity + value
    this.renderComp()
  }
  // set minusQuantityValue(value) {
  //   this.quantity - value
  //   this.renderComp(this.content, document.getElementById(`subway-${props.id}`))
  // }
}
