<template>
  <q-page class="cont">

    <div class=" flex-container signup">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-sm"
      >
        <h4>Sign Up</h4>
        <p class="text-subtitle1">OTP Confirmation</p>

        <q-input
          class="login-input"
          filled
          hint="Confirm your 4 digit OTP code"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />


        <div class="flex-container">
          <q-btn label="Confirm" type="submit" color="primary"/>
        </div>
      </q-form>
    </div>

  </q-page>
</template>

<script>

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
        backgroundColor: 'black',
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
      },


    }
  }
}
</script>

<style lang="sass" scoped>
.cont
  background-image: linear-gradient(#DC143C, #870c25)


.flex-container
  display: flex
  justify-content: space-evenly
  height: 100px

.signup
  min-width: 300px

  h4
    margin: 10px 10px 0px 10px
    text-align: center

  .text-subtitle1
    text-align: center




.login-input > div
  background: grey
  min-width: 800px


</style>
