<template>
  <q-page class="flex flex-center cont">
    <div class="flex-container q-pa-md">
      <h3>
        <span id="first">{{first}}</span>
        <span id="second">{{last}}</span>
      </h3>
      <q-btn label="Sign Up" type="submit" color="grey"/>
      <q-btn to="/login" label="Log in" type="submit" color="primary" class="q-ml-sm" />
    </div>
  </q-page>
</template>

<script>
import env from './Env.js'
import { useQuasar } from 'quasar'
import { ref, onMounted  } from 'vue'


export default ({
  setup () {
    const $q = useQuasar()
    let timer

    onMounted( () => {
      $q.loading.show({

        spinnerColor: 'red',
        spinnerSize: 240,
        backgroundColor: 'burgundy',
        message: 'Loading...',
        messageColor: 'black'
      })

      // hiding in 3s
      timer = setTimeout(() => {
        $q.loading.hide()
        timer = void 0
      }, 3000)

    })

    return {
      first: env.appNameFirst,
      last: env.appNameLast
    }
  }
})
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap')

.cont
  background-image: linear-gradient(#DC143C, #870c25)


.flex-container
  display: flex
  flex-direction: column
  justify-content: space-evenly
  height: 250px

  button
    margin: 0 auto
    align-self: unset
    width:200px


h3
  margin: 10px
  padding: 10px
  font-size: 3em
  text-align: center

  .text-subtitle1
    text-align: center

#second
  font-family: 'Koulen', cursive
  color: rgba(beige , 0.7 )

#first
  font-family: 'Lobster', cursive
  margin: 0px 5px

.login-input > div
  background: grey
  min-width: 800px

.q-btn
  margin: 0 auto
  width: 200px

</style>
