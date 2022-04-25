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
          if (key === 'currentPage') {
            target.currentPage = value
          }
          if (key === 'price') {
            target.price += value
          }
          if (key === 'quantity') {
            target.quantity += value
          }
          const data = this.currentData(props)
          this.destroy('modal-overlay')
          this.currentArrayOfData = []

          this.renderComp(this.getContent, document.getElementById(this.id)) //modalRoot - место рендеринга модального окна
          if (this.dataModal.currentPage !== 5) {
            this.currentArrayOfData = this.initData(data.props)
          } else {
            this.currentArrayOfData = this.initData(data.props)
            this.listenerForBtnToBasket()
          }

          this.emitter.emit('onSelectCard', data)
          this.listenerModalClose(props)
          this.listenerFotQuantityBtn()
          this.listenerNavbarItem()
          this.listenerOnBtnNextAndBack()
          console.log("it's setter of dataModal -", key, target[key])
          return true
        },
      }
    )
    this.renderComp(this.getContent, document.getElementById(this.id)) //modalRoot - место рендеринга модального окна
    this.currentArrayOfData = this.initData(props.sizes)

    this.subscribeCheck()
    this.emitter.subscribe('onSelectCard', ({ props, maxSelect = 1, type }) => {
      const modalContent = document.getElementById('content-card-root')
      if (maxSelect === 1) {
        modalContent.addEventListener('click', (e) => {
          if (e.target.closest('.modal__content-card')) {
            const currId = e.target.closest('.modal__content-card').id
            switch (type) {
              case 'sizes':
                if (this.customSubway.sizeId !== '') {
                  if (currId === this.customSubway.sizeId) {
                    this.customSubway.sizeId = null
                    for (let key in props) {
                      if (props[key].id === currId) {
                        props[key].selected = !props[key].selected
                        this.customSubway.size = 'Not selected'
                      }
                    }
                    this.actualPrice(props, currId)
                  } else {
                    for (let key in props) {
                      if (props[key].id === this.customSubway.sizeId) {
                        props[key].selected = !props[key].selected
                        this.customSubway.size = 'Not selected'
                      }
                    }
                    this.actualPrice(props, this.customSubway.sizeId)
                    this.customSubway.sizeId = currId
                    for (let key in props) {
                      if (props[key].id === currId) {
                        props[key].selected = !props[key].selected
                        this.customSubway.size = props[key].name
                      }
                    }
                    this.actualPrice(props, currId, 'plus')
                  }
                } else {
                  this.customSubway.sizeId = currId
                  for (let key in props) {
                    if (props[key].id === currId) {
                      props[key].selected = !props[key].selected
                      this.customSubway.size = props[key].name
                    }
                  }
                  this.actualPrice(props, currId, 'plus')
                }
                break
              case 'breads':
                if (this.customSubway.breadId !== '') {
                  if (currId === this.customSubway.breadId) {
                    this.customSubway.breadId = null
                    for (let key in props) {
                      if (props[key].id === currId) {
                        props[key].selected = !props[key].selected
                        this.customSubway.bread = 'Not selected'
                      }
                    }
                    this.actualPrice(props, currId)
                  } else {
                    for (let key in props) {
                      if (props[key].id === this.customSubway.breadId) {
                        props[key].selected = !props[key].selected
                        this.customSubway.bread = 'Not selected'
                      }
                    }
                    this.actualPrice(props, this.customSubway.breadId)
                    this.customSubway.breadId = currId
                    for (let key in props) {
                      if (props[key].id === currId) {
                        props[key].selected = !props[key].selected
                        this.customSubway.bread = props[key].name
                      }
                    }
                    this.actualPrice(props, currId, 'plus')
                  }
                } else {
                  this.customSubway.breadId = currId
                  for (let key in props) {
                    if (props[key].id === currId) {
                      props[key].selected = !props[key].selected
                      this.customSubway.bread = props[key].name
                    }
                  }
                  this.actualPrice(props, currId, 'plus')
                }
                break
            }
          }
        })
      } else {
        modalContent.addEventListener('click', (e) => {
          if (e.target.closest('.modal__content-card')) {
            const currId = e.target.closest('.modal__content-card').id
            switch (type) {
              case 'vegetables':
                if (this.customSubway.vegetablesId.length <= maxSelect) {
                  if (this.customSubway.vegetablesId !== []) {
                    if (this.customSubway.vegetablesId.includes(currId)) {
                      this.customSubway.vegetablesId = this.customSubway.vegetablesId.filter(
                        (el) => el != currId
                      )
                      for (let key in props) {
                        if (props[key].id === currId) {
                          props[key].selected = !props[key].selected
                          this.customSubway.vegetables = this.customSubway.vegetables.filter(
                            (el) => el != ' ' + props[key].name
                          )
                        }
                      }
                      this.actualPrice(props, currId)
                    } else {
                      this.customSubway.vegetablesId.push(currId)
                      for (let key in props) {
                        if (props[key].id === currId) {
                          props[key].selected = !props[key].selected
                          this.customSubway.vegetables.push(' ' + props[key].name)
                        }
                      }
                      this.actualPrice(props, currId, 'plus')
                    }
                  } else {
                    this.customSubway.vegetablesId.push(currId)
                    for (let key in props) {
                      if (props[key].id === currId) {
                        props[key].selected = !props[key].selected
                        this.customSubway.vegetables.push(' ' + props[key].name)
                      }
                    }
                    this.actualPrice(props, currId, 'plus')
                  }
                } else {
                  alert('You have made maximum choices')
                }
                break
              case 'sauces':
                if (this.customSubway.saucesId !== []) {
                  if (this.customSubway.saucesId.includes(currId)) {
                    this.customSubway.saucesId = this.customSubway.saucesId.filter(
                      (el) => el != currId
                    )
                    for (let key in props) {
                      if (props[key].id === currId) {
                        props[key].selected = !props[key].selected
                        this.customSubway.sauces = this.customSubway.sauces.filter(
                          (el) => el != ' ' + props[key].name
                        )
                      }
                    }
                    this.actualPrice(props, currId)
                  } else {
                    if (this.customSubway.saucesId.length + 1 <= maxSelect) {
                      this.customSubway.saucesId.push(currId)
                      for (let key in props) {
                        if (props[key].id === currId) {
                          props[key].selected = !props[key].selected
                          this.customSubway.sauces.push(' ' + props[key].name)
                        }
                      }
                      this.actualPrice(props, currId, 'plus')
                    } else {
                      alert('You have made maximum choices')
                    }
                  }
                } else {
                  this.customSubway.saucesId.push(currId)
                  for (let key in props) {
                    if (props[key].id === currId) {
                      props[key].selected = !props[key].selected
                      this.customSubway.sauces.push(' ' + props[key].name)
                    }
                  }
                  this.actualPrice(props, currId, 'plus')
                }
                break
              case 'fillings':
                if (this.customSubway.fillingsId.length <= maxSelect) {
                  if (this.customSubway.fillingsId !== []) {
                    if (this.customSubway.fillingsId.includes(currId)) {
                      this.customSubway.fillingsId = this.customSubway.fillingsId.filter(
                        (el) => el != currId
                      )
                      for (let key in props) {
                        if (props[key].id === currId) {
                          props[key].selected = !props[key].selected
                          this.customSubway.fillings = this.customSubway.fillings.filter(
                            (el) => el != ' ' + props[key].name
                          )
                        }
                      }
                      this.actualPrice(props, currId)
                    } else {
                      this.customSubway.fillingsId.push(currId)
                      for (let key in props) {
                        if (props[key].id === currId) {
                          props[key].selected = !props[key].selected
                          this.customSubway.fillings.push(' ' + props[key].name)
                        }
                      }
                      this.actualPrice(props, currId, 'plus')
                    }
                  } else {
                    this.customSubway.fillingsId.push(currId)
                    for (let key in props) {
                      if (props[key].id === currId) {
                        props[key].selected = !props[key].selected
                        this.customSubway.fillings.push(' ' + props[key].name)
                      }
                    }
                    this.actualPrice(props, currId, 'plus')
                  }
                } else {
                  alert('You have made maximum choices')
                }
                break
            }
          }
        })
      }
    })
    this.dataModal.currentPage = 0
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
  listenerOnBtnNextAndBack() {
    const btnNext = document.getElementById('btn-next')
    btnNext.addEventListener('click', () => {
      this.dataModal.currentPage = this.dataModal.currentPage + 1
    })
    const btnBack = document.getElementById('btn-back')
    btnBack.addEventListener('click', () => {
      this.dataModal.currentPage = this.dataModal.currentPage - 1
    })
  }
  listenerNavbarItem() {
    const navbarList = document.querySelector('.body__navbar-section')
    navbarList.addEventListener('click', (e) => {
      if (e.target.closest('.navbar__item')) {
        const currNavbarId = e.target.closest('.navbar__item').id
        if (currNavbarId !== `navbar-item-${this.dataModal.currentPage}`) {
          this.dataModal.currentPage = +currNavbarId.slice(-1)
        }
      }
    })
  }
  listenerModalClose(props) {
    const modalClose = document.querySelector('.modal__close')
    modalClose.addEventListener('click', () => {
      this.destroy('modal-overlay')
      for (let key in props) {
        for (let secKey in props[key]) {
          props[key][secKey].selected = false
        }
      }
    })
  }
  listenerFotQuantityBtn() {
    const modalFooter = document.getElementById('modal-total-bottom-root')
    modalFooter.addEventListener('click', (e) => {
      //Изменение кол-ва бутербродов
      if (
        e.target.closest('.subway__block') === modalFooter.querySelector('.fa-minus') ||
        modalFooter.querySelector('.fa-plus') ||
        modalFooter.querySelector('.btns-list__btn')
      ) {
        if (e.target === modalFooter.querySelector('.fa-minus')) {
          if (this.dataModal.quantity === 0) {
          } else {
            this.dataModal.quantity = -1
          }
        }
        if (e.target === modalFooter.querySelector('.fa-plus')) {
          this.dataModal.quantity = 1
        }
      }
    })
  }
  listenerForBtnToBasket() {
    const modalFooter = document.getElementById('modal-total-bottom-root')
    const modalBtnToBasket = modalFooter.querySelector('.btn-to-basket__btn')
    modalBtnToBasket.addEventListener('click', () => {
      if (this.dataModal.quantity !== 0) {
        console.log('Sending obj to basket')
        this.emitter.emit('sendObjToBasket', {
          id: this.customSubway.id,
          name: this.customSubway.name,
          price: this.dataModal.price,
          quantity: this.dataModal.quantity,
        })
      } else {
        alert('Укажите кол-во товара, чтобы добавить')
      }
    })
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
          maxSelect: Object.keys(props.vegetables).length,
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
          maxSelect: Object.keys(props.fillings).length,
          type: Object.keys(props).includes('fillings') ? 'fillings' : new Error('not type'),
        }
      case 5:
        return {}
    }
  }
  initData(props) {
    const array = []
    for (let key in props) {
      const card = new ModalCard(props[key], this.emitter)
      array.push(card)
    }
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
                <li class="navbar__item ${
                  this.dataModal.currentPage === 0 ? 'selected' : ''
                }" id="navbar-item-0">Размер</li>
                <li class="navbar__item ${
                  this.dataModal.currentPage === 1 ? 'selected' : ''
                }"id="navbar-item-1">Хлеб</li>
                <li class="navbar__item ${
                  this.dataModal.currentPage === 2 ? 'selected' : ''
                }"id="navbar-item-2">Овощи</li>
                <li class="navbar__item ${
                  this.dataModal.currentPage === 3 ? 'selected' : ''
                }"id="navbar-item-3">Соусы</li>
                <li class="navbar__item ${
                  this.dataModal.currentPage === 4 ? 'selected' : ''
                }"id="navbar-item-4">Начинка</li>
                <li class="navbar__item ${
                  this.dataModal.currentPage === 5 ? 'selected' : ''
                }"id="navbar-item-5">Готово!</li>
              </ul>
            </div>
            <div class="modal__btn-list ${this.dataModal.currentPage === 0 ? 'hiddenBack' : ''} ${
      this.dataModal.currentPage === 5 ? 'hiddenNext' : ''
    }">
              <button class="modal__btn ${
                this.dataModal.currentPage === 0 ? 'hidden' : ''
              }"id="btn-back">
                <i class="fa-solid fa-chevron-left" ></i><span>Назад</span>
              </button>
              <button class="modal__btn ${
                this.dataModal.currentPage === 5 ? 'hidden' : ''
              }"id="btn-next">
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
  actualPrice(props, curContCardId, action = 'minus') {
    console.log('actualPrice')
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
}
