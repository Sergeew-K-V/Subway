import Component from './Component'

export default class Basket extends Component {
  constructor(props) {
    super()
    // this.arrayOfGoods = []
    this.emitter = props.emitter
    this.id = 'basket-root'
    this.dataBasket = new Proxy(
      {
        price: 0,
        arrayOfGoods: [],
      },
      {
        set: (target, key, value) => {
          if (key === 'arrayOfGoods') {
            console.log('arrayOfGoods setter')
            if (value != null && !Array.isArray(value)) {
              target.arrayOfGoods.push(value)
            }
            if (Array.isArray(value)) {
              target.arrayOfGoods = []
            }
          }
          if (key === 'price') {
            console.log('price setter')
            target.price
          }
          target.price = this.dataBasket.arrayOfGoods.reduce((total, element) => {
            return (total += element.price * element.quantity)
          }, 0)
          this.destroy('basket-subRoot')
          this.renderComp(this.getContent, document.getElementById(this.id))
          this.emitter.emit('faTrashClick')
          return true
        },
        get: (target, key) => {
          console.log('getter target[key]', target[key])
          return target[key]
        },
      }
    )
    this.renderComp(this.getContent, document.getElementById(this.id))
    this.emitter.emit('faTrashClick')

    this.emitter.subscribe('sendObjToBasket', (data) => {
      console.log('EMITER adding item - basket')
      this.addItem(data)
    })

    this.emitter.subscribe('faTrashClick', () => {
      console.log('EMITER removing item - basket')
      const basketBody = document.getElementById('place-for-body-item')
      basketBody.addEventListener('click', (e) => {
        if (e.target.closest('.fa-trash-can')) {
          const currBodyItem = e.target.closest('.body__item').id
          this.removeItem(currBodyItem)
        }
      })
    })
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
          ${this.dataBasket.arrayOfGoods
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
  addItem(data) {
    console.log('adding item - basket')
    const convertedObj = {
      id: 'body__item-' + data.id,
      name: data.name,
      quantity: data.quantity,
      price: data.price,
    }
    if (this.dataBasket.arrayOfGoods.length === 0) {
      this.dataBasket.arrayOfGoods = convertedObj
    } else {
      const finded = this.dataBasket.arrayOfGoods.find((el) => {
        if (el.id === 'body__item-' + data.id) {
          el.quantity = data.quantity
          return el
        }
      })
      this.dataBasket.arrayOfGoods = null
      //Проверяем, если finded - undef или мы нашли совпадение
      if (!finded) {
        this.dataBasket.arrayOfGoods = convertedObj
      }
    }
  }

  removeItem(sendedId) {
    console.log('removing item - basket')
    const removingItem = this.dataBasket.arrayOfGoods.find((el) => el.id === sendedId)
    const tempArray = this.dataBasket.arrayOfGoods.filter((el) => el != removingItem)
    this.dataBasket.arrayOfGoods = []
    for (let i = 0; i < tempArray.length; i++) {
      this.dataBasket.arrayOfGoods = tempArray[i]
    }
  }
}
// function getTotalPrice(array, price) {
//   const totalPrice = array.reduce((total, element) => {
//     return (total += element.price * element.quantity)
//   }, 0)
//   return (price = totalPrice)
// }
// function getArrayOfBasket(array, id, name, quantity, price) {
//   if (array.length === 0) {
//     array.push({ id: 'body__item-' + id, name: name, quantity: quantity, price: price })
//   } else {
//     const finded = array.find((el) => {
//       if (el.id === 'body__item-' + id) {
//         el.quantity = quantity
//         return el
//       }
//     })
//     //Проверяем, если finded - undef или мы нашли совпадение
//     if (!finded) {
//       array.push({ id: 'body__item-' + id, name: name, quantity: quantity, price: price })
//     }
//   }
// }
