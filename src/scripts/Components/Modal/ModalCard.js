import Component from '../Component'

export default class ModalCard extends Component {
  constructor(props, emitter) {
    super()
    this.emitter = emitter
    this.id = props.id
    this.name = props.name
    this.image = props.image
    this.selected = props.selected
    this.price = props.price
    this.content = `<div class="modal__content-card ${
      this.selected === true ? 'select' : ''
    }" id="${this.id}">
                        <div class="content-card__block">
                            <div class="content-card__img">
                             <img src="/src/img${this.image}" alt="el-15cm" />
                            </div>
                            <div class="content-card__text">${this.name}</div>
                            <div class="content-card__price">Цена: ${this.price} руб.</div>
                        </div>
                    </div>`
    this.renderComp(this.getContent, document.getElementById('content-card-root'))
  }
  get getContent() {
    return (this.content = `<div class="modal__content-card ${
      this.selected === true ? 'select' : ''
    }" id="${this.id}">
                                <div class="content-card__block">
                                    <div class="content-card__img">
                                        <img src="/src/img${this.image}" alt="el-15cm" />
                                    </div>
                                    <div class="content-card__text">${this.name}</div>
                                    <div class="content-card__price">Цена: ${this.price} руб.</div>
                                </div>
                            </div>`)
  }
}
