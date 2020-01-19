import {
  observable,
  action
} from 'mobx'

class counterStore {
  @observable counter = 0;

  @action.bound counterStore() {
    this.counter++
  }
  @action.bound increment() {
    this.counter += 2
  }

  @action.bound decrement() {
    this.counter--
  }

  @action.bound incrementAsync() {
    setTimeout(() => {
      this.counter++
    }, 1000)
  }
}
export default new counterStore()
