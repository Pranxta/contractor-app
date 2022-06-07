
const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/SplashPage.vue')
      },
      {
        path: 'select',
        component: () => import('pages/SelectPage.vue')
      },
      {
        path: 'login',
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: 'signupLand',
        component: () => import('src/pages/SignupLandlordPage.vue')
      },
      {
        path: 'signupContractor',
        component: () => import('src/pages/SignupContractorPage.vue')
      },
      {
        path: 'signupSme',
        component: () => import('src/pages/SignupSmePage.vue')
      },
      {
        path: 'signupOtp',
        component: () => import('src/pages/SignupOtpPage.vue')
      },

    ]
  },

  {
    path: '/home/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/HomePage.vue')
      },
      {
        path: 'brands/:cat',
        component: () => import('src/pages/BrandPage.vue')
      },
      {
        name: "brandCat",
        path: 'products/',
        component: () => import('src/pages/ProductsPage.vue'),
        props: true
      },
      {
        path: 'singleproduct/:id',
        component: () => import('src/pages/SingleProductPage.vue')
      },
      {
        path: 'checkout',
        component: () => import('src/pages/CheckoutPage.vue')
      },
      {
        path: 'calculatorone',
        component: () => import('src/pages/CalculatorOnePage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
