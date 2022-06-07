<template>
  <q-page class="container">

    <q-card v-if="profile.details.name" class="my-card">
      <div class="avatar">
        <img class="" src="~/assets/avatar.png">
      </div>


      <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="assignment_ind" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{profile.details.name}}</q-item-label>
            <q-item-label caption>{{profile.details.type}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="info" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{profile.details.phone}}</q-item-label>
            <q-item-label caption>{{profile.details.email}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
        <q-item-section avatar>
          <q-icon color="red" name="home" />
        </q-item-section>

        <q-item-section>

          <q-item-label caption>address</q-item-label>
          <q-item-label>{{profile.details.address}}</q-item-label>
        </q-item-section>
      </q-item>
      </q-list>
    </q-card>

    <div v-if="profile.details.name" class="balance">
      <q-btn @click="reload" color="brown-5" label="Check Balance" />
      <q-badge outline color="primary" :label="'BDT ' + profile.details.balance" />
    </div>


    <div class="details">

    </div>





  </q-page>
</template>

<script>
import env from './Env.js'
import { useQuasar,LocalStorage } from 'quasar'
import { ref, onMounted,reactive  } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCounterStore } from 'stores/cart_store'

import axios from 'axios'

export default {
  setup () {
    const $q = useQuasar()
    const route = useRoute()
    const router = useRouter()
    const store = useCounterStore()

    const profile = reactive({
      details: {}
    })

    $q.dark.set(false)
    const product = reactive({
      details: {},
      price: Number
    })

    onMounted( () => {
      $q.loading.show({

        spinnerColor: 'red',
        spinnerSize: 240,
        backgroundColor: 'burgundy',
        message: 'Loading...',
        messageColor: 'white'
      })

      let user =$q.localStorage.getItem("user")
      axios.get(env.BASE_URL + "users/"+user.key)
      .then(
        res => {
          profile.details =res.data
          $q.loading.hide()
        }
      )
      .catch(
        err => {
          console.log(err)
          $q.loading.hide()
        }
      )

    })

    function reload () {
      router.go()
    }

    return {

      first: env.appNameFirst,
      last: env.appNameLast,
      profile,
      reload

    }
  }
}
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap')


*
  color: grey
  background: white

.q-card
  .avatar
    text-align: center
    width: 100%
  img
    width: 200px
    margin: 10px 25px
    border: 2px solid grey
    border-radius: 10px

.balance
  margin: 20px auto
  width: 280px

  .q-badge
    height: 40px
    margin: 10px
    font-size: 15px

.details
  width: 350px
  margin: 10px auto
  text-align: center
  color: grey
  font-size: 20px

</style>
