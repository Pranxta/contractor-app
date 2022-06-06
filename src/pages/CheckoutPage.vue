<template>
  <q-page class="container">

    <div class="subtitle q-pa-sm">
      Category Name > Brand Name > Products
      <q-separator color="grey" />
    </div>


    <div class="col">


      <div class="product">

        <div class="prod-name row">
          <div class="float-left col">
            <img class="prod-img" src="~/assets/rods.jpg">
          </div>

          <div class="col prod-d float-right">

            <span class="text-weight-bolder">Product name</span>
            <br>
            <span class="text-weight-medium">Brand Category</span>
            <br>
            <span class="text-weight-medium">BDT 45 </span> x 5 tonnes
            <br>
            <span class="text-weight-bold">Subtotal: </span>
            <span class="text-weight-medium">BDT 22,000 </span>

          </div>
        </div>

      </div>


      <q-separator color="grey" />


      <div class="total">
        <span class="text-weight-bolder">Grand Total: </span>
        <span class="text-weight-bold">BDT 100,000</span>
        <br>
        <span class="text-weight-bold">Total Items: </span>
        <span class="text-weight-bold"> 5 </span>

        <br>
        <br>

        <q-separator color="red" />
        <br>
        <span class="text-weight-bold">Delivery Address</span>

        <br>
        Adress line 1, detail 1, street unknown
        <br>
        Address line 2, detail 2, street whatever
        <br>
        Dhaka 1209
        <br>


        Phone: 01773344556
        <br>
        <br>

        <q-separator color="red" />

        <br>

        <span class="text-weight-bold">Estimated Delivery Date</span>
        <br>
        <span class="text-weight-medium">July 31, 2022</span>

        <br>
        <q-btn class="secondary q-ma-sm" color="secondary">change Address</q-btn>


      </div>


      <div class="col cart-col">
        <q-btn class="secondary q-ma-sm" color="primary">Proceed</q-btn>
        <q-btn class="secondaryq-ma-sm" color="red">cancel</q-btn>
      </div>


    </div>








  </q-page>
</template>

<script>
import env from './Env.js'
import { useQuasar } from 'quasar'
import { ref, onMounted  } from 'vue'


export default {
  setup () {
    const $q = useQuasar()
    let timer

    $q.dark.set(false)
    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)

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
      }, 3000)

    })

    return {
      model: ref(10),
      first: env.appNameFirst,
      last: env.appNameLast,
      name,
      age,
      accept
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


  .prod-img
    width: 80px
    height: 80px
    margin: 5px 10px
    border: 1px solid grey
    border-radius: 10px

  .subtitle
    margin:0px




.col
  .float-right
    margin-right: 20px

.prod-q
  min-height: 40px
  margin: 5px 20px
  text-align: right

  button
    width: 30px

  input
    width: 40px
    margin: 0px 10px


.prod-d
  text-align: right

.cart-col
  margin: 5px 20px
  text-align: center

.total
  margin: 20px
  text-align: center
  padding: 10px  10px 20px 10px
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
