<template>
  <q-page class="flex flex-center cont">

    <div class="signup">
      <q-form
        class="q-gutter-sm"
      >
        <h4>Sign Up</h4>
        <p class="text-subtitle1">Contractor</p>
        <q-input
          class="login-input"
          filled
          v-model="user.name"
          label="name *"
          hint="Name and surname"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          class="login-input"
          filled
          type="email"
          v-model="user.email"
          mask="N*@N*.com"
          label="email address"
          hint="has to be a valid email address"
          lazy-rules
        />

        <q-input
          class="login-input"
          filled
          type="tel"
          v-model="user.phone"
          label="phone number"
          hint="start with +8801"
          lazy-rules
        />

        <q-input
          class="login-input"
          filled
          type="text"
          v-model="user.address"
          label="address"
          hint="enter your billing address"
          lazy-rules
        />



        <q-input
          class="login-input"
          filled
          type="text"
          v-model="user.nid"
          label="nid number"
          hint="your NID number"
          lazy-rules
        />

        <q-separator color="white"/>

        <q-input
          class="login-input"
          filled
          type="password"
          v-model="user.password"
          label="password"
          hint="atleast 6 characters"
          lazy-rules
        />

        <q-input
          class="login-input"
          filled
          type="password"
          v-model="password2"
          label="reconfirm password"
          hint="reconfirm password"
          lazy-rules
        />



        <div class="buttn">
          <span v-if="error" class="notice">* Passwords dont match</span>
          <br>
          <q-btn @click="submitDetails" label="Sign Up" color="primary"/>
        </div>
      </q-form>
    </div>

  </q-page>
</template>

<script>
import env from './Env.js'
import { useQuasar, QSpinnerFacebook  } from 'quasar'
import { ref, onMounted, reactive  } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const $q = useQuasar()
    const password2 = ref("")
    const error = ref(false)

    const router = useRouter()

    const user = reactive({
      name: null,
      phone: null,
      email: null,
      password: null,
      type: "contractor",
      role: "user",
      status: false,
      balance: 0,
      address: null,
      nid: null,
      created: null
    })


    onMounted( () => {
      // $q.loading.show({

      //   spinnerColor: 'red',
      //   spinnerSize: 240,
      //   backgroundColor: 'burgundy',
      //   message: 'Confirming...',
      //   messageColor: 'white'
      // })

      // // hiding in 3s
      // timer = setTimeout(() => {
      //   $q.loading.hide()
      //   timer = void 0
      // }, 3000)

    })

    function getDate () {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0')
      var yyyy = today.getFullYear()

      let dateTime = dd + '/' + mm + '/' + yyyy + " @ "
        + today.getHours() + ":"
        + today.getMinutes()

      return dateTime
    }

    function submitDetails () {
      $q.loading.show({
        spinnerColor: 'red',
        spinnerSize: 240,
        backgroundColor: 'burgundy',
        message: 'Confirming...',
        messageColor: 'white'
      })

      if(password2.value ==="" ) {
        error.value = true
        $q.loading.hide()
        return
      }else if( user.password !== password2.value) {
        error.value = true
        $q.loading.hide()
        return
      }

      user.password = password2
      user.created = getDate()

      axios.post(env.BASE_URL + "users", user)
      .then(
        res => {
          $q.loading.hide()
          router.push('home/')
          showSuccessDialog()
        }
      ).catch(
        err => {
          $q.loading.hide()
          showFailDialog()
        }
      )
    }

    function showSuccessDialog () {
      console.log("success")
    }

    function showFailDialog (e) {
      console.log("error:", e)
    }
    return {
      user,
      password2,
      error,
      submitDetails



    }
  }
}
</script>

<style lang="sass" scoped>
.cont
  background-image: linear-gradient(#DC143C, #870c25)


.flex-container
  display: flex
  flex-direction: column
  justify-content: space-evenly

.buttn
  width: 100%
  text-align: center

  button
    width: 150px
    margin: 10px auto 40px auto

.signup
  max-width: none
  margin-top: 40px
  min-width: 240px

  h4
    margin: 10px 10px 0px 10px
    text-align: center

  .text-subtitle1
    text-align: center


.q-separator
  margin: 20px 0px

.login-input > div
  background: grey
  min-width: 800px

.notice
  display: block
  margin-top: 20px

</style>
