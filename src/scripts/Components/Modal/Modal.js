import Component from '../Component'
import ModalCard from './ModalCard'
export default class Modal extends Component {
  constructor(props, emitter) {
    super()
    this.id = 'modal-root'
    // this.currentPage = 0
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
    }
    this.dataModal = new Proxy(
      {
        currentPage: 0,
        price: this.customSubway.price,
        quantity: this.customSubway.quantity,
      },
      {
        set: (target, key, value) => {
          console.log("it's setter of dataModal - currPage")
          target[key] = value
          console.log(target[key])
          return true
        },
      }
    )
    this.currentNavbar = 'navbar-item-' + 0

    this.renderComp(this.getContent, document.getElementById(this.id)) //modalRoot - место рендеринга модального окна
    this.arrayOfSize = this.initData(props.sizes)

    this.emitter.subscribe('btnModalClose', () => {
      const modalClose = document.querySelector('.modal__close')
      modalClose.addEventListener('click', () => {
        this.destroy('modal-overlay')
      })
    })
    this.emitter.subscribe('onBtnNextAndBack', () => {
      const btnNext = document.getElementById('btn-next')
      btnNext.addEventListener('click', () => {
        console.log('btnNext')
        if (this.dataModal.currentPage >= 5) {
        } else {
          //Решил не делать из этих 5 строк метод, тк это будет менее читабельно в классе, чем непосредственно здесь
          const selectedNavbar = document.getElementById(
            `navbar-item-${this.dataModal.currentPage}`
          )
          selectedNavbar.classList.remove('selected')
          this.dataModal.currentPage = +1
          const selectedNextNavbar = document.getElementById(
            `navbar-item-${this.dataModal.currentPage}`
          )
          selectedNextNavbar.classList.add('selected')
          // this.destroy('modal-overlay')
          // this.renderComp(this.getContent, document.getElementById(this.id))
          // this.currentArrayOfData = this.initData(props.breads)
        }
      })
      const btnBack = document.getElementById('btn-back')
      btnBack.addEventListener('click', () => {
        console.log('btnBack')
        if (this.dataModal.currentPage === 0) {
        } else {
          //Решил не делать из этих 5 строк метод, тк это будет менее читабельно в классе, чем непосредственно здесь
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
      this.emitter.emit('btnModalClose')
    })

    this.emitter.emit('onBtnNextAndBack')
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
    if (this.dataModal.currentPage === 5) {
      return (this.content = `
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`)
    } else {
      return (this.content = `
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
                  ${this.currArrayOfData !== undefined ? this.currentArrayOfData : ''}
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
      </div>`)
    }
  }
  // listenerForBtnBack() {
  //   const btnBack = document.getElementById('btn-back')
  //   const btnNext = document.getElementById('btn-next')
  //   const btnList = document.querySelector('.modal__btn-list')
  //   if (this.currentPageValue === 0) {
  //     btnBack.classList.add('hidden')
  //     btnList.classList.add('hiddenBack')
  //   } else {
  //     btnBack.classList.remove('hidden')
  //     btnList.classList.remove('hiddenBack')
  //   }
  //   if (this.currentPageValue === 5) {
  //     btnNext.classList.add('hidden')
  //     btnList.classList.add('hiddenNext')
  //   } else {
  //     btnNext.classList.remove('hidden')
  //     btnList.classList.remove('hiddenNext')
  //   }
  // }

  // listenerFotQuantityBtn() {
  //   const modalFooter = document.getElementById('modal-total-bottom-root')
  //   modalFooter.addEventListener('click', (e) => {
  //     //Изменение кол-ва бутербродов
  //     if (
  //       e.target === modalFooter.querySelector('.fa-minus') ||
  //       modalFooter.querySelector('.fa-plus') ||
  //       modalFooter.querySelector('.btns-modal__btn')
  //     ) {
  //       if (e.target === modalFooter.querySelector('.fa-minus')) {
  //         if (this.quantityValue === 0) {
  //         } else {
  //           this.quantityValue = this.quantityValue - 1
  //           this.renderPrice(true)
  //           this.listenerForBtnToBasket(this.basket)
  //         }
  //       }
  //       if (e.target === modalFooter.querySelector('.fa-plus')) {
  //         this.quantityValue = this.quantityValue + 1
  //         this.renderPrice(true)
  //         this.listenerForBtnToBasket(this.basket)
  //       }
  //     }
  //   })
  // }
  // actualPrice(props, curContCardId, action = 'minus') {
  //   if (action === 'plus') {
  //     for (let el in props) {
  //       if (curContCardId === props[el].id) {
  //         this.priceValue = +props[el].price
  //       }
  //     }
  //   } else {
  //     for (let el in props) {
  //       if (curContCardId === props[el].id) {
  //         this.priceValue = -props[el].price
  //       }
  //     }
  //   }
  // }

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

  // renderCurrentPage(props) {
  //   this.id = 'content-card-root'
  //   switch (this.currentPageValue) {
  //     case 0:
  //       this.renderPageContent(props.sizes, this.id)
  //       this.addListenerModal(undefined, props.sizes, this.customSubway, 'sizes')
  //       break
  //     case 1:
  //       this.renderPageContent(props.breads, this.id)
  //       this.addListenerModal(undefined, props.breads, this.customSubway, 'breads')
  //       break
  //     case 2:
  //       this.renderPageContent(props.vegetables, this.id)
  //       this.addListenerModal(
  //         Object.keys(props.vegetables).length,
  //         props.vegetables,
  //         this.customSubway,
  //         'vegetables'
  //       )
  //       break
  //     case 3:
  //       this.renderPageContent(props.sauces, this.id)
  //       this.addListenerModal(3, props.sauces, this.customSubway, 'sauces')
  //       break
  //     case 4:
  //       this.renderPageContent(props.fillings, this.id)
  //       this.addListenerModal(
  //         Object.keys(props.fillings).length,
  //         props.fillings,
  //         this.customSubway,
  //         'fillings'
  //       )
  //       break
  //     case 5:
  //       this.renderSummaryContent(this.id)
  //       this.addListenerModal()
  //       break
  //     default:
  //       break
  //   }
  // }

  // addListenerModal(maxSelectedItem = 1, props, customSub, typeOfProp) {
  //   //Добавление анимации выбора
  //   const modalContent = document.getElementById('content-card-root')
  //   if (maxSelectedItem === 1) {
  //     let selected = false // animation only
  //     let selectedId
  //     let lastClickObjId

  //     //check exist selected item or not
  //     switch (typeOfProp) {
  //       case 'sizes':
  //         if (customSub.sizeId !== '') {
  //           const alreadySelected = document.getElementById(customSub.sizeId)
  //           alreadySelected.classList.add('select')
  //           selected = true
  //           selectedId = customSub.sizeId
  //           customSub.lastSelectedObj = customSub.sizeId
  //         }
  //         break
  //       case 'breads':
  //         if (customSub.breadId !== '') {
  //           const alreadySelected = document.getElementById(customSub.breadId)
  //           alreadySelected.classList.add('select')
  //           selected = true
  //           selectedId = customSub.breadId
  //           customSub.lastSelectedObj = customSub.breadId
  //         }
  //         break
  //     }

  //     modalContent.addEventListener('click', (e) => {
  //       if (e.target.closest('.modal__content-card')) {
  //         const currId = e.target.closest('.modal__content-card').id
  //         const currContentCard = document.getElementById(currId)
  //         if (selected) {
  //           if (
  //             lastClickObjId === e.target.closest('.modal__content-card').id ||
  //             lastClickObjId === customSub.lastSelectedObj
  //           ) {
  //             currContentCard.classList.toggle('select')
  //             selected = false
  //             selectedId = null
  //             if (typeOfProp === 'sizes') {
  //               customSub.size = 'Not selected'
  //               customSub.sizeId = ''

  //               this.actualPrice(props, currId)
  //             }
  //             if (typeOfProp === 'breads') {
  //               customSub.bread = 'Not selected'
  //               customSub.breadId = ''
  //               this.actualPrice(props, currId)
  //             }
  //             lastClickObjId = e.target.closest('.modal__content-card').id
  //           } else {
  //             const removeToggleNode = document.getElementById(
  //               lastClickObjId || customSub.lastSelectedObj
  //             )
  //             removeToggleNode.classList.toggle('select')
  //             this.actualPrice(props, removeToggleNode.id, this.priceValue)
  //             currContentCard.classList.toggle('select')
  //             this.actualPrice(props, currId, 'plus')
  //             selectedId = currId
  //             lastClickObjId = e.target.closest('.modal__content-card').id
  //           }
  //         } else {
  //           currContentCard.classList.toggle('select')
  //           selected = true
  //           selectedId = currId
  //           this.actualPrice(props, currId, 'plus')
  //           lastClickObjId = e.target.closest('.modal__content-card').id
  //         }
  //       }

  //       switch (typeOfProp) {
  //         case 'sizes':
  //           if (selectedId !== null) {
  //             for (let el in props) {
  //               if (selectedId === props[el].id) {
  //                 customSub.size = props[el].name
  //               }
  //             }
  //             customSub.sizeId = selectedId
  //           }
  //           break
  //         case 'breads':
  //           if (selectedId !== null) {
  //             for (let el in props) {
  //               if (selectedId === props[el].id) {
  //                 customSub.bread = props[el].name
  //               }
  //             }
  //             customSub.breadId = selectedId
  //           }
  //           break
  //       }
  //     })
  //   } else {
  //     let currentSelectedItem = 0
  //     let selected = []

  //     //check exist selected item or not
  //     switch (typeOfProp) {
  //       case 'vegetables':
  //         if (customSub.vegetablesId.length !== 0) {
  //           customSub.vegetablesId.forEach((element) => {
  //             const alreadySelected = document.getElementById(element)
  //             alreadySelected.classList.add('select')
  //             currentSelectedItem++
  //           })
  //           selected = [...customSub.vegetablesId]
  //         }
  //         break
  //       case 'sauces':
  //         if (customSub.saucesId.length !== 0) {
  //           customSub.saucesId.forEach((element) => {
  //             const alreadySelected = document.getElementById(element)
  //             alreadySelected.classList.add('select')
  //             currentSelectedItem++
  //           })
  //           selected = [...customSub.saucesId]
  //         }
  //         break
  //       case 'fillings':
  //         if (customSub.fillingsId.length !== 0) {
  //           customSub.fillingsId.forEach((element) => {
  //             const alreadySelected = document.getElementById(element)
  //             alreadySelected.classList.add('select')
  //             currentSelectedItem++
  //           })
  //           selected = [...customSub.fillingsId]
  //         }
  //         break
  //     }

  //     modalContent.addEventListener('click', (e) => {
  //       if (e.target.closest('.modal__content-card')) {
  //         const currId = e.target.closest('.modal__content-card').id
  //         const currContentCard = document.getElementById(currId)
  //         if (selected.includes(currId) && currentSelectedItem === maxSelectedItem) {
  //           selected = selected.filter((el) => el != currId)
  //           --currentSelectedItem
  //           this.actualPrice(props, currId)
  //           currContentCard.classList.toggle('select')
  //         } else {
  //           if (currentSelectedItem === maxSelectedItem) {
  //             alert('You have made maximum choices')
  //           } else {
  //             if (selected.includes(currId)) {
  //               selected = selected.filter((el) => el != currId)
  //               --currentSelectedItem
  //               this.actualPrice(props, currId)
  //               currContentCard.classList.toggle('select')
  //             } else {
  //               currContentCard.classList.toggle('select')
  //               selected.push(currId)
  //               ++currentSelectedItem
  //               this.actualPrice(props, currId, 'plus')
  //             }
  //           }
  //         }
  //       }

  //       switch (typeOfProp) {
  //         case 'vegetables':
  //           if (selected.length !== 0) {
  //             customSub.vegetables = []
  //             for (let el in props) {
  //               if (!customSub.vegetables.includes(' ' + props[el].name)) {
  //                 if (selected.includes(props[el].id)) {
  //                   customSub.vegetables.push(' ' + props[el].name)
  //                 }
  //               }
  //             }
  //             customSub.vegetablesId = [...selected] //Or slice
  //           } else {
  //             customSub.vegetables = []
  //             alert('empty vegetables')
  //           }
  //           break
  //         case 'sauces':
  //           if (selected.length !== 0) {
  //             customSub.sauces = []
  //             for (let el in props) {
  //               if (!customSub.sauces.includes(' ' + props[el].name)) {
  //                 if (selected.includes(props[el].id)) {
  //                   customSub.sauces.push(' ' + props[el].name)
  //                 }
  //               }
  //             }
  //             customSub.saucesId = [...selected]
  //           } else {
  //             customSub.sauces = []
  //             alert('empty sauces')
  //           }
  //           break
  //         case 'fillings':
  //           if (selected.length !== 0) {
  //             customSub.fillings = []
  //             for (let el in props) {
  //               if (!customSub.fillings.includes(' ' + props[el].name)) {
  //                 if (selected.includes(props[el].id)) {
  //                   customSub.fillings.push(' ' + props[el].name)
  //                 }
  //               }
  //             }
  //             customSub.fillingsId = [...selected]
  //           } else {
  //             customSub.fillings = []
  //             alert('empty fillings')
  //           }
  //           break
  //       }
  //     })
  //   }
  // }
}
