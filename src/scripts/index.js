import Component from './Components/Component'
import SubwayComponent from './Components/SubwayComponent'
import Header from './Components/SubwayComponent'
const subContent = `
<div class="subway__block">
  <div class="subway__flex">
    <div class="flex__top">
      <div class="subway__logo">
        <img src="/src/img/icons/markets/subway_logo.png" alt="" />
      </div>
      <div class="subway__img-logo">
        <img src="/src/img/icons/sandwiches/ovoshnoy.png" alt="" />
      </div>
      <div class="subway__title">Овощной</div>
    </div>
    <div class="flex__middle">
      <div class="subway__link">
        <a href="#">Соус и овощи на выбор</a>
      </div>
    </div>
    <div class="flex__bottom">
      <div class="subway__price">Цена: 110 руб.</div>
      <div class="subway__btn-block">
        <div class="btn-block__text">Количество</div>
        <div class="btn-block__btns-list">
          <button class="btns-list__btn"><i class="fa-solid fa-minus"></i></button>
          <input type="text" class="btns-list__btn" value="0" />
          <button class="btns-list__btn"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
      <div class="subway__btn-to-basket">
        <button class="btn-to-basket__btn">В корзину</button>
      </div>
    </div>
  </div>
</div>`
// в чем идея, при инициализации компонент, давать ему уникальный индетификатор, на который мы будет ссылаться при рендере и уже отрисовывать элемент заново, в нужно блоке с этим id
const sub = new SubwayComponent(subContent)
const sub2 = new SubwayComponent(subContent)
const sub3 = new SubwayComponent(subContent)
