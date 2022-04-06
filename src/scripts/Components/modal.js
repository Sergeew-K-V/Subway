import Component from './Component'
//Добавить в спан "Выберите размер сэндвича - айдишники и в зависимости от активного/айди класса показывать нужный спан"
export default class Modal extends Component {
  constructor(props) {
    super()
    this.id = 'modal-root'
    this.price = 0
    this.content = `<div class="modal-overlay">
    <div class="modal">
      <div class="container-modal">
        <div class="modal__block">
          <div class="modal__header">
            <span>Выберите размер сендвича</span>
            <div class="modal__close">
              <span></span>
            </div>
          </div>
          <div class="modal__body">
            <div class="body__navbar">
              <ul class="body__navbar-section">
                <li class="navbar__item selected">Размер</li>
                <li class="navbar__item">Хлеб</li>
                <li class="navbar__item">Овощи</li>
                <li class="navbar__item">Соусы</li>
                <li class="navbar__item">Начинка</li>
                <li class="navbar__item">Готово!</li>
              </ul>
            </div>
            <div class="modal__btn-list">
              <button class="modal__btn">
                <i class="fa-solid fa-chevron-left"></i><span>Назад</span>
              </button>
              <button class="modal__btn">
                <span>Вперед</span><i class="fa-solid fa-angle-right"></i>
              </button>
            </div>
            <div class="modal__content" id="content-card-root">
            
            </div>
          </div>
          <div class="modal__footer">
            <span>Итого: ${this.priceValue} руб.</span>
          </div>
        </div>
      </div>
    </div>
    </div>`
    this.renderComp(this.content, document.getElementById(this.id)) //modalRoot - место рендеринга модального окна
    this.renderSizesContent(props.sizes)
  }
  get priceValue() {
    return this.price
  }
  set priceValue(value) {
    this.price += value
  }
  destroy() {
    const point = document.querySelector('.modal-overlay')
    console.log('close modal')
    point.remove()
  }
  renderSizesContent(props) {
    for (const size in props) {
      this.content = `<div class="modal__content-card" id="modal-${props[size].id}">
        <div class="content-card__block">
          <div class="content-card__img">
            <img src="/src/img${props[size].image}" alt="size-15cm" />
          </div>
          <div class="content-card__text">${props[size].name}</div>
          <div class="content-card__price">Цена: ${props[size].price} руб.</div>
        </div>
      </div>`
      this.id = 'content-card-root'
      this.renderComp(this.content, document.getElementById(this.id))
    }
  }
}
