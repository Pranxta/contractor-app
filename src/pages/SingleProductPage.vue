<template>
  <q-page class="container">

    <div v-if="product.details.name" class="subtitle q-pa-sm">
      {{product.details.catName + " > " + product.details.brandName + " > " + product.details.name}}
      <q-separator color="grey" />
    </div>


    <div class="col">


      <div class="product" v-if="product.details.name">

        <div class="prod-name row">
          <div class="float-left col">
            <img class="prod-img" src="~/assets/rods.jpg">
          </div>

          <div class="col prod-d float-right">
            <h5>{{product.details.name}}</h5>
            <q-badge rounded color="blue" :label="product.details.brandName" />
            <q-badge rounded color="green" :label="product.details.subcatName" />
            <br>
            <span class="text-subtitle">
              {{product.details.description}}
            </span>
            <br>
            <br>
            <span class="subtitle">Price</span>
            <span class="pr text-weight-bolder">BDT {{product.price}} /tonne</span>
            <span>(minimum unit : {{product.details.min_unit + " " + product.details.unit}})</span>
          </div>

        </div>

        <div class="col">
          <div class="col prod-q">
            <p>
              <span class="subtitle hd col">Quantity</span>
            </p>

            <button @click="decrement">-</button>
            <input type="number" :value="quant">

            <button @click="increment">+</button>

          </div>
          <div class="col cart-col">

          <q-btn @click="showDial" class="secondary" color="primary">add to cart</q-btn>
          </div>
        </div>


      </div>




    </div>




    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class=" items-center">
          <div class="row text-center dialg">
            <q-avatar icon="add_shopping_cart" color="primary" text-color="white" />

            <span class="text-h4 dialg-h1">{{product.details.name}}</span>

          </div>

          <div class="row dialg">
            <q-separator color="grey" class="qr" />
          </div>


          <div class="row dialg">
            <span class="qr text-weight-medium text-center">{{quant + " X "+ product.price  +  " /" + product.details.unit}}</span>
          </div>

          <div class="row dialg">
            <span class="qr text-weight-bold text-center">Subtotal: BDT {{quant*product.price}}</span>
          </div>
          <div class="row dialg">
            <span class="qr text-weight-medium text-center text-grey">Do you wish to add to cart?</span>
          </div>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" color="primary" @click="addToCart" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>



  </q-page>
</template>

<script>
import env from './Env.js'
import { useQuasar,LocalStorage } from 'quasar'
import { ref, onMounted,reactive  } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from 'axios'

export default {
  setup () {
    const $q = useQuasar()
    const route = useRoute()
    const router = useRouter()

    const uType = ref(null)
    const confirm = ref(false)
    const quant = ref(0)

    $q.dark.set(false)
    const product = reactive({
      details: {},
      price: Number
    })

    onMounted( () => {
      $q.loading.show({

        spinnerColor: 'red',
        spinnerSize: 240,
        backgroundColor: 'burgundy',
        message: 'Loading...',
        messageColor: 'white'
      })

      let xuser = $q.localStorage.getItem("user")
      uType.value = xuser.type
      const promise1 = axios.get(env.BASE_URL + "products/" + route.params.id)
      const promise2 = axios.get(env.BASE_URL + "prices/prod/" + route.params.id)

      Promise.all([promise1,promise2])
      .then(
        responses => {
          product.details = responses[0].data

          let xprice = responses[1].data
          if(uType.value == "sme")
            product.price = xprice.sme_price
          else if(uType.value == "landlord")
            product.price = xprice.landlord_price
          else
            product.price = xprice.contractor_price

          quant.value = product.details.min_unit
          console.log(product)
          $q.loading.hide()
        }
      )

      // hiding in 3s
      // timer = setTimeout(() => {
      //   $q.loading.hide()
      //   timer = void 0
      // }, 3000)

    })

    function increment () {
      quant.value++
      if(quant.value<product.details.min_unit)
        quant.value = product.details.min_unit
    }
    function decrement () {
      quant.value--
      if(quant.value<product.details.min_unit)
        quant.value = product.details.min_unit
    }

    function addToCart () {
      let cart = $q.localStorage.getItem("cart")

      let currentdate = new Date()
      if (cart == null) {
        cart = {
          items: [{
            name: product.details.name,
            price: product.price,
            quantity: quant.value
          }],
          date: ""
            // currentdate.getDate() + "/"
            // + (currentdate.getMonth()+1)  + "/"
            // + currentdate.getFullYear() + " @ "
            // + currentdate.getHours() + ":"
            // + currentdate.getMinutes()
        }
        localStorage.setItem("cart", JSON.stringify(cart))

        let local = $q.localStorage.getItem("cart")
        console.log("ret:", JSON.parse(local))
      }
      else {
        let local = $q.localStorage.getItem("cart")
        let xCart = JSON.parse(local)

        xCart.items.push({
          name: product.details.name,
          price: product.price,
          quantity: quant.value
        })

        localStorage.setItem("cart", JSON.stringify(xCart))
      }
    }

    function showDial () {
      confirm.value = true
    }

    return {

      first: env.appNameFirst,
      last: env.appNameLast,
      product,
      quant,
      increment,
      decrement,
      addToCart,
      confirm,
      showDial
    }
  }
}
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap')


*
  color: grey
.dialg-h1
  font-weight: bolder
  font-size: 30px
  margin: 4px 20px

.dialg
  text-align: center
  min-width: 200px
  margin: 3px auto

  .qr
    width: 100%
    font-size: 20px
    color: green
    display: block
    text-align: center
    margin: 5px 2px

.pr
  color: orange
  display: block
  text-align: center
  border: 1px solid orange
  border-radius: 5px
  margin: 5px 2px
  padding: 5px 5px

.q-badge
  color: white
  height: 25px
  margin: 10px
  padding: 10px
h5
  margin: 5px -5px
  padding: 5px

h6
  .subtitle
    margin: 0px
    padding: 0px


.product
  min-height: 150px


  .prod-img
    width: 120px
    height: 120px
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
  text-align: right



#second
  font-family: 'Koulen', cursive
  color: rgba(beige , 0.7 )

#first
  font-family: 'Lobster', cursive
  margin: 0px 5px

.subtitle
  font-family: 'Koulen', cursive

</style>
