import Component from './Component'

// У корзины должен быть массив, где лежат объекты - название и кол-во,
// если мы кликнули на плюс и в массиве корзины есть такой тип,
// то мы добавляем выбранное кол-во товара в эту значению и вызываем перередер всей корзины и нужно,
//чтобы цена адаптировалась
// если мы нажали на минус, то находит в массиве элемент

//можно давать айди по типу, если в массиве есть такой айдишник,
//то я вызываю перерендер по этому айди с новым кол-вом товара,
//если выбрано 0 и нажата кнопка то нужно проверить если ли выбранный элемент,
//чтобы удалить его из корзины обычным дестроем

// Proxy
const arrayOfGoods = []

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
        <div class="basket__body" id='place-for-body-item'>
          <div class="body__top">
            <div class="body__name"><span>Название</span></div>
            <div class="body__quantity"><span>Количество</span></div>
          </div>
     
            <!-- Тут будут появляться добавленнные товары -->
            
          
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
    this.basketRender()

    // this.getContent
    // this.renderComp(this.content, document.getElementById(this.id))
  }

  basketRender() {
    this.content = ` <div class="body__bottom" id='array__wrapper'>

    </div>`
    this.renderComp(this.content, document.getElementById(this.id))
    arrayOfGoods.map((el) => {
      this.content = `
      <div class="body__item" id="body__item">
        <span>${el.name}</span>
        <span>${el.quantity}</span>
      </div>
      `
      this.renderComp(this.content, document.getElementById('array__wrapper'))
    })
  }

  // get getContent() {
  //   return (this.content = `<div class="body__item" id="${this.nameValue}">
  //   <span>${this.nameValue}</span>
  //   <span>${this.quantityValue}</span>
  // </div>`)
  // }

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
  destroy(id = this.id) {
    const destroyPoint = document.getElementById(id)
    destroyPoint.remove()
  }
  add() {
    getArrayOfBasket(arrayOfGoods, this.nameValue, this.quantityValue)
    this.destroy('array__wrapper')
    this.basketRender()
    console.log('arrayOfGoods', arrayOfGoods)
    // this.renderComp(this.content, document.getElementById(this.id))
  }
}

function getArrayOfBasket(array, name, quantity) {
  if (array.length === 0) {
    array.push({ name: name, quantity: quantity })
  } else {
    const finded = array.find((el) => {
      if (el.name === name) {
        el.quantity = quantity
        return el
      }
    })
    if (!finded) {
      array.push({ name: name, quantity: quantity })
    }
  }
}

////////////////////////
// import Component from './Component'

// // У корзины должен быть массив, где лежат объекты - название и кол-во,
// // если мы кликнули на плюс и в массиве корзины есть такой тип,
// // то мы добавляем выбранное кол-во товара в эту значению и вызываем перередер всей корзины и нужно,
// //чтобы цена адаптировалась
// // если мы нажали на минус, то находит в массиве элемент

// //можно давать айди по типу, если в массиве есть такой айдишник,
// //то я вызываю перерендер по этому айди с новым кол-вом товара,
// //если выбрано 0 и нажата кнопка то нужно проверить если ли выбранный элемент,
// //чтобы удалить его из корзины обычным дестроем

// // Proxy
// const arrayOfGoods = []

// export default class Basket extends Component {
//   constructor(props) {
//     super()
//     this.id = 'basket-root'
//     this.price = props.price || 0
//     this.name = props.name || ''
//     this.quantity = props.quantity || ''
//     this.content = `
//     <div class="navbar__basket-block" >
//       <div class="basket__flex">
//         <div class="basket__header">
//           <div class="basket__icon">
//             <span class="icon-shadow"></span>
//             <i class="fa-solid fa-basket-shopping"></i>
//           </div>
//           <div class="basket__title"><span>Название</span></div>
//         </div>
//         <div class="basket__body">
//           <div class="body__top">
//             <div class="body__name"><span>Название</span></div>
//             <div class="body__quantity"><span>Количество</span></div>
//           </div>
//           <div class="body__bottom" id='place-for-body-item'>
//             <!-- Тут будут появляться добавленнные товары -->
//             <div class="body__item" id="array__wrapper">
//             </div>
//           </div>
//         </div>
//         <div class="basket__footer" id="place-price">
//           <div class="basket__total"><span>Итого: ${this.priceValue} руб.</span></div>
//         </div>
//         <div class="basket__btn" >
//           <button><span>Оформить заказ</span></button>
//         </div>
//       </div>
//     </div>`
//     this.renderComp(this.content, document.getElementById(this.id))
//     this.id = 'place-for-body-item'
//     this.basketRender()

//     // this.getContent
//     // this.renderComp(this.content, document.getElementById(this.id))
//   }

//   basketRender() {
//     this.content = `<div id="array__wrapper">
//     </div>`
//     this.renderComp(this.content, document.getElementById(this.id))
//     arrayOfGoods.map((el) => {
//       this.content = `
//       <div class="body__item">
//         <span>${el.name}</span>
//         <span>${el.quantity}</span>
//       </div>
//       `
//       this.renderComp(this.content, document.getElementById('array__wrapper'))
//     })
//   }

//   // get getContent() {
//   //   return (this.content = `<div class="body__item" id="${this.nameValue}">
//   //   <span>${this.nameValue}</span>
//   //   <span>${this.quantityValue}</span>
//   // </div>`)
//   // }

//   reRenderPrice() {
//     this.content = `
//     <div class="basket__total"><span>Итого: ${this.priceValue} руб.</span></div>
//     `
//     document.querySelector('.basket__total').remove()
//     this.renderComp(this.content, document.getElementById('place-price'))
//   }

//   get priceValue() {
//     return this.price
//   }
//   set priceValue(value) {
//     this.price += value * this.quantityValue
//     this.reRenderPrice()
//     this.getContent
//   }
//   get nameValue() {
//     return this.name
//   }
//   set nameValue(value) {
//     this.name = value
//     this.getContent
//   }
//   get quantityValue() {
//     return this.quantity
//   }
//   set quantityValue(value) {
//     this.quantity = value
//     this.getContent
//   }
//   destroy(id = this.id) {
//     const destroyPoint = document.getElementById(id)
//     console.log('destroy hehe')
//     destroyPoint.remove()
//   }
//   add() {
//     getArrayOfBasket(arrayOfGoods, this.nameValue, this.quantityValue)
//     this.destroy('array__wrapper')
//     this.basketRender()
//     console.log('arrayOfGoods', arrayOfGoods)
//     // this.renderComp(this.content, document.getElementById(this.id))
//   }
// }

// function getArrayOfBasket(array, name, quantity) {
//   if (array.length === 0) {
//     array.push({ name: name, quantity: quantity })
//   } else {
//     let finded = false
//     // Array.find
//     array.forEach((element) => {
//       if (element.name === name) {
//         element.quantity = quantity
//         finded = true
//       }
//     })
//     if (!finded) {
//       array.push({ name: name, quantity: quantity })
//     }
//   }
// }
