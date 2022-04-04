import Component from './Component'

export default class Basket extends Component {
  constructor() {
    super()
    this.headerBlock = `<div class="navbar__basket-block" id="basket-content-root"></div>`
    this.renderComp(this.headerBlock, document.getElementById('basket-root'))
    this.content = `
        <!-- Макет будет набросан здесь, но в будущем его надо сделать в отдельный класс, чтобы следить за состоянием и подумать как организовать либо прокрутку(если много товаров) или она будет бесконечно вниз идти -->
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
              <p>Я товар, ты товар, мы товары</p>
            </div>
          </div>
          <div class="basket__footer">
            <div class="basket__total"><span>Итого: 0 руб.</span></div>
          </div>
          <div class="basket__btn">
            <button><span>Оформить заказ</span></button>
          </div>
        </div>`
    this.renderComp(this.content, document.getElementById('basket-content-root'))
  }
}
