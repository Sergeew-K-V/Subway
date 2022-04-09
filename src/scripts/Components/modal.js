import Component from './Component'
export default class Modal extends Component {
  constructor(props) {
    super()
    this.customSubway = {
      id: 'customSubway-' + `${props.id}`,
      name: 'custom-Subway-' + `${Date.now()}`,
      price: this.priceValue,
      quantity: this.quantityValue,
    }
    debugger
    this.id = 'modal-root'
    this.price = 0
    this.quantity = 0
    this.currentPage = 0
    this.content = `
    <div class="modal-overlay">
      <div class="modal">
        <div class="container-modal">
          <div class="modal__block" id="modal-block">
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
            <div class="modal__footer" id="modal-total-bottom-root">
              <div class="modal__total-price">
                <span>Итого: ${this.priceValue} руб.</span>
              </div>
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
  get quantityValue() {
    return this.price
  }
  set quantityValue(value) {
    this.price = value
  }
  listenerForBtnBack() {
    const btnBack = document.getElementById('btn-back')
    const btnNext = document.getElementById('btn-next')
    const btnList = document.querySelector('.modal__btn-list')
    if (this.currentPageValue === 0) {
      btnBack.classList.add('hidden')
      btnList.classList.add('hiddenBack')
    } else {
      btnBack.classList.remove('hidden')
      btnList.classList.remove('hiddenBack')
    }
    if (this.currentPageValue === 5) {
      btnNext.classList.add('hidden')
      btnList.classList.add('hiddenNext')
    } else {
      btnNext.classList.remove('hidden')
      btnList.classList.remove('hiddenNext')
    }
  }
  destroyModal() {
    const point = document.querySelector('.modal-overlay')
    console.log('close modal')
    point.remove()
  }
  destroyPage(id) {
    const point = document.getElementById(id)
    console.log('delete place for content card')
    point.remove()
    const priceId = 'modal-total-bottom-root'
    const pointPrice = document.getElementById(priceId)
    pointPrice.remove()
  }
  renderCurrentPage(props) {
    this.id = 'content-card-root'
    switch (this.currentPageValue) {
      case 0:
        this.destroyPage(this.id)
        this.renderPageContent(props.sizes)
        this.addListenerModal()
        break
      case 1:
        this.destroyPage(this.id)
        this.renderPageContent(props.breads)
        this.addListenerModal()
        break
      case 2:
        this.destroyPage(this.id)
        this.renderPageContent(props.vegetables)
        this.addListenerModal(Object.keys(props.vegetables).length)
        break
      case 3:
        this.destroyPage(this.id)
        this.renderPageContent(props.sauces)
        this.addListenerModal(3)
        break
      case 4:
        this.destroyPage(this.id)
        this.renderPageContent(props.fillings)
        this.addListenerModal(Object.keys(props.fillings).length)
        break
      case 5:
        this.destroyPage(this.id)
        this.renderSummaryContent()
        this.addListenerModal()
        break
      default:
        break
    }
  }
  addListenerModal(maxSelectedItem = 1) {
    //Добавление анимации выбора
    const modalContent = document.getElementById('content-card-root')
    if (maxSelectedItem === 1) {
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
    } else {
      let currentSelectedItem = 0
      let selected = []
      let lastClickObjId = modalContent.addEventListener('click', (e) => {
        if (e.target.closest('.modal__content-card')) {
          const currId = e.target.closest('.modal__content-card').id
          const currContentCard = document.getElementById(currId)
          if (selected.includes(currId) && currentSelectedItem === maxSelectedItem) {
            selected = selected.filter((el) => el != currId)
            --currentSelectedItem
            currContentCard.classList.toggle('select')
          } else {
            if (currentSelectedItem === maxSelectedItem) {
              alert('You have made maximum choices')
            } else {
              if (selected.includes(currId)) {
                selected = selected.filter((el) => el != currId)
                --currentSelectedItem
                currContentCard.classList.toggle('select')
              } else {
                currContentCard.classList.toggle('select')
                selected.push(currId)
                ++currentSelectedItem
              }
              console.log('select')
              console.log('selectedState', selected)
            }
          }
        }
      })
    }
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
    this.content = `<div class="modal__footer" id="modal-total-bottom-root">
                    </div>`
    this.id = 'modal-block'
    this.renderComp(this.content, document.getElementById(this.id))
    this.content = `<div class="modal__total-price">
                      <span>Итого: ${this.priceValue} руб.</span>
                    </div>`
    this.id = 'modal-total-bottom-root'
    this.renderComp(this.content, document.getElementById(this.id))
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
                            <img src="/src/img/icons/result_sandwich.jpg" alt="el-15cm" />
                          </div>
                        </div>
                        <div class="block__right">
                          <div class="right__top">
                            <h2>Ваш сенвич готов!</h2>
                          </div>
                          <div class="right__middle">
                            <div class="middle__size middle__item">
                              <span>Размер: 15 См</span>
                            </div>
                            <div class="middle__bread middle__item">
                              <span>Хлеб: Белый итальянский </span>
                            </div>
                            <div class="middle__vegentables middle__item">
                              <span>Овощи: нет</span>
                            </div>
                            <div class="middle__sauces middle__item">
                              <span>Соусы: Барбекю</span>
                            </div>
                            <div class="middle__fillings middle__item">
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
    this.content = `<div class="modal__footer" id="modal-total-bottom-root">
                    </div>`
    this.id = 'modal-block'
    this.renderComp(this.content, document.getElementById(this.id))
    this.content = `<div class="modal__btn-block">
                      <div class="modal-block__text">Количество</div>
                        <div class="modal-block__btns-list">
                            <button class="btns-modal__btn"><i class="fa-solid fa-minus"></i></button>
                            <input type="number" class="btns-modal__btn modal-input" value="${this.quantityValue}" />
                            <button class="btns-modal__btn"><i class="fa-solid fa-plus"></i></button>
                          </div>
                        </div>
                        <div class="modal__total-price">
                          <span>Цена: ${this.priceValue} руб.</span>
                          <div class="modal__btn-to-basket">
                            <button class="btn-to-basket__btn">В корзину</button>
                          </div>
                        </div>
                      </div>`
    this.id = 'modal-total-bottom-root'
    this.renderComp(this.content, document.getElementById(this.id))
  }
}
