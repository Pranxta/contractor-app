<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-red-12">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <span id="first">{{first}}</span><span id="second">{{last}}</span>
        </q-toolbar-title>

        <div>


           <q-btn
            id="search"
            flat
            dark
            icon-right="shopping_cart"
            :to="'/home/checkout'"
          >
          <q-badge v-if="store.getCart.length >0" color="green" floating>{{store.getCart.length}}</q-badge>
          </q-btn>


          <q-btn
            id="search"
            flat
            dark
            icon-right="search"
          >
          </q-btn>


        </div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import env from '../pages/Env.js'
import { useQuasar } from 'quasar'
import { ref,computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useCounterStore } from 'stores/cart_store'


const linksList = [
  {
    title: 'Profile',
    caption: 'check balance',
    icon: 'account_circle',
    link: '#/home/profile'
  },
  {
    title: 'Home',
    caption: 'main page',
    icon: 'home',
    link: '#/home'
  },
  {
    title: 'products',
    caption: 'all avilable products',
    icon: 'inventory',
    link: '#/home'
  },
  {
    title: 'tools',
    caption: 'tools to help you',
    icon: 'square_foot',
    link: '#/home/calculatorone'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: '#/home'
  },
  {
    title: 'Twitter',
    caption: '@pocketcontractor',
    icon: 'rss_feed',
    link: '#/home'
  },
  {
    title: 'Facebook',
    caption: '@pocketcontractor',
    icon: 'favorite',
    link: '#/home'
  },
  {
    title: 'website',
    caption: 'info about us',
    icon: 'public',
    link: '#/home'
  }
]

export default {

  components: {
    EssentialLink
  },

  setup () {
    const $q = useQuasar()
    $q.dark.set(true)
    const store = useCounterStore()

    const leftDrawerOpen = ref(false)

    return {
      first: env.appNameFirst,
      last: env.appNameLast,
      essentialLinks: linksList,
      leftDrawerOpen,
      store,

      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Koulen&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap')

.q-drawer
  color: white
  background: black
#second
  font-family: 'Koulen', cursive
  color: rgba(beige , 0.7 )
  font-size: 18px

#first
  font-family: 'Lobster', cursive
  margin: 0px 2px
  font-size: 18px

#search
  align-items: right
  width: 50px
  margin-right: -5px
</style>
