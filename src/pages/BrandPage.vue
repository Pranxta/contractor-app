<template>
  <q-page class="cont">

    <div class="subtitle q-pa-sm">
      {{cat}} > Brands
      <q-separator color="grey" />
    </div>


    <div class="col">

      <div v-for="brand in allBrands" >
        <div class="brand">

          <div class="float-left brand-img col">
            <img class="prod-img" src="~/assets/rods.jpg">
          </div>

          <div class="brand-text float-right text-right">
            <span class="text-h6">{{brand.name}}</span>
            <br>
            <span class="text-subtitle">
              {{brand.description}}
            </span>
            <br>
            <q-btn color="primary" @click="toCatBrand(brand.name)">
              view products
            </q-btn>
          </div>

          <div class="sepr text-center">
            <q-separator color="grey"/>
          </div>


        </div>


      </div>





    </div>








  </q-page>
</template>

<script>
import env from './Env.js'
import { useQuasar } from 'quasar'
import { ref, onMounted  } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import axios from 'axios'

export default {
  setup () {
    const $q = useQuasar()
    const route = useRoute()
    const router = useRouter()
    const cat = ref("")
    const allBrands = ref([])

    onMounted( () => {

      $q.loading.show({

        spinnerColor: 'red',
        spinnerSize: 240,
        backgroundColor: 'burgundy',
        message: 'Confirming...',
        messageColor: 'white'
      })

      let products = []
      let brands = []
      let filteredBrands = []

      cat.value = route.params.cat

      const url = env.BASE_URL + "products/"

      axios.get(url)
      .then(
        resp => {
          products = resp.data

          products.forEach(element => {
            brands.push(element.brand)
          })
          filteredBrands = [...new Set(brands)]
          // console.log("filteredBrands: ",filteredBrands)
          getBrands(filteredBrands)
        }
      )
      .catch(
        err => console.log(err)
      )


      // hiding in 3s
      // timer = setTimeout(() => {
      //   $q.loading.hide()
      //   timer = void 0
      // }, 3000)

    })

    function getBrands(arr) {
      arr.forEach(el => {
        axios.get(env.BASE_URL+"brands/"+el)
        .then(res => {
          allBrands.value.push(res.data)
          // console.log("brands:",res.data)
          $q.loading.hide()
        })
        .catch(
          err => console.log(err)
        )
      })
    }

    function toCatBrand (brnd) {

      router.push({name:"brandCat", params: { category: route.params.cat, brand: brnd }})
    }

    return {
      first: env.appNameFirst,
      last: env.appNameLast,
      cat,
      allBrands,
      toCatBrand

    }
  }
}
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap')


*
  color: grey
  background-color: white

.brand-img
  width: 20vw
  margin: 20px

  img
    width: 120px
    height: 120px
    border: 2px solid grey
    border-radius: 10px

.brand-text

  margin: 10px 30px

  button
    margin-top: 20px


#second
  font-family: 'Koulen', cursive
  color: rgba(beige , 0.7 )

#first
  font-family: 'Lobster', cursive
  margin: 0px 5px

.subtitle
  font-family: 'Koulen', cursive


.sepr
  height: 100px
  width: 80vw
  clear: both
  margin: 0 auto

</style>
