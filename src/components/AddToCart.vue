<template>
<div>
    <button v-on:click="addToCart" class="btn btn-primary">Add To Cart </button>
</div>
</template>

<script>
export default {
name: "add-to-cart",
props: {
    image:{
        type: String,
    },
    pId:{
        type: Number,
    },
    price:{
        type : String,
    },
    name: {
        type : String
    }
},
data() {
    return {
        items : {
            productId:this.pId,
            productPrice: this.price,
            productName: this.name,
            productImage:this.image,
            productQuantity: 1,
        }

    }
},
methods:{
    addToCart() {
        $("#miniCart").modal("show")
        this.$store.commit('AddToCart',this.items);
    }
}
}
</script>