import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";
//Import Vue-firestore
import VueFirestore from "vue-firestore";
//Vue.use(VueFirestore);
//Initialize of Use VueFirestore.
Vue.use(VueFirestore, {
  key: "id", // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
});
Vue.use(VueFirestore);

//import firebase
import {fb as firebase} from "./firebase"
// import 'admin-lte'
window.$ = window.jQuery = jQuery;
import "popper.js";
import "bootstrap";
import "admin-lte";
import "./assets/css/app.scss";
//Sweet alert2
// ES6 Modules or TypeScript
import Swal from "sweetalert2";
//Save to window object so i can use anywhere in my application
window.Swal = Swal;
//Toast sweet Alert.
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
//Save to window object is it would be available everywhere in my application.
window.Toast = Toast;
Vue.config.productionTip = false;

//Global Registration for Carousel
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

//Global Registration of Vue Filter
import Vue2Filters from 'vue2-filters'
 
Vue.use(Vue2Filters)

//Vuex Registration
 import {store} from "./store.js";

//GLobal Component Registration.
Vue.component("Navbar", require("./components/Navbar.vue").default);
Vue.component("add-to-cart", require("./components/AddToCart.vue").default);
// Vue.component('mini-cart', require('./components/MiniCart.vue').default);
//Vue.component('products-list', require('./sections/ProductList.vue').default);

let app = "";
//Set firebase onAuthStateChange observer
/**
Set a callback on the onAuthStateChanged observer,to initialize the Vue App only when
firebase is initialized. 
//Otherwise
Vue App would iniitialze before firebase.
 */
firebase.auth().onAuthStateChanged(() => {
   if(!app) {
     // initialize the app only when we are sure Firebase Auth object is ready to use.
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
