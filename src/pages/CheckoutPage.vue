<template>
  <q-page class="container">

    <div class="subtitle q-pa-sm">
      Cart > Checkout
      <q-separator color="grey" />
    </div>


    <div class="col">

      <div v-if="cart.items.length == 0" class="row total">
        <h4>No Items In Your Cart</h4>
      </div>

      <div class="product" v-if="cart.items.length>0">

        <div class="prod-name row" v-for="(item,index) in cart.items">
          <div class="float-left col">
            <img class="prod-img" src="~/assets/rods.jpg">
          </div>

          <div class="col prod-d float-right">

            <span class="text-weight-bolder">{{item.name}}</span>
            <br>
            <span class="text-weight-medium">{{item.price + " X " + item.quantity}}</span>
            <br>

            <span class="text-weight-bold">Subtotal: </span>
            <span class="text-weight-medium">BDT {{item.price*item.quantity}}</span>

          </div>
        </div>

      </div>


      <q-separator color="grey" />


      <div class="total" v-if="store.cart.length>0">
        <span class="text-weight-bolder">Grand Total: </span>
        <span class="text-weight-bold">BDT {{gTotal}}</span>
        <br>
        <span class="text-weight-bold">Total Items: </span>
        <span class="text-weight-bold"> {{cart.items.length}} </span>

        <br>
        <br>

        <q-separator color="red" />
        <br>
        <span class="text-weight-bold">Delivery Address</span>

        <br>
          {{user.details.address}}
        <br>


        Phone: {{user.details.phone}}
        <br>
        <br>


        <q-separator color="red" />

        <br>

        <span class="text-weight-bold">Order Date</span>
        <br>
        <span class="text-weight-medium">{{today}}</span>

        <br>





        <br>

        <span class="text-weight-bold">Estimated Delivery Date</span>
        <br>
        <span class="text-weight-medium">{{deliveryDate}}</span>

        <br>

        <h5 class="alert">Your current balance is not sufficient for this transaction</h5>
        <q-btn class="secondary q-ma-sm" color="secondary">change Address</q-btn>


      </div>


      <div class="col cart-col" v-if="store.cart.length>0">
        <q-btn v-if="resBalance>=0" @click="confirm =true" class="secondary q-ma-sm" color="primary">Proceed</q-btn>
        <q-btn @click="cart.items.length = 0" class="secondaryq-ma-sm" color="red">cancel</q-btn>
      </div>


    </div>


    <q-dialog v-model="confirm">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Please confirm your order by pressing the confirm button
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat @click="submitOrder" label="Confirm" color="primary" v-close-popup />
          <q-btn flat label="Cancel" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Your order has been placed! We will get in touch with you shortly.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="green" v-close-popup />

        </q-card-actions>
      </q-card>
    </q-dialog>





  </q-page>
</template>

<script>
import env from './Env.js'
import { useQuasar } from 'quasar'
import { ref, onMounted,reactive  } from 'vue'
import { useCounterStore } from 'stores/cart_store'
import axios from 'axios'


export default {
  setup () {
    const $q = useQuasar()
    const store = useCounterStore()
    const gTotal = ref(0)
    const today = ref(null)
    const resBalance = ref(0)
    const deliveryDate = ref(null)

    const alert = ref(false)
    const confirm = ref(false)


    const user = reactive({
      details:{}
    })

    user.details = $q.localStorage.getItem("user")
    console.log(user.details)

    const cart = reactive({
      items: []
    })

    $q.dark.set(false)




    onMounted( () => {

      today.value = getDate(0)
      deliveryDate.value = getDate(3)

      console.log(today.value)

      $q.loading.show({

        spinnerColor: 'red',
        spinnerSize: 240,
        backgroundColor: 'burgundy',
        message: 'Confirming...',
        messageColor: 'white'
      })



      cart.items = store.cart


      cart.items.forEach(
        el => {
          gTotal.value += el.price*el.quantity
        }
      )

      resBalance.value = user.details.balance -  gTotal.value

      $q.loading.hide()

      // hiding in 3s
      // timer = setTimeout(() => {
      //   $q.loading.hide()
      //   timer = void 0
      // }, 3000)

    })

    function getDate (n) {
      var today = new Date();
      var dd = String(today.getDate()+n).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear()

      today = dd + '/' + mm + '/' + yyyy
      return today
    }

    function submitOrder() {
      $q.loading.show()
      let order = {
        customer: user.details.name,
        owner_id: user.details.key,
        order_date: today.value,
        delivery_date: deliveryDate.value,
        order_address: user.details.address,
        description: JSON.stringify(cart.items),
        status: false,
        total:gTotal.value
      }

      console.log(order)
      axios.post(env.BASE_URL+ "orders/", order)
      .then(
        res => {
          if(res.data.customer) {
            store.removeAll()
            setTimeout('', 1000)
            displayConfirmation(res.data)

          }
          else
            displayError(res.data)

          $q.loading.hide()

        }

      ).catch(
        err => {
          displayError(err)
          $q.loading.hide()
        }
      )
    }


    function displayConfirmation (ord) {
      alert.value = true
    }
    function displayError (err) {
      console.log("order not confirmed",err)
    }
    return {
      first: env.appNameFirst,
      last: env.appNameLast,
      store,
      cart,
      gTotal,
      user,
      today,
      deliveryDate,
      submitOrder,
      alert,
      confirm,
      resBalance
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
