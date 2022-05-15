<template>
  <q-page class="flex flex-center cont">

    <div class="signup">
      <h3>
        <span id="first">{{first}}</span>
        <span id="second">{{last}}</span>
      </h3>

      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-sm"
      >
        <h4>Log In</h4>

        <q-input
          class="login-input"
          filled
          v-model="tel"
          label="Phone Number *"
          hint="Registered phone number that was used to sign up"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          class="login-input"
          filled
          type="password"
          v-model="password"
          label="password"
          hint="the password for this account"
          lazy-rules
        />


        <div class="flex-container">
          <q-btn label="Sign Up" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="grey" class="q-ml-sm" />
        </div>
      </q-form>
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


.cont
  background-image: linear-gradient(#DC143C, #870c25)


.flex-container
  display: flex
  flex-direction: column
  justify-content: space-between
  height: 100vh

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
  background: grey
  min-width: 800px


#second
  font-family: 'Koulen', cursive
  color: rgba(beige , 0.7 )

#first
  font-family: 'Lobster', cursive
  margin: 0px 5px

</style>
