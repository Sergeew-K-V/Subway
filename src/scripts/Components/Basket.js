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

export default class Basket extends Component {
  constructor(props) {
    super()
    this.arrayOfGoods = []
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
  }
  //Getters and setters
  get priceValue() {
    return this.price
  }
  set priceValue(value) {
    this.price = value
    this.reRenderPrice()
  }
  get nameValue() {
    return this.name
  }
  set nameValue(value) {
    this.name = value
  }
  get quantityValue() {
    return this.quantity
  }
  set quantityValue(value) {
    this.quantity = value
  }
  //Methods
  basketRender() {
    this.content = `<div class="body__bottom" id='array__wrapper'>
    </div>`
    this.id = 'place-for-body-item'
    this.renderComp(this.content, document.getElementById(this.id))

    this.arrayOfGoods.map((el) => {
      this.content = `
      <div class="body__item" id="body__item">
        <span>${el.name}</span>
        <span>${el.quantity}</span>
      </div>
      `
      this.id = 'array__wrapper'
      this.renderComp(this.content, document.getElementById(this.id))
    })
  }

  reRenderPrice() {
    this.content = `<div class="basket__total"><span>Итого: ${this.priceValue} руб.</span></div>`
    document.querySelector('.basket__total').remove()
    this.renderComp(this.content, document.getElementById('place-price'))
  }

  destroy(id = 'array__wrapper') {
    const destroyPoint = document.getElementById(id)
    destroyPoint.remove()
  }

  addItem(sendedId) {
    getArrayOfBasket(
      this.arrayOfGoods,
      this.nameValue,
      this.quantityValue,
      this.priceValue,
      sendedId
    )
    this.priceValue = getTotalPrice(this.arrayOfGoods, this.priceValue)
    this.destroy()
    this.basketRender()
    console.log('arrayofgoods', this.arrayOfGoods)
  }

  removeItem(sendedId) {
    const removingItem = this.arrayOfGoods.find((el) => el.id === sendedId)
    this.arrayOfGoods = this.arrayOfGoods.filter((el) => el != removingItem)
    this.destroy()
    this.basketRender()
    this.priceValue -= removingItem.price * removingItem.quantity
    this.reRenderPrice()
    console.log('removing item from basket', removingItem)
  }
}
function getTotalPrice(array, price) {
  const totalPrice = array.reduce((total, element) => {
    return (total += element.price * element.quantity)
  }, 0)
  return (price = totalPrice)
}
function getArrayOfBasket(array, name, quantity, price, id) {
  if (array.length === 0) {
    array.push({ id: id, name: name, quantity: quantity, price: price })
  } else {
    const finded = array.find((el) => {
      if (el.id === id) {
        el.quantity = quantity
        return el
      }
    })
    //Проверяем, если finded - undef или мы нашли совпадение
    if (!finded) {
      array.push({ id: id, name: name, quantity: quantity, price: price })
    }
  }
}
