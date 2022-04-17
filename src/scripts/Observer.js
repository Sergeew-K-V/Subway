export default class Subject {
  constructor() {
    this.observers = []
  }
  subcribe(obverser) {
    this.observers.push(obverser)
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer)
  }

  fire(changes) {
    this.observers.forEach((observer) => {
      observer.update(action)
    })
  }
}
class Observer {
  constructor(state) {
    this.state = state
    this.initialState = state
  }
  update(action) {
    switch (action.type) {
      case 'INCREMENT':
        this.state = ++this.state
        break
      case 'DECREMENT':
        this.state = --this.state
        break
      case 'ADD':
        this.state += action.payload
        break
      default:
        this.state = this.initialState
    }
  }
}
