import Component from '../Component'
import ModalCard from './ModalCard'
export default class Modal extends Component {
  constructor(props, emitter) {
    super()
    this.id = 'modal-root'
    this.emitter = emitter
    this.customSubway = {
      id: 'customSubway-' + `${Date.now()}`,
      name: 'Subway-' + `${Date.now()}`.slice(7, 14),
      price: 0,
      quantity: 0,
      idChanged: 0,
      size: 'Not selected',
      bread: 'Not selected',
      vegetables: [],
      sauces: [],
      fillings: [],
      sizeId: '',
      breadId: '',
      vegetablesId: [],
      saucesId: [],
      fillingsId: [],
      lastSelectedObj: '',
    }
    this.dataModal = new Proxy(
      {
        currentPage: 0,
        price: this.customSubway.price,
        quantity: this.customSubway.quantity,
      },
      {
        set: (target, key, value) => {
          console.log("it's setter of dataModal -", key, target[key])

          if (key === 'currentPage') {
            target.currentPage = value
          }
          if (key === 'price') {
            target.price = value
          }
          const data = this.currentData(props)
          this.destroy('modal-overlay')
          this.currentArrayOfData = []

          this.renderComp(this.getContent, document.getElementById(this.id)) //modalRoot - место рендеринга модального окна
          if (this.dataModal.currentPage !== 5) {
            this.currentArrayOfData = this.initData(data.props)
          }
          this.emitter.emit('onBtnNextAndBack')
          this.emitter.emit('onNavbarItem')
          this.emitter.emit('animationModalBtn')
          this.emitter.emit('onSelectCard', data)
          this.listenerModalClose()
          return true
        },
      }
    )

    this.renderComp(this.getContent, document.getElementById(this.id)) //modalRoot - место рендеринга модального окна
    this.currentArrayOfData = this.initData(props.sizes)

    this.subscribeCheck()
    this.emitter.subscribe('animationModalBtn', () => {
      const btnBack = document.getElementById('btn-back')
      const btnNext = document.getElementById('btn-next')
      const btnList = document.querySelector('.modal__btn-list')
      if (this.dataModal.currentPage === 0) {
        btnBack.classList.add('hidden')
        btnList.classList.add('hiddenBack')
      } else {
        btnBack.classList.remove('hidden')
        btnList.classList.remove('hiddenBack')
      }
      if (this.dataModal.currentPage === 5) {
        btnNext.classList.add('hidden')
        btnList.classList.add('hiddenNext')
      } else {
        btnNext.classList.remove('hidden')
        btnList.classList.remove('hiddenNext')
      }
    })
    this.emitter.subscribe('onBtnNextAndBack', () => {
      const btnNext = document.getElementById('btn-next')
      btnNext.addEventListener('click', () => {
        if (this.dataModal.currentPage >= 5) {
        } else {
          const selectedNavbar = document.getElementById(
            `navbar-item-${this.dataModal.currentPage}`
          )
          selectedNavbar.classList.remove('selected')
          this.dataModal.currentPage = this.dataModal.currentPage + 1
          const selectedNextNavbar = document.getElementById(
            `navbar-item-${this.dataModal.currentPage}`
          )
          selectedNextNavbar.classList.add('selected')
        }
      })
      const btnBack = document.getElementById('btn-back')
      btnBack.addEventListener('click', () => {
        console.log('btnBack')
        if (this.dataModal.currentPage === 0) {
        } else {
          const selectedNavbar = document.getElementById(
            `navbar-item-${this.dataModal.currentPage}`
          )
          selectedNavbar.classList.remove('selected')
          this.dataModal.currentPage = this.dataModal.currentPage - 1
          const selectedNextNavbar = document.getElementById(
            `navbar-item-${this.dataModal.currentPage}`
          )
          selectedNextNavbar.classList.add('selected')
        }
      })
    })
    this.emitter.subscribe('onNavbarItem', () => {
      const navbarList = document.querySelector('.body__navbar-section')
      navbarList.addEventListener('click', (e) => {
        if (e.target.closest('.navbar__item')) {
          const currNavbarId = e.target.closest('.navbar__item').id
          if (currNavbarId !== `navbar-item-${this.dataModal.currentPage}`) {
            const selectedNavbar = document.getElementById(
              `navbar-item-${this.dataModal.currentPage}`
            )
            selectedNavbar.classList.remove('selected')
            this.dataModal.currentPage = +currNavbarId.slice(-1)
            const selectedNextNavbar = document.getElementById(
              `navbar-item-${this.dataModal.currentPage}`
            )
            selectedNextNavbar.classList.add('selected')
          }
        }
      })
    })
    this.listenerModalClose()
    this.emitter.subscribe('onSelectCard', ({ maxSelectedItem = 1, props, type }) => {
      const modalContent = document.getElementById('content-card-root')
      if (maxSelectedItem === 1) {
        modalContent.addEventListener('click', (e) => {
          if (e.target.closest('.modal__content-card')) {
            const currId = e.target.closest('.modal__content-card').id
            this.customSubway.sizeId = currId
            const currEl = this.currentArrayOfData.find((el) => {
              if (el.id === currId) {
                el.selected = !el.selected
                return el
              }
            })
            for (let key in props) {
              if (props[key].id === currId) {
                props[key].selected = !props[key].selected
              }
              console.log('props[key]', props[key])
            }
            console.log('props', props)

            console.log('currEl.selected', currEl.selected)
            this.dataModal.price = currEl.price
            // console.log(currEl.selected, 'currEl.selected')
          }
        })
      } else {
      }
    })
    this.dataModal.currentPage = 0
  }

