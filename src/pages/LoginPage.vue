<template>
  <q-page class="flex flex-center cont">

    <div class="signup">
      <h3>
        <span id="first">{{first}}</span>
        <span id="second">{{last}}</span>
      </h3>

      <q-form
        class="q-gutter-sm"
      >
        <h4>Log In</h4>

        <q-input
          class="login-input"
          filled

          v-model="tel"
          mask="###-####-####"
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


        <div class="text-center">
          <q-btn label="Login" @click="submitLogin" color="primary"/>
        </div>


      </q-form>

      <div class="err-msg text-center">
        <span class="text-subtitle2">
          {{message}}
        </span>
      </div>

    </div>


  </q-page>
</template>

<script>
import env from './Env.js'
import axios from 'axios'
import { useQuasar } from 'quasar'
import { ref, onMounted  } from 'vue'
import { useRouter } from 'vue-router'


export default {
  setup () {
    const $q = useQuasar()

    const tel = ref(null)
    const password = ref(null)
    const message = ref(null)

    const router = useRouter()

    function submitLogin () {

      if (tel.value == null || password.value == null || tel.value.length <11 || password.value.length == 0 ) {
        console.log("tel and pass empty")
        return
      }


    $q.loading.show({

      spinnerColor: 'red',
      spinnerSize: 240,
      backgroundColor: 'burgundy',
      message: 'Confirming...',
      messageColor: 'white'
    })

      tel.value = tel.value.replace(/-/g,"")

      // console.log(env.BASE_URL + "users/login")

      const payload = {
        phone: tel.value,
        password: password.value
      }
      console.log(payload)
      const url = env.BASE_URL + "users/login"
      axios.post(url, payload)
      .then(
        resp => {
          message.value = "Successfully Logged In"
          $q.loading.hide()
          router.push('/home')
        }
      ).catch(
        error => {
          $q.loading.hide()
          tel.value = ""
          password.value = ""
          message.value = "Login Unsuccessful. Please make sure your login credentials are correct or contact support"

        }
      )
    }

    // onMounted( () => {
    //   $q.loading.show({

    //     spinnerColor: 'red',
    //     spinnerSize: 240,
    //     backgroundColor: 'burgundy',
    //     message: 'Confirming...',
    //     messageColor: 'white'
    //   })

    //   // hiding in 3s
    //   timer = setTimeout(() => {
    //     $q.loading.hide()
    //     timer = void 0
    //   }, 3000)

    // })

    return {
      first: env.appNameFirst,
      last: env.appNameLast,
      tel,
      password,
      submitLogin,
      message,

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
  justify-content: space-space-evenly
  height: 100vh

.signup
  margin-top: 150px
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


.err-msg
  height: 100px
  margin: 100px auto
  padding: 0px

#second
  font-family: 'Koulen', cursive
  color: rgba(beige , 0.7 )

#first
  font-family: 'Lobster', cursive
  margin: 0px 5px

</style>
