<template>
  <q-page class="flex flex-center cont">

    <div class="signup">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-sm"
      >
        <h3>Sign Up</h3>

        <q-input
          class="login-input"
          filled
          v-model="name"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          class="login-input"
          filled
          type="email"
          v-model="email"
          label="Your email address"
          hint="has to be a valid email address"
          lazy-rules
        />

        <q-input
          class="login-input"
          filled
          type="tel"
          v-model="phone"
          label="Your phone number"
          hint="start with +8801"
          lazy-rules
        />

        <q-input
          class="login-input"
          filled
          type="text"
          v-model="address"
          label="Your address"
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
          type="phone"
          v-model="phone"
          label="Your phone number"
          hint="start with +8801"
          lazy-rules
        />

        <div class="flex-container">
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>

  </q-page>
</template>

<script>

import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    const name = ref(null)
    const age = ref(null)
    const accept = ref(false)

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
  min-width: 300px

  h3
    text-align: center

.login-input > div
  background: grey
  min-width: 800px
</style>
