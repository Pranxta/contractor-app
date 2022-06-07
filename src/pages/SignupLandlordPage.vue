<template>
  <q-page class="flex flex-center cont">

    <div class="signup">
      <q-form
        class="q-gutter-sm"
      >
        <h4>Sign Up</h4>
        <p class="text-subtitle1">Landlord</p>
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
          v-model="add1"
          label="address"
          hint="enter your billing address"
          lazy-rules
        />

        <q-input
          class="login-input"
          filled
          type="text"
          v-model="add2"
          label="address line 2"
          hint="leave empty if not needed"
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



        <div class="flex-container">
          <q-btn @click="signup" label="Sign Up" color="primary"/>
          <q-btn label="Reset" type="reset" color="grey" class="q-ml-sm" />
        </div>
      </q-form>
    </div>

  </q-page>
</template>

<script>

import { useQuasar, QSpinnerFacebook  } from 'quasar'
import { ref, onMounted, reactive  } from 'vue'
import axios from 'axios'
import Env from './Env'



export default {
  setup () {
    const $q = useQuasar()
    let timer

    const add1 = ref("")
    const add2 = ref("")
    const user = reactive({
      name: "",
      email: "",
      phone: "",
      address: "",
      nid: "",
      type: "landlord"
    })


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
      }, 1000)

    })

    function signup () {
      $q.loading.show()
      if(add2.value !== "" || add2.value !== null)
      user.address = add1.value + " " + add2.value

      axios.post(Env.BASE_URL + "users/", user)
      .then(
        res => {
          console.log(res.data)
          $q.loading.hide()
        }
      )
      .catch(
        err=> {
          console.log(err)
          $q.loading.hide()
        }
      )

    }

    return {
      user,
      add1,
      add2,
      signup,

      onReset () {
        user.name = null
        user.phone = null
        user.email = null
        user.name = null
        add1.value = null
        add2.value = null
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
  flex-direction: column
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
