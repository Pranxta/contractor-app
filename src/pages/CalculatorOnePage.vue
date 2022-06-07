<template>
  <q-page class="container">

    <div class="subtitle q-pa-sm">
      Calculator > Concrete Cost Calculator
      <q-separator color="grey" />
    </div>



    <div class="col">


      <div class="product">

        <div class="prod-name col">
          <span class="text-weight-bolder">Concrete Ratio</span>
          <br>
          <span class="text-weight-medium">Cement : Sand : Aggregate</span>

          <br>

          <input v-model="calculator.cem_ratio" type="number" class="calc-input">
           :
          <input v-model="calculator.sand_ratio" type="number" class="calc-input">
           :
          <input v-model="calculator.agg_ratio" type="number" class="calc-input">


        </div>

      </div>

      <q-separator inset color="grey" />

      <div class="product">

        <div class="prod-name col">
          <span class="text-weight-bolder">Prices</span>
          <br>

          <div class="calc-div">
            <span class="text-weight-medium">Cement </span>
            <input v-model="calculator.cem_price" type="number" class="calc-input">
            per bag
          </div>

          <div class="calc-div">
            <span class="text-weight-medium">Sand</span>
            <input v-model="calculator.sand_price" type="number" class="calc-input">
            per cft
          </div>

          <div class="calc-div">
            <span class="text-weight-medium">Aggregate </span>
            <input v-model="calculator.agg_price" type="number" class="calc-input">
            per cft
          </div>



        </div>



      </div>

      <q-separator inset color="grey" />

      <div class="product">

        <div class="prod-name col">
          <span class="text-weight-bolder">Structure Volume</span>

          <div class="calc-div">
            <span class="text-weight-medium">Length </span>
            <input v-model="calculator.len" type="number" class="calc-input" >
            feet
          </div>

          <div class="calc-div">
            <span class="text-weight-medium">Width </span>
            <input type="number" class="calc-input" v-model="calculator.wid">
            feet
          </div>

          <div class="calc-div">
            <span class="text-weight-medium">Height  </span>
            <input type="number" class="calc-input" v-model="calculator.height">
            feet
          </div>

          <div class="calc-div">
            <span class="text-weight-medium">Dry Value  </span>
            <input type="number" class="calc-input" v-model="calculator.dry_vol">

          </div>

          <span class="text-weight-bold">Total : {{calculator.volume}} cubic feet</span>
          <br>
        </div>



      </div>

      <q-separator inset color="grey" />

      <div class="product">

        <div class="prod-name col">
          <span class="text-weight-bolder">Quantities</span>
          <br>

          <span class="text-weight-medium">Concrete -</span>
          <span class="text-weight-regular">{{calculator.concrete}} units</span>
          <br>

          <span class="text-weight-medium">Cement -</span>
          <span class="text-weight-regular">{{calculator.cem_q}} units</span>
          <br>

          <span class="text-weight-medium">Sand - </span>
          <span class="text-weight-regular">{{calculator.sand_q}} units</span>
          <br>

          <span class="text-weight-medium">Aggregate - </span>
          <span class="text-weight-regular">{{calculator.agg_q}} units</span>
          <br>

        </div>



      </div>

      <q-separator inset color="grey" />

      <div class="product">

        <div class="prod-name col">
          <span class="text-weight-bolder">Costs</span>
          <br>

          <span class="text-weight-medium">Cement : </span>
          <span class="text-weight-regular">BDT {{calculator.cem_cost}}</span>
          <br>

          <span class="text-weight-medium">Sand: </span>
          <span class="text-weight-regular">BDT {{calculator.sand_cost}}</span>
          <br>

          <span class="text-weight-medium">Aggregate : </span>
          <span class="text-weight-regular">BDT {{calculator.agg_cost}}</span>
          <br>

        </div>



      </div>

      <q-separator inset color="grey" />

      <div class="total">
        <span class="text-weight-bolder">Grand Total: </span>
        <span class="text-weight-bold">BDT {{calculator.grand_total}}</span>
        <br>

      </div>

    </div>


  </q-page>
</template>

<script>
import env from './Env.js'
import { useQuasar } from 'quasar'
import { ref, onMounted, reactive, computed  } from 'vue'


export default {
  setup () {
    const $q = useQuasar()
    let timer

    $q.dark.set(false)
    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)


    const calculator = reactive({
      cem_ratio: 1,
      sand_ratio: 2,
      agg_ratio: 4,
      ratioSum : computed(
        () => calculator.cem_ratio + calculator.sand_ratio + calculator.agg_ratio
      ),
      cem_price: 410,
      sand_price: 50,
      agg_price: 210,
      len: 8,
      wid:4,
      height:0.5,
      dry_vol:1.54,
      volume: computed(
        () => calculator.len * calculator.wid * calculator.height
      ),
      concrete: computed(
        () => calculator.len * calculator.wid * calculator.height * calculator.dry_vol
      ),
      cem_q: computed(
        () => (calculator.cem_ratio * calculator.concrete)/(calculator.ratioSum)
      ),
      sand_q: computed(
        () => (calculator.sand_ratio * calculator.concrete)/(calculator.ratioSum)
      ),
      agg_q: computed(
        () => (calculator.agg_ratio * calculator.concrete)/(calculator.ratioSum)
      ),
      cem_cost: computed(
        () => ((calculator.cem_q/1.25)*calculator.cem_price).toFixed(0)
      ),
      sand_cost: computed(
        () => ((calculator.sand_q)*calculator.sand_price).toFixed(0)
      ),
      agg_cost: computed(
        () => ((calculator.agg_q)*calculator.agg_price).toFixed(0)
      ),
      grand_total: computed(
        () => (calculator.cem_cost*1 + calculator.sand_cost*1 + calculator.agg_cost*1).toFixed(0)
      )
    })

    onMounted( () => {
      $q.loading.show({

        spinnerColor: 'red',
        spinnerSize: 240,
        backgroundColor: 'burgundy',
        message: 'Confirming...',
        messageColor: 'white'
      })

      // hiding in 3s
      timer = setTimeout(() => {
        $q.loading.hide()
        timer = void 0
      }, 1000)

    })

    return {
      calculator,
      model: ref(10),
      first: env.appNameFirst,
      last: env.appNameLast,

    }
  }
}
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap')


*
  color: grey
h5
  margin: 5px -5px
  padding: 5px

h6
  .subtitle
    margin: 0px
    padding: 0px


.product
  min-height: 100px
  text-align: center
  margin: 10px 5px 10px 5px

  .prod-name
    text-align: center

  .subtitle
    margin:0px

  .calc-div
    margin: -5px
    padding: 5px


.col
  .float-right
    margin-right: 20px


.cart-col
  margin: 5px 20px
  text-align: center



.calc-input
  margin: 10px 5px
  width: 40px


.total
  margin: 10px
  text-align: center
  padding: 10px
  border: 2px dashed red
  border-radius: 20px

#second
  font-family: 'Koulen', cursive
  color: rgba(beige , 0.7 )

#first
  font-family: 'Lobster', cursive
  margin: 0px 5px

.subtitle
  font-family: 'Koulen', cursive

</style>
