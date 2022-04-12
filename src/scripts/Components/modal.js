import Component from './Component'
export default class Modal extends Component {
  constructor(props) {
    super()
    this.id = 'modal-root'
    this.price = 0
    this.quantity = 0
    this.currentPage = 0
    this.customSubway = {
      id: 'customSubway-' + `${Math.floor(Math.random())}}`,
      name: 'Custom-Subway ' + `${Date.now()}`,
      price: 0 || this.price,
      quantity: 0 || this.quantity,
      idChanged: false,
      size: 'Not selected',
      bread: 'Not selected',
      vegetables: [],
      sauces: [],
      fillings: [],
    }
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
  joinDataForCustom(props) {
    const modalContent = document.getElementById('content-card-root')
    if (!this.customSubway.idChanged) {
      for (let key in props) {
        for (let secKey in props[key]) {
          props[key][secKey].id = 'modal-' + props[key][secKey].id
          console.log(props[key][secKey].id)
        }
        this.customSubway.idChanged = true
      }
    }
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
    point.remove()
  }
  destroyPage(id) {
    const point = document.getElementById(id)
    point.remove()
    const priceId = 'modal-total-bottom-root'
    const pointPrice = document.getElementById(priceId)
    pointPrice.remove()
  }
  renderCurrentPage(props) {
    this.joinDataForCustom(props)
    this.id = 'content-card-root'
    switch (this.currentPageValue) {
      case 0:
        this.destroyPage(this.id)
        this.renderPageContent(props.sizes)
        this.addListenerModal(undefined, props.sizes, this.customSubway, 'sizes')
        break
      case 1:
        this.destroyPage(this.id)
        this.renderPageContent(props.breads)
        this.addListenerModal(undefined, props.breads, this.customSubway, 'breads')
        break
      case 2:
        this.destroyPage(this.id)
        this.renderPageContent(props.vegetables)
        this.addListenerModal(
          Object.keys(props.vegetables).length,
          props.vegetables,
          this.customSubway,
          'vegetables'
        )
        break
      case 3:
        this.destroyPage(this.id)
        this.renderPageContent(props.sauces)
        this.addListenerModal(3, props.sauces, this.customSubway, 'sauces')
        break
      case 4:
        this.destroyPage(this.id)
        this.renderPageContent(props.fillings)
        this.addListenerModal(
          Object.keys(props.fillings).length,
          props.fillings,
          this.customSubway,
          'fillings'
        )
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
  // getSelectedToCustom(props, property) {
  //   const modalContent = document.getElementById('content-card-root')
  //   modalContent.addEventListener('click', (e) => {
  //     if (e.target.closest('.modal__content-card')) {
  //       const currId = e.target.closest('.modal__content-card').id
  //       const currContentCard = document.getElementById(currId)
  //       console.log(currId)
  //       for (let el in props) {
  //         if (currId === props[el].id) {
  //           property = props[el].name
  //           return property
  //         }
  //       }
  //       console.log('this.customSubway.property', property)
  //     }
  //   })
  // }

  addListenerModal(maxSelectedItem = 1, props, customSub, typeOfProp) {
    //Добавление анимации выбора
    const modalContent = document.getElementById('content-card-root')
    if (maxSelectedItem === 1) {
      let selected = false // Animtaion only
      let selectedId
      let lastClickObjId = modalContent.addEventListener('click', (e) => {
        if (e.target.closest('.modal__content-card')) {
          const currId = e.target.closest('.modal__content-card').id
          const currContentCard = document.getElementById(currId)

          if (selected) {
            if (lastClickObjId === e.target.closest('.modal__content-card').id) {
              currContentCard.classList.toggle('select')
              selected = false
              selectedId = null
              lastClickObjId = e.target.closest('.modal__content-card').id
            } else {
              const removeToggleNode = document.getElementById(lastClickObjId)
              removeToggleNode.classList.toggle('select')
              currContentCard.classList.toggle('select')
              selectedId = currId
              lastClickObjId = e.target.closest('.modal__content-card').id
            }
          } else {
            currContentCard.classList.toggle('select')
            selected = true
            selectedId = currId
            lastClickObjId = e.target.closest('.modal__content-card').id
          }
          switch (typeOfProp) {
            case 'sizes':
              if (selectedId !== null) {
                for (let el in props) {
                  if (selectedId === props[el].id) {
                    customSub.size = props[el].name
                  }
                }
              } else {
                customSub.size = 'Not selected'
              }
              break
            case 'breads':
              if (selectedId !== null) {
                for (let el in props) {
                  if (selectedId === props[el].id) {
                    customSub.bread = props[el].name
                  }
                }
              } else {
                customSub.bread = 'Not selected'
              }
              break
          }

          console.log('this.customSubway', customSub.size)
          console.log('select')
          console.log('selectedState', selected)
        }
      })
    } else {
      let currentSelectedItem = 0
      let selected = []
      modalContent.addEventListener('click', (e) => {
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
        switch (typeOfProp) {
          case 'vegetables':
            if (selected.length !== 0) {
              for (let el in props) {
                if (!customSub.vegetables.includes(props[el].name)) {
                  if (selected.includes(props[el].id)) {
                    customSub.vegetables.push(props[el].name)
                  }
                }
              }
            } else {
              console.log('empty vegetables')
            }
            break
          case 'sauces':
            if (selected.length !== 0) {
              for (let el in props) {
                if (!customSub.sauces.includes(props[el].name)) {
                  if (selected.includes(props[el].id)) {
                    customSub.sauces.push(props[el].name)
                  }
                }
              }
            } else {
              console.log('empty sauces')
            }
            break
          case 'fillings':
            if (selected.length !== 0) {
              for (let el in props) {
                if (!customSub.fillings.includes(props[el].name)) {
                  if (selected.includes(props[el].id)) {
                    customSub.fillings.push(props[el].name)
                  }
                }
              }
            } else {
              console.log('empty fillings')
            }
            break
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
      this.content = `<div class="modal__content-card" id="${props[el].id}">
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
                      <span>Итого: ${this.customSubway.price} руб.</span>
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

    this.content = `<div class="modal__content-total" id="modal-summary">
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
                              <span>Размер: ${this.customSubway.size}</span>
                            </div>
                            <div class="middle__bread middle__item">
                              <span>Хлеб: ${this.customSubway.bread}</span>
                            </div>
                            <div class="middle__vegentables middle__item">
                              <span>Овощи: ${this.customSubway.vegetables} </span>
                            </div>
                            <div class="middle__sauces middle__item">
                              <span>Соусы: ${this.customSubway.sauces} </span>
                            </div>
                            <div class="middle__fillings middle__item">
                              <span>Начинка: ${this.customSubway.fillings} </span>
                            </div>
                          </div>
                          <div class="right__bottom">
                            <div class="bottom__name">
                              <span>${this.customSubway.name}</span>
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
                          <span>Цена: ${this.customSubway.price} руб.</span>
                          <div class="modal__btn-to-basket">
                            <button class="btn-to-basket__btn">В корзину</button>
                          </div>
                        </div>
                      </div>`
    this.id = 'modal-total-bottom-root'
    this.renderComp(this.content, document.getElementById(this.id))
  }
}
