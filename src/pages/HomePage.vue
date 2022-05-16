<template>
  <q-page class="cont">

    <div class="subtitle q-pa-sm">
      Products > Categories
      <q-separator color="grey" />
    </div>


    <div class="row justify-start">
      <q-card class="my-card col-sm-3 q-ma-sm">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            Title
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card col-sm-3 q-ma-sm">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            Title
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card col-sm-3 q-ma-sm">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            Title
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card col-sm-3 q-ma-sm">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            Title
          </div>
        </q-img>
      </q-card>



    </div>



    <div class="subtitle q-pa-sm">
      Articles
      <q-separator color="grey" />
    </div>

    <div class="row justify-start">
      <q-card class="my-card q-ma-sm">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            Title
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card q-ma-sm">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            Title
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card q-ma-sm">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            Title
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card q-ma-sm">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            Title
          </div>
        </q-img>
      </q-card>



    </div>



    <div class="subtitle q-pa-sm">
      Tools
      <q-separator color="grey" />
    </div>

    <div class="row justify-start">
      <q-card class="my-card q-ma-sm">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            Title
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card q-ma-sm">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            Title
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card q-ma-sm">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            Title
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card q-ma-sm">
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
          <div class="absolute-bottom text-subtitle2 text-center">
            Title
          </div>
        </q-img>
      </q-card>



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

.my-card
  height: 60px
  width: 70px

  .text-h3
    font-size: 14px

.cont
  background: white

.login-input > div
    background: white
    min-width: 800px


#second
  font-family: 'Koulen', cursive
  color: rgba(beige , 0.7 )

#first
  font-family: 'Lobster', cursive
  margin: 0px 5px

.subtitle
  font-family: 'Koulen', cursive

</style>
