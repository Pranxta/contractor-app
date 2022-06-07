<template>
  <q-page class="container">

    <div class="subtitle q-pa-sm">
      {{props.category}} > {{props.brand}} > Products
      <q-separator color="grey" />
    </div>


    <div class="col">


      <div v-for="(product, key) in products" class="product">

        <div class="prod-name row">
          <div class="float-left col">
            <img class="prod-img" src="~/assets/rods.jpg">
          </div>

          <div class="col prod-d float-right">
            <h5 class="text-h5">{{product.name}}</h5>
            <span class="text-subtitle">{{product.description}}</span>
            <br>
            <q-badge rounded color="orange" :label="product.catName" />

            <q-badge rounded color="blue" :label="product.subcatName" />
            <br>
            <span class="pr text-weight-bolder">BDT {{" /" + product.unit}}</span>

            <span>minimum: {{product.min_unit + " " + product.unit}}</span>
          </div>

        </div>

      </div>

      <div class="subtitle q-pa-sm">
        <q-separator color="grey" />
      </div>

    </div>








  </q-page>
</template>

<script>
import env from './Env.js'
import { useQuasar } from 'quasar'
import { ref, onMounted  } from 'vue'
import { useRoute } from 'vue-router'

import axios from 'axios'

export default {
  props: {
    category: String,
    brand: String
  },
  setup (props) {
    const $q = useQuasar()
    const route = useRoute()
    $q.dark.set(false)

    const products = ref([])

    onMounted( () => {


      let sortedProds = []

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

      const url = env.BASE_URL + "products"
      axios.get(url)
      .then(resp => {
        sortedProds = resp.data.filter( element => {
          return (element.brandName == props.brand && element.catName == props.category)
        })
        //console.log(sortedProds)

        sortedProds.forEach(element => {

          let prices = getPrices(element.key)
          console.log(prices)
        })
        $q.loading.hide()
        products.value = sortedProds

      })
      .catch(
        err => console.log(err)
      )

      // hiding in 3s
      // timer = setTimeout(() => {
      //   $q.loading.hide()
      //   timer = void 0
      // }, 3000)

    })


    function getPrices (key) {
      axios.get(env.BASE_URL + "prices/prod/" + key)
      .then(
        res => console.log(res.data)
      ).catch(
        err => console.log(err)
      )
    }

    return {

      first: env.appNameFirst,
      last: env.appNameLast,
      products,
      props

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
