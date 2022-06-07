<template>
  <q-page class="container">

    <q-card class="my-card">
      <div class="avatar">
        <img class="" src="~/assets/avatar.png">
      </div>


      <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="assignment_ind" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Username Here</q-item-label>
            <q-item-label caption>user type</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="info" />
          </q-item-section>

          <q-item-section>
            <q-item-label>01778 778 011</q-item-label>
            <q-item-label caption>email@something.com</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
        <q-item-section avatar>
          <q-icon color="red" name="home" />
        </q-item-section>

        <q-item-section>

          <q-item-label caption>address</q-item-label>
          <q-item-label>address line 1 goes here</q-item-label>
        </q-item-section>
      </q-item>
      </q-list>
    </q-card>

    <div class="balance">
      <q-btn color="brown-5" label="Check Balance" />
      <q-badge outline color="primary" label="BDT 24000" />
    </div>


    <div class="details">

    </div>





  </q-page>
</template>

<script>
import env from './Env.js'
import { useQuasar,LocalStorage } from 'quasar'
import { ref, onMounted,reactive  } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCounterStore } from 'stores/cart_store'

import axios from 'axios'

export default {
  setup () {
    const $q = useQuasar()
    const route = useRoute()
    const router = useRouter()
    const store = useCounterStore()

    const uType = ref(null)
    const confirm = ref(false)
    const ack = ref(false)

    const quant = ref(0)


    $q.dark.set(false)
    const product = reactive({
      details: {},
      price: Number
    })

    onMounted( () => {
      // $q.loading.show({

      //   spinnerColor: 'red',
      //   spinnerSize: 240,
      //   backgroundColor: 'burgundy',
      //   message: 'Loading...',
      //   messageColor: 'white'
      // })

      // let xuser = $q.localStorage.getItem("user")
      // uType.value = xuser.type
      // const promise1 = axios.get(env.BASE_URL + "products/" + route.params.id)
      // const promise2 = axios.get(env.BASE_URL + "prices/prod/" + route.params.id)

      // Promise.all([promise1,promise2])
      // .then(
      //   responses => {
      //     product.details = responses[0].data
      //     product.details.img_url = env.IMG_BASE_URL + product.details.image

      //     let xprice = responses[1].data
      //     if(uType.value == "sme")
      //       product.price = xprice.sme_price
      //     else if(uType.value == "landlord")
      //       product.price = xprice.landlord_price
      //     else
      //       product.price = xprice.contractor_price

      //     quant.value = product.details.min_unit
      //     console.log(product)
      //     $q.loading.hide()
      //   }
      // )

      // hiding in 3s
      // timer = setTimeout(() => {
      //   $q.loading.hide()
      //   timer = void 0
      // }, 3000)

    })



    return {

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
  background: white

.q-card
  .avatar
    text-align: center
    width: 100%
  img
    width: 200px
    margin: 10px 25px
    border: 2px solid grey
    border-radius: 10px

.balance
  margin: 20px auto
  width: 280px

  .q-badge
    height: 40px
    margin: 10px
    font-size: 15px

.details
  width: 350px
  margin: 10px auto
  text-align: center
  color: grey
  font-size: 20px

</style>
