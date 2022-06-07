<template>
  <q-page class="flex flex-center cont">
    <div class="flex-container q-pa-md">
      <h3>
        <span id="first">Pocket</span>
        <span id="second">Contractor</span>
      </h3>
      <h4>Sign Up</h4>
      <p>
        Choose your category
      </p>

      <div class="radio-selects q-gutter-md">
        <q-radio dense v-model="type" val="landlord" checked-icon="task_alt" label="landlord" />
        <q-radio dense v-model="type" val="contractor" checked-icon="task_alt" label="contractor" />
        <q-radio dense v-model="type" val="sme" checked-icon="task_alt" label="SME" />
      </div>
      <q-btn @click="selectType" label="Next" color="primary"/>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, onMounted  } from 'vue'
import { useRouter } from 'vue-router'


export default {
  setup () {

    const $q = useQuasar()
    const router = useRouter()

    const type = ref("")

    let timer

    onMounted( () => {
      $q.loading.show({

        spinnerColor: 'red',
        spinnerSize: 240,
        backgroundColor: 'burgundy',
        message: 'Loading...',
        messageColor: 'white'
      })

      // hiding in 3s
      timer = setTimeout(() => {
        $q.loading.hide()
        timer = void 0
      }, 1000)

    })

    function selectType () {
      console.log(type.value)
      if(type.value == "landlord")
        router.push({name: "landlord"})
      else if(type.value == "contractor")
        router.push({name: "contractor"})
      else
        router.push({name: "sme"})
    }
    return {
      type: ref('landlord'),
      type,
      selectType
    }
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap')

.cont
  background-image: linear-gradient(#DC143C, #870c25)


.flex-container
  display: flex
  flex-direction: column
  justify-content: space-space-evenly
  align-items: center

  button
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


.radio-selects
  display: flex
  flex-direction: column
  margin: 10px auto 30px auto

.login-input > div
  background: grey
  min-width: 800px


</style>
