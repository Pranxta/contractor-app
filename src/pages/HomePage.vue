<template>
  <q-page class="cont">

    <div class="subtitle q-pa-sm">
      Products > Categories
      <q-separator color="grey" />
    </div>


    <div class="row justify-evenly">
      <q-card @click="viewRods" class="my-card col-sm-3 q-ma-sm">
        <q-img src="~/assets/rods.jpg">
          <div  class="absolute-bottom text-caption text-center">
            Rods
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card col-sm-3 q-ma-sm">
        <q-img src="~/assets/cement.jpg">
          <div class="absolute-bottom text-caption text-center">
            Cement
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card col-sm-3 q-ma-sm">
        <q-img src="~/assets/sand.jpg">
          <div class="absolute-bottom text-caption text-center">
            Sand
          </div>
        </q-img>
      </q-card>

      <q-card class="my-card col-sm-3 q-ma-sm">
        <q-img src="~/assets/stones.jpg">
          <div class="absolute-bottom text-caption text-center">
            Stone
          </div>
        </q-img>
      </q-card>



    </div>



    <div class="subtitle q-pa-sm">
      Articles
      <q-separator color="grey" />
    </div>

    <div class="row justify-start">
      <q-card class="my-card-articles q-ma-sm">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      </q-card>

      <q-card class="my-card-articles q-ma-sm">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      </q-card>

      <q-card class="my-card-articles q-ma-sm">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      </q-card>

    </div>
    <div right class="more q-pa-sm">
      see all
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
import axios from 'axios'
import { useRouter } from 'vue-router'


export default {
  setup () {
    const $q = useQuasar()
    let timer

    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)

    const router = useRouter()

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

    function viewRods () {
      router.push('/home/brands/rods')
    }

    return {
      first: env.appNameFirst,
      last: env.appNameLast,
      name,
      age,
      accept,
      viewRods

      // onSubmit () {
      //   if (accept.value !== true) {
      //     $q.notify({
      //       color: 'red-5',
      //       textColor: 'white',
      //       icon: 'warning',
      //       message: 'You need to accept the license and terms first'
      //     })
      //   }
      //   else {
      //     $q.notify({
      //       color: 'green-4',
      //       textColor: 'white',
      //       icon: 'cloud_done',
      //       message: 'Submitted'
      //     })
      //   }
      // },


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
  height: 70px
  width: 70px

  .text-h3
    font-size: 14px

.my-card-articles
  margin-bottom: 20px
  height: 135px
  width: 100px

  .q-card__section
    background: #e52929
  .text-h6
    color: white
    font-size: 12px
    line-height: 14px
    font-family: 'Koulen'

  .text-subtitle2
    color: rgba(255, 255, 255, 0.8)
    font-family: 'Lobster'
    font-size: 12px

.more
  display: flex
  flex-direction: row
  justify-content: right
  margin-right: 10px
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
