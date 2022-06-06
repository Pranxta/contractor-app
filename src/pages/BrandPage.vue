<template>
  <q-page class="cont">

    <div class="subtitle q-pa-sm">
      Category > Brands
      <q-separator color="grey" />
    </div>


    <div class="col">

      <div>
        <div class="brand row">

          <div class="float-left brand-img col">
            <img class="prod-img" src="~/assets/rods.jpg">
          </div>

          <div class="brand-text float-right text-right">
            <span class="text-h6">Brand Name</span>
            <br>
            <span class="text-subtitle">
              Brand description goes here Brand description goes here
            </span>
            <br>
            <q-btn color="primary">
              view products
            </q-btn>
          </div>

        </div>

        <div class="subtitle col q-pa-sm">
          <q-separator color="grey" />
        </div>
      </div>


      <div>
        <div class="brand row">

          <div class="float-left brand-img col">
            <img class="prod-img" src="~/assets/rods.jpg">
          </div>

          <div class="brand-text text-right float-right">
            <span class="text-h6">Brand Name</span>
            <br>
            <span class="text-subtitle">
              Brand description goes here Brand description goes here
            </span>
            <br>
            <q-btn color="primary">
              view products
            </q-btn>
          </div>

        </div>

        <div class="subtitle col q-pa-sm">
          <q-separator color="grey" />
        </div>
      </div>

      <div>
        <div class="brand row">

          <div class="float-left brand-img col">
            <img class="prod-img" src="~/assets/rods.jpg">
          </div>

          <div class="brand-text float-right text-right">
            <span class="text-h6">Brand Name</span>
            <br>
            <span class="text-subtitle">
              Brand description goes here Brand description goes here
            </span>
            <br>
            <q-btn color="primary">
              view products
            </q-btn>
          </div>

        </div>

        <div class="subtitle col q-pa-sm">
          <q-separator color="grey" />
        </div>
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
      first: env.appNameFirst,
      last: env.appNameLast,
      name,
      age,
      accept,

      onSubmit () {
        if (accept.value !== true) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first'
          })
        }
        else {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        }
      },

      onReset () {
        name.value = null
        age.value = null
        accept.value = false
      }
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
  min-width: 80px
  width: 120px
  margin: 20px

  img
    width: 120px
    height: 120px
    border: 2px solid grey
    border-radius: 10px

.brand-text
  min-width: 130px
  width: 180px
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

</style>
