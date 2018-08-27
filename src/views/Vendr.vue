<template>
  <div class="vendr vend-img">
    <h1>{{machine.name}}</h1>
    <div class="vendr-items">
            <a type="button"><img 
    v-for="obj in machine.items"
    :key="obj.id"
    :src="obj.imgUrl"
    :class="obj.class"
    @click="purchase(obj.id)"
    ></a>  
    </div>
    <div class="money-display">{{parseFloat(machine.curTotal).toFixed(2)}}</div>
    <div class="currency-btns">
      <button
      v-for="obj in currencies"
      :key ="obj.id"
      @click="addMoney(obj.value)"
      >{{obj.name}}</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    machine(){
      return this.$store.state.machine
    },
    currencies(){
      return this.$store.state.currencies
    },
  },
  methods: {
    purchase(id){
      this.$store.dispatch("purchase", id)
    },
    addMoney(value) {
      this.$store.dispatch("addMoney", value)
    },
  }
}
</script>

<style>
/* * {
  outline: 1px solid red;
} */
.vend-img {
  background-image: url('https://media.istockphoto.com/vectors/vending-machine-of-food-and-beverage-automatic-selling-vector-vector-id901409080?k=6&m=901409080&s=612x612&w=0&h=eQZaAvlDdxk09pz2UlaCjcq8ygYCGoG4zRwo2fql2Fg=');
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
  font-size: 1.5rem;
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
  left: .1vh;
  bottom: 32.5vh;
  cursor: pointer;
}
.greyed-out{
  opacity: 0.2;
}
</style>


