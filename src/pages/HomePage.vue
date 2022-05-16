<template>
  <q-page class="flex row wrap justify-start content-start cont">

    <div class="q-pa-md">
      <h4>Hello</h4>
    </div>


    <div class="q-pa-md">
      <h4>Hello</h4>
    </div>

    <div class="q-pa-md">
      <h4>Hello</h4>
    </div>

    <div class="q-pa-md">
      <h4>Hello</h4>
    </div>

    <div class="q-pa-md">
      <h4>Hello</h4>
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
  color: black

.cont
  background: white
  color: grey

.signup
  margin-top: 100px
  width: 90vw

  button
    margin: 10px auto

  h4
    margin: 10px 10px 0px 10px
    text-align: center

  h3
    margin: 10px auto
    padding: 10px
    font-size: 3em
    text-align: center

  .text-subtitle1
    text-align: center




.login-input > div
    background: white
    min-width: 800px


#second
  font-family: 'Koulen', cursive
  color: rgba(beige , 0.7 )

#first
  font-family: 'Lobster', cursive
  margin: 0px 5px

</style>
