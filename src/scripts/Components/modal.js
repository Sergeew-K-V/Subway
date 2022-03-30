import Component from './Component'

const template = `<div class="modal-overlay">
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
            <li class="navbar__item">Размер</li>
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
        <div class="modal__content" id="root-modal">
          <div class="modal__content-card">
            <div class="content-card__block">
              <div class="content-card__img">
                <img src="/src/img/icons/sizes/1x.jpg" alt="size-15cm" />
              </div>
              <div class="content-card__text">15 См</div>
              <div class="content-card__price">Цена: 110 руб.</div>
            </div>
          </div>
          <div class="modal__content-card">
            <div class="content-card__block">
              <div class="content-card__img">
                <img src="/src/img/icons/sizes/1x.jpg" alt="size-15cm" />
              </div>
              <div class="content-card__text">15 См</div>
              <div class="content-card__price">Цена: 110 руб.</div>
            </div>
          </div>
          <div class="modal__content-card">
            <div class="content-card__block">
              <div class="content-card__img">
                <img src="/src/img/icons/sizes/1x.jpg" alt="size-15cm" />
              </div>
              <div class="content-card__text">15 См</div>
              <div class="content-card__price">Цена: 110 руб.</div>
            </div>
          </div>
          <div class="modal__content-card">
            <div class="content-card__block">
              <div class="content-card__img">
                <img src="/src/img/icons/sizes/1x.jpg" alt="size-15cm" />
              </div>
              <div class="content-card__text">15 См</div>
              <div class="content-card__price">Цена: 110 руб.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__footer">
        <span>Итого: 110 руб.</span>
      </div>
    </div>
  </div>
</div>
</div>`

export default class Modal extends Component {
  constructor(content, renderCompFunc) {
    super(content, renderCompFunc)
  }
}
