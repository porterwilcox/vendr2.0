import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    machine: {
      name: "vendr",
      items: [{
        id: 1,
        imgUrl: "https://t3.rbxcdn.com/35daf5e6f29452133a28dd35cc7eaf00",
        quantity: 3,
        price: 2.00,
        class: "item1",
        disabled: false
      },
      {
        id: 2,
        imgUrl: "https://cdn.shopify.com/s/files/1/0996/7396/products/cheetos.png?v=1461538280",
        quantity: 4,
        price: 2.25,
        class: "item2",
        disabled: false
      },
      {
        id: 3,
        imgUrl: "https://i5.walmartimages.com/asr/189b626c-796b-4f32-b5fd-d8a5d91936b8_1.a97eebc9db676df94353b96ad88e5c92.jpeg?odnHeight=560&odnWidth=560&odnBg=FFFFFF",
        quantity: 2,
        price: 3.00,
        class: "item3",
        disabled: false
      }],
      curTotal: 0.00,
    },
    wallet: {
      moneySum: 15.65,
      currencies: [{
        id: 1,
        name: "nickel",
        value: 0.05,
        disabled: false
      },
      {
        id: 2,
        name: "dime",
        value: 0.10,
        disabled: false
      },
      {
        id: 3,
        name: "quarter",
        value: 0.25,
        disabled: false
      },
      {
        id: 4,
        name: "dollar",
        value: 1.00,
        disabled: false
      }]
    }
  },
  mutations: {
    setTotal(state, newTotal){
      state.machine.curTotal = newTotal
    },
    makePurchase(state, obj){
      let item = state.machine.items.find(i => i.id == obj.id)
      item.quantity = obj.quantity
      state.machine.curTotal = obj.total
    },
    addClass(state, obj){
      let item = state.machine.items.find(i => i.id == obj.id)
      item.class += " greyed-out"
      item.disabled = true
      console.log(item)
    },
    minusWallet(state, newTotal){
      state.wallet.moneySum = newTotal
    },
    disableMoney(state, id){
      let btn = state.wallet.currencies.find(c => c.id == id)
      btn.disabled = true
    },
    changeBack(state, sum){
      state.machine.curTotal = 0.00
      state.wallet.moneySum = sum
    }
  },
  actions: {
    purchase({ dispatch, commit, state }, payload) {
      let item = state.machine.items.find(i => i.id == payload)
      if(state.machine.curTotal >= item.price){
        let newQuantity = item.quantity - 1
        let newTotal = state.machine.curTotal - item.price
        commit("makePurchase", {
          id: payload,
          quantity: newQuantity,
          total: newTotal
        })
      }
      if(item.quantity <= 0){
        let classStr = "greyed-out"
        commit('addClass', {
          id: payload,
          classStr: "greyed-out"
        })
      }
    },
    addMoney({dispatch, commit, state}, payload){
      let newTotal = state.machine.curTotal + payload
      commit('setTotal', newTotal)
    },
    minusWallet({dispatch, commit, state}, payload){
      let newTotal = state.wallet.moneySum - payload
      commit('minusWallet', newTotal)
    },
    enoughMoney({dispatch, commit, state}, value){
      let btn = state.wallet.currencies.find(c => c.value == value)
      if(state.wallet.moneySum < btn.value){
        commit('disableMoney', btn.id)
      }
    },
    getChange({dispatch, commit, state}){
      let walletSum = state.wallet.moneySum + state.machine.curTotal
      commit("changeBack", walletSum)
    }
  }
})
