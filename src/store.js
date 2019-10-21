import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
//Retrieve Product information from LocalStorage and store in shopping Cart Variable.
let shoppingCart = window.localStorage.getItem("productCart");
export const store = new Vuex.Store({
  state: {
    cart: shoppingCart ? JSON.parse(shoppingCart) : []
  },
  //mutations are like methods in Vuejs
  mutations: {
    AddToCart(state, item) {
      //use Find Function to check if product exist in cart. if yes add +1 to  quantity. if no, add product to cart.
      //product.productId === item.productId similar to " return product.productId == item.productId//
      let checkProduct = state.cart.find(product => product.productId === item.productId);

      if (checkProduct) {
        checkProduct.productQuantity++;
      } else {
        state.cart.push(item);
      }
      //reference mutation
      this.commit("saveDataToLocalStorage");
    },

    //Save Product Information on LocalStorage Browser.
    saveDataToLocalStorage(state) {
      window.localStorage.setItem("productCart", JSON.stringify(state.cart));
    },
    //Delete Product from Shopping Cart.
    removeProductFromCart(state, value) {
      //find the index of the product.
      let index = state.cart.indexOf(value);
      //Remove Item from Cart.
      state.cart.splice(index,1);
      //Save items to local Storage.
      this.commit("saveDataToLocalStorage")
    }
  }
})