  currentData(props) {
    switch (this.dataModal.currentPage) {
      case 0:
        console.log('props.sizes', props.sizes)
        return {
          props: props.sizes,
          maxSelect: 1,
          type: Object.keys(props).includes('sizes') ? 'sizes' : new Error('not type'),
        }
      case 1:
        console.log('props.breads', props.breads)
        return {
          props: props.breads,
          maxSelect: 1,
          type: Object.keys(props).includes('breads') ? 'breads' : new Error('not type'),
        }
      case 2:
        console.log('props.vegetables', props.vegetables)
        return {
          props: props.vegetables,
          maxSelect: Object.keys(props.vegetables),
          type: Object.keys(props).includes('vegetables') ? 'vegetables' : new Error('not type'),
        }
      case 3:
        console.log('props.sauces', props.sauces)
        return {
          props: props.sauces,
          maxSelect: 3,
          type: Object.keys(props).includes('sauces') ? 'sauces' : new Error('not type'),
        }
      case 4:
        console.log('props.fillings', props.fillings)
        return {
          props: props.fillings,
          maxSelect: Object.keys(props.fillings),
          type: Object.keys(props).includes('fillings') ? 'fillings' : new Error('not type'),
        }
      case 5:
        return {}
    }
  }
  subscribeCheck() {
    for (let key in this.emitter.events) {
      if (
        key === 'animationModalBtn' ||
        key === 'onBtnNextAndBack' ||
        key === 'onNavbarItem' ||
        key === 'onSelectCard'
      ) {
        this.emitter.unsubscribeTargetEventName(key)
      }
    }
  }
  initData(props) {
    const array = []
    for (let key in props) {
      const card = new ModalCard(props[key], this.emitter)
      array.push(card)
    }
    this.currentArrayOfData = array
    return array
  }
  get getContent() {
    this.content = `
    <div class="modal-overlay" id="modal-overlay">
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
                <li class="navbar__item sizes ${
                  this.dataModal.currentPage === 0 ? 'selected' : ''
                }" id="navbar-item-0">Размер</li>
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
            <div class="modal__content" id="content-card-root">`
    if (this.dataModal.currentPage === 5) {
      return `${this.content}
                  <!-- Сюда рендерится новый контент -->
                  <div class="modal__content-total" id="modal-summary">
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
                              <span>Овощи: ${this.customSubway.vegetables}</span>
                            </div>
                            <div class="middle__sauces middle__item">
                              <span>Соусы: ${this.customSubway.sauces}</span>
                            </div>
                            <div class="middle__fillings middle__item">
                              <span>Начинка: ${this.customSubway.fillings}</span>
                            </div>
                          </div>
                          <div class="right__bottom">
                            <div class="bottom__name">
                              <span>${this.customSubway.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <div class="modal__footer" id="modal-total-bottom-root">
                <div class="modal__btn-block">
                  <div class="modal-block__text">Количество</div>
                    <div class="modal-block__btns-list">
                      <button class="btns-modal__btn"><i class="fa-solid fa-minus"></i></button>
                      <input type="number" class="btns-modal__btn modal-input" value="${this.dataModal.quantity}" />
                      <button class="btns-modal__btn"><i class="fa-solid fa-plus"></i></button>
                    </div>
                  </div>
                  <div class="modal__total-price">
                    <span>Цена: ${this.dataModal.price} руб.</span>
                    <div class="modal__btn-to-basket">
                      <button class="btn-to-basket__btn">В корзину</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
    } else {
      return `${this.content}
                  <!-- Сюда рендерится новый контент -->
                  ${this.currentArrayOfData !== undefined ? this.currentArrayOfData : ''}
                </div>
              </div>
              <div class="modal__footer" id="modal-total-bottom-root">
                <div class="modal__total-price">
                  <span>Итого: ${this.dataModal.price} руб.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
    }
  }
  listenerModalClose() {
    const modalClose = document.querySelector('.modal__close')
    modalClose.addEventListener('click', () => {
      this.destroy('modal-overlay')
    })
  }
  actualPrice(props, curContCardId, action = 'minus') {
    if (action === 'plus') {
      for (let el in props) {
        if (curContCardId === props[el].id) {
          this.dataModal.price = +props[el].price
        }
      }
    } else {
      for (let el in props) {
        if (curContCardId === props[el].id) {
          this.dataModal.price = -props[el].price
        }
      }
    }
  }

  // listenerForBtnToBasket() {
  //   const modalFooter = document.getElementById('modal-total-bottom-root')
  //   const modalBtnToBasket = modalFooter.querySelector('.btn-to-basket__btn')
  //   modalBtnToBasket.addEventListener('click', () => {
  //     if (this.quantityValue !== 0) {
  //       basket.quantityValue = this.customSubway.quantity
  //       basket.priceValue = this.customSubway.price
  //       basket.nameValue = this.customSubway.name
  //       basket.addItem(this.customSubway.id)
  //     } else {
  //       basket.removeItem('body__item-' + this.customSubway.id)
  //     }
  //   })
  // }
}
