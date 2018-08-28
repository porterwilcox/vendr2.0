<template>
  <div class="vendr vend-img">
    <h1>{{machine.name}}</h1>
    <div class="vendr-items">
        <button
          v-for="obj in machine.items"
          :key="obj.id"
          @click="purchase(obj.id)"
          :disabled="obj.disabled"
        ><img
          :src="obj.imgUrl"
          :class="obj.class"
      ></button>
    </div>
    <div class="money-display">{{parseFloat(machine.curTotal).toFixed(2)}}</div>
    <button 
      :class="{getChange: hasMoney, gone: !hasMoney}"
      @click="getChange()"
    ></button>
    <div class="currency-btns">
      <div class="wallet">${{parseFloat(wallet.moneySum).toFixed(2)}}</div>
      <button
      v-for="obj in wallet.currencies"
      :key ="obj.id"
      @click="moveMoney(obj.value)"
      :disabled="obj.disabled"
      >{{obj.name}}</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    machine() {
      return this.$store.state.machine;
    },
    wallet() {
      return this.$store.state.wallet;
    },
    hasMoney() {
      return this.$store.state.machine.curTotal > 0;
    }
  },
  methods: {
    purchase(id) {
      this.$store.dispatch("purchase", id);
    },
    moveMoney(value) {
      this.$store.dispatch("addMoney", value);
      this.$store.dispatch("minusWallet", value);
      this.$store.dispatch("enoughMoney", value);
    },
    getChange() {
      this.$store.dispatch("getChange");
    }
  }
};
</script>

<style>
/* * {
  outline: 1px solid red;
} */
.vend-img {
  background-image: url("https://media.istockphoto.com/vectors/vending-machine-of-food-and-beverage-automatic-selling-vector-vector-id901409080?k=6&m=901409080&s=612x612&w=0&h=eQZaAvlDdxk09pz2UlaCjcq8ygYCGoG4zRwo2fql2Fg=");
  background-size: contain;
  height: 80vh;
  background-repeat: no-repeat;
  margin: auto;
  width: 80vh;
  position: relative;
}
.vendr-items {
  position: absolute;
  bottom: 25vh;
  left: 24vh;
  position: absolute;
  height: 40.5vh;
  width: 22.5vh;
}
.money-display {
  height: 3.1vh;
  width: 6.7vh;
  position: absolute;
  left: 50vh;
  bottom: 55.3vh;
  color: green;
  font-size: 1rem;
}
.item1 {
  height: 5.5vh;
  width: 6vh;
  position: absolute;
  left: 8vh;
  bottom: 3vh;
  cursor: pointer;
}
.item2 {
  height: 4vh;
  width: 5vh;
  position: absolute;
  left: 8.7vh;
  bottom: 18.3vh;
  cursor: pointer;
}
.item3 {
  height: 4vh;
  width: 5vh;
  position: absolute;
  left: 0.1vh;
  bottom: 32.5vh;
  cursor: pointer;
}
.greyed-out {
  opacity: 0.2;
  cursor: default;
}
.currency-btns {
  display: flex;
  position: absolute;
  flex-flow: wrap column;
  left: 65vh;
  top: 10vh;
  justify-content: space-evenly;
  height: 40vh;
}
.getChange {
  position: absolute;
  height: 1.5vh;
  width: 2vh;
  top: 39.7vh;
  left: 52vh;
  cursor: pointer;
  animation: flash 2s;
  animation-iteration-count: infinite;
}
@keyframes flash {
  0% {background-color: white}
  10% {background-color: gold}
  100% {background-color: gold}
}
.gone {
  display: none;
}
</style>


