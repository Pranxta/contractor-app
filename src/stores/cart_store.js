import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
    cart: []
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    },
    getCart (state) {
      return state.cart
    }
  },

  actions: {
    increment () {
      this.counter++
    },
    addItem ( item ) {
      this.cart.push(item)
    },
    removeItem (n) {
     this.cart.splice(n,1)
    }
  }
})
