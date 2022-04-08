import Component from './Component'
//Добавить в спан "Выберите размер сэндвича - айдишники и в зависимости от активного/айди класса показывать нужный спан"
export default class Modal extends Component {
  constructor(props) {
    super()
    this.id = 'modal-root'
    this.price = 0
    this.currentPage = 0
    this.content = `
    <div class="modal-overlay">
      <div class="modal">
        <div class="container-modal">
          <div class="modal__block">
            <div class="modal__header">
              <span>Выберите размер сендвича</span>
              <div class="modal__close">
                <span></span>
              </div>
            </div>
            <div class="modal__body" id="place-for-modal-content">
              <div class="body__navbar">
                <ul class="body__navbar-section">
                  <li class="navbar__item sizes selected" id="navbar-item-0">Размер</li>
                  <li class="navbar__item breads"id="navbar-item-1">Хлеб</li>
                  <li class="navbar__item vegetables"id="navbar-item-2">Овощи</li>
                  <li class="navbar__item sauces"id="navbar-item-3">Соусы</li>
                  <li class="navbar__item fillings"id="navbar-item-4">Начинка</li>
                  <li class="navbar__item total"id="navbar-item-5">Готово!</li>
                </ul>
              </div>
              <div class="modal__btn-list">
                <button class="modal__btn"id="btn-back">
                  <i class="fa-solid fa-chevron-left" ></i><span>Назад</span>
                </button>
                <button class="modal__btn"id="btn-next">
                  <span>Вперед</span><i class="fa-solid fa-angle-right"></i>
                </button>
              </div>
              <div class="modal__content" id="content-card-root">
                <!-- Сюда рендерится новый контент -->
              
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
    this.renderCurrentPage(props)
  }
  get currentPageValue() {
    return this.currentPage
  }
  set currentPageValue(value) {
    this.currentPage = value
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
  destroyPage(id) {
    const point = document.getElementById(id)
    console.log('delete place for content card')
    point.remove()
  }
  renderCurrentPage(props) {
    this.id = 'content-card-root'
    switch (this.currentPageValue) {
      case 0:
        this.destroyPage(this.id)
        this.renderPageContent(props.sizes)
        break
      case 1:
        this.destroyPage(this.id)
        this.renderPageContent(props.breads)
        break
      case 2:
        this.destroyPage(this.id)
        this.renderPageContent(props.vegetables)
        break
      case 3:
        this.destroyPage(this.id)
        this.renderPageContent(props.sauces)
        break
      case 4:
        this.destroyPage(this.id)
        this.renderPageContent(props.fillings)
        break
      case 5:
        this.destroyPage(this.id)
        this.renderSummaryContent()
        break
      default:
        break
    }
  }
  addListenerOneTarget() {
    //Добавление анимации выбора
    const modalContent = document.getElementById('content-card-root')
    let selected = false
    let lastClickObjId = modalContent.addEventListener('click', (e) => {
      if (e.target.closest('.modal__content-card')) {
        const currId = e.target.closest('.modal__content-card').id
        const currContentCard = document.getElementById(currId)
        if (selected) {
          if (lastClickObjId === e.target.closest('.modal__content-card').id) {
            currContentCard.classList.toggle('select')
            selected = false
            lastClickObjId = e.target.closest('.modal__content-card').id
          } else {
            const removeToggleNode = document.getElementById(lastClickObjId)
            removeToggleNode.classList.toggle('select')
            currContentCard.classList.toggle('select')
            lastClickObjId = e.target.closest('.modal__content-card').id
          }
        } else {
          currContentCard.classList.toggle('select')
          selected = true
          lastClickObjId = e.target.closest('.modal__content-card').id
        }
        console.log('select')
        console.log('selectedState', selected)
      }
    })
  }
  addListenerFewTarget() {
    //Добавление анимации выбора
    const modalContent = document.getElementById('content-card-root')
    let selected = false
    modalContent.addEventListener('click', (e) => {
      if (e.target.closest('.modal__content-card')) {
        const currId = e.target.closest('.modal__content-card').id
        const currContentCard = document.getElementById(currId)
        currContentCard.classList.toggle('select')
        console.log('selectFew')
      }
    })
  }
  renderPageContent(props) {
    this.content = `<div class="modal__content" id="content-card-root">
      <!-- Сюда рендерится новый контент -->
    </div>`
    this.id = 'place-for-modal-content'
    this.renderComp(this.content, document.getElementById(this.id))
    for (const el in props) {
      this.content = `<div class="modal__content-card" id="modal-${props[el].id}">
        <div class="content-card__block">
          <div class="content-card__img">
            <img src="/src/img${props[el].image}" alt="el-15cm" />
          </div>
          <div class="content-card__text">${props[el].name}</div>
          <div class="content-card__price">Цена: ${props[el].price} руб.</div>
        </div>
      </div>`
      this.id = 'content-card-root'
      this.renderComp(this.content, document.getElementById(this.id))
    }
  }
  renderSummaryContent() {
    this.content = `<div class="modal__content" id="content-card-root">
      <!-- Сюда рендерится новый контент -->
    </div>`
    this.id = 'place-for-modal-content'
    this.renderComp(this.content, document.getElementById(this.id))

    this.content = `<div class="modal__content-total" id="modal-">
    <div class="content-total__block">
      <div class="block__left">
        <div class="content-total__img ">
          <img src="/src/img" alt="el-15cm" />
        </div>
      </div>
      <div class="block__right">
        <div class="right__top">
          <h2>Ваш сенвич готов!</h2>
        </div>
        <div class="right__middle">
          <div class="middle__size">
            <span>Размер: 15 См</span>
          </div>
          <div class="middle__bread">
            <span>Хлеб: Белый итальянский </span>
          </div>
          <div class="middle__vegentables">
            <span>Овощи: нет</span>
          </div>
          <div class="middle__sauces">
            <span>Соусы: Барбекю</span>
          </div>
          <div class="middle__fillings">
            <span>Начинка: нет</span>
          </div>
        </div>
        <div class="right__bottom">
          <div class="bottom__name">
            <span>Custom sandwich</span>
          </div>
        </div>
      </div>
    </div>
  </div>`
    this.id = 'content-card-root'
    this.renderComp(this.content, document.getElementById(this.id))
  }
}
