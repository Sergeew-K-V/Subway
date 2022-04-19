import Component from './Component'

export default class Basket extends Component {
  constructor(props = {}) {
    super()
    this.arrayOfGoods = []
    this.id = 'basket-root'
    this.dataBasket = new Proxy(
      {
        price: 0,
      },
      {
        set: (target, key, value) => {
          console.log('Proxy from basket - SETTER')
          target.price = getTotalPrice(this.arrayOfGoods, this.dataBasket.price)
          this.renderComp(this.getContent, document.getElementById(this.id))
          this.listener()
          return true
        },
        get: (target, key) => {
          console.log("it's proxy of basket - GETTER(No re-render)")
          return target.price
        },
      }
    )
    this.renderComp(this.getContent, document.getElementById(this.id))
    this.listener()
  }
  get getContent() {
    return (this.content = `<div class="navbar__basket-block" id="basket-subRoot">
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
        <div class="body__bottom" id='array__wrapper'>
          ${this.arrayOfGoods
            .map((el) => {
              return `
              <div class="body__item" id="${el.id}">
                <span class="body__item_left">${el.name}</span>
                <span class="body__item_right">${el.quantity} <i class="fa-solid fa-trash-can"></i></span>
              </div>
              `
            })
            .join('')}
        </div>
          <!-- Тут будут появляться добавленнные товары -->
      </div>
      <div class="basket__footer" id="place-price">
        <div class="basket__total"><span>Итого: ${this.dataBasket.price} руб.</span></div>
      </div>
      <div class="basket__btn" >
        <button><span>Оформить заказ</span></button>
      </div>
    </div>
  </div>`)
  }
  listener() {
    const basketBody = document.getElementById('place-for-body-item')
    basketBody.addEventListener('click', (e) => {
      if (e.target.closest('.fa-trash-can')) {
        const currBodyItem = e.target.closest('.body__item').id
        this.removeItem(currBodyItem)
      }
    })
  }
  addItem(data) {
    getArrayOfBasket(this.arrayOfGoods, data.id, data.name, data.quantity, data.price)
    this.destroy('basket-subRoot')
    this.dataBasket.price = getTotalPrice(this.arrayOfGoods, this.dataBasket.price)
  }

  removeItem(sendedId) {
    const removingItem = this.arrayOfGoods.find((el) => el.id === sendedId)
    this.arrayOfGoods = this.arrayOfGoods.filter((el) => el != removingItem)
    this.destroy('basket-subRoot')
    this.dataBasket.price = getTotalPrice(this.arrayOfGoods, this.dataBasket.price)
  }
}
function getTotalPrice(array, price) {
  const totalPrice = array.reduce((total, element) => {
    return (total += element.price * element.quantity)
  }, 0)
  return (price = totalPrice)
}
function getArrayOfBasket(array, id, name, quantity, price) {
  if (array.length === 0) {
    array.push({ id: 'body__item-' + id, name: name, quantity: quantity, price: price })
  } else {
    const finded = array.find((el) => {
      if (el.id === 'body__item-' + id) {
        el.quantity = quantity
        return el
      }
    })
    //Проверяем, если finded - undef или мы нашли совпадение
    if (!finded) {
      array.push({ id: 'body__item-' + id, name: name, quantity: quantity, price: price })
    }
  }
}
