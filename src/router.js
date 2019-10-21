import Vue from "vue";
import Router from "vue-router";
import {fb as firebase} from './firebase.js'

import Home from "./views/Home.vue";
import AdminOld from "./views/AdminOld.vue";
import Admin from "./views/Admin.vue";
import Overview from "./views/adminstrative/Overview.vue";
import Product from "./views/adminstrative/Product.vue";
import Order from "./views/adminstrative/Order.vue";
import Profile from "./views/adminstrative/Profile.vue";
import Checkout from "./views/Checkout.vue";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/adminold",
      name: "adminold",
      component: AdminOld
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout
    },
    {
      path: "/admin",
      name: "admin",
      component: Admin,
      //meta property to ensure that route is being authenticated.
      meta: { requiresAuth: true },
      children: [
        {
          path: "overview",
          name: "overview",
          component: Overview
        },
        {
          path: "products",
          name: "products",
          component: Product
        },
        {
          path: "orders",
          name: "orders",
          component: Order
        },
        {
          path: "profile",
          name: "profile",
          component: Profile
        }

      ]
    }
  ]
});
//Using firebasee as guard to secure Admin and its children route.
//Check  for meta property in route to ensure authentication 
//beforeEach = Global router Guard in Vuejs.
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to home  page or login page as specified.
    //using fiirebase to get current user.
    //!firebase.auth().currentUser returns currentUser or null =>if null retire back else proceed with request next()
    if (!firebase.auth().currentUser) {
      next({
        path: '/',
        //query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});

//export router object
export default router;
