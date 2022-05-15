<template>
  <q-page class="flex flex-center cont">

    <div class="signup">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-sm"
      >
        <h4>Sign Up</h4>
        <p class="text-subtitle1">SME</p>

        <q-input
          class="login-input"
          filled
          v-model="name"
          label="Organization name"
          hint="Name of the company"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />


        <q-input
          class="login-input"
          filled
          v-model="name"
          label="name *"
          hint="Manager's Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          class="login-input"
          filled
          type="email"
          v-model="email"
          label="email address"
          hint="has to be a valid email address"
          lazy-rules
        />

        <q-input
          class="login-input"
          filled
          type="tel"
          v-model="phone"
          label="phone number"
          hint="start with +8801"
          lazy-rules
        />

        <q-input
          class="login-input"
          filled
          type="text"
          v-model="address"
          label="address"
          hint="enter your billing address"
          lazy-rules
        />

        <q-input
          class="login-input"
          filled
          type="text"
          v-model="address2"
          label="address line 2"
          hint="leave empty if not needed"
          lazy-rules
        />

        <q-input
          class="login-input"
          filled
          type="text"
          v-model="tradeLicence"
          label="Trade Licence"
          hint="Trade Licence"
          lazy-rules
        />

        <q-input
          class="login-input"
          filled
          type="text"
          v-model="TIN"
          label="TIN"
          hint="TIN number"
          lazy-rules
        />



        <div class="flex-container">
          <q-btn label="Sign Up" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="grey"  class="q-ml-sm" />
        </div>
      </q-form>
    </div>

  </q-page>
</template>

<script>

import { useQuasar, QSpinnerFacebook } from 'quasar'
import { ref, onMounted } from 'vue'

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
.cont
  background-image: linear-gradient(#DC143C, #870c25)


.flex-container
  display: flex
  justify-content: center

.signup
  margin-top: 40px
  min-width: 300px

  button
    margin: 10px auto

  h4
    margin: 10px 10px 0px 10px
    text-align: center

  .text-subtitle1
    text-align: center




.login-input > div
  background: grey
  min-width: 800px


</style>
