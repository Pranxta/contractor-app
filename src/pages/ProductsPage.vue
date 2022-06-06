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
            <h5>Product Name</h5>
            <span>product details go here</span>
            <br>
            <span class="text-weight-bolder">Price: </span>
            <span>BDT 45 /tonne</span>
            <br>
            <span>(minimum: 3 tonnes)</span>
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
