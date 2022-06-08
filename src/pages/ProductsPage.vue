<template>
  <q-page class="container">

    <div class="subtitle q-pa-sm">
      {{category}} > {{brand}} > Products
      <q-separator color="grey" />
    </div>


    <div class="col">


      <div v-for="(product, index) in products" class="product" >

        <div class="prod-name row" @click="goToProduct(product.key)">
          <div class="float-left col">
            <img class="prod-img" :src="product.img_url">
          </div>

          <div class="col prod-d float-right">
            <h5 class="text-h5">{{product.name}}</h5>
            <span class="text-subtitle">{{product.description}}</span>
            <br>
            <q-badge rounded color="orange" :label="product.catName" />

            <q-badge rounded color="blue" :label="product.subcatName" />
            <br>
            <span class="pr text-weight-bolder">BDT {{product.price +" /" + product.unit}}</span>

            <span>minimum: {{product.min_unit + " " + product.unit}}</span>
          </div>

        </div>

        <div class="subtitle q-pa-sm">
          <q-separator color="grey" />
        </div>
      </div>



    </div>








  </q-page>
</template>

<script>
import env from './Env.js'
import { useQuasar,LocalStorage } from 'quasar'
import { ref, onMounted, reactive  } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from 'axios'


export default {

  setup () {
    const $q = useQuasar()
    const route = useRoute()
    const router = useRouter()
    $q.dark.set(false)

    const category = ref('')
    const brand = ref('')

    let data = route.params.blob
    const myArray = data.split("_")
    category.value = myArray[0]
    brand.value = myArray[1]


    const products = ref([])
    const allPrices = ref([])
    const userType = ref(null)

    onMounted( async () => {
      //console.log(props.category)
      //console.log(props.brand)
      // console.log(brand)

      $q.loading.show({

        spinnerColor: 'red',
        spinnerSize: 240,
        backgroundColor: 'burgundy',
        message: 'Confirming...',
        messageColor: 'white'
      })

      let xuser = $q.localStorage.getItem("user")
      userType.value = xuser.type
      const promise1 = axios.get(env.BASE_URL + "products")
      const promise2 = axios.get(env.BASE_URL + "prices")

      Promise.all([promise1,promise2])
      .then(responses => {

        products.value = responses[0].data.filter( el => (el.brandName == brand.value && el.catName == category.value))
        allPrices.value = responses[1].data
        console.log(products.value)
        console.log(allPrices.value)

        products.value.forEach(
          (el) => {
            let xprices = allPrices.value.find(
              (cell) => {
                return cell.owner == el.key
              }
            )

            el.img_url = env.IMG_BASE_URL + el.image
            if(userType == "sme")
              el.price = xprices.sme_price
            else if( userType == "landlord")
              el.price = xprices.landlord_price
            else
              el.price = xprices.contractor_price
          }
        )

        $q.loading.hide()
      })
      .catch(err => console.log(err))


    })


    function goToProduct (key) {
      console.log("clicked")
      router.push("/home/singleproduct/"+key)
    }



    return {

      first: env.appNameFirst,
      last: env.appNameLast,
      products,
      allPrices,
      userType,
      goToProduct,
      category,
      brand

    }
  }
}
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap')


*
  color: grey

.pr
  color: orange
  display: block
  text-align: center
  border: 1px solid orange
  border-radius: 5px
  margin: 5px auto
  padding: 5px 10px

.q-badge
  color: white
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
    border: 2px solid grey
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
