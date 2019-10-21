<template>
<!-- Modal -->
<div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       
       
            <div class="card-body">
              <div class="form-group row">
                <label for="name" class="col-sm-2 control-label">Name</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="product.name" placeholder="Product Name">
                </div>
              </div>
              <div class="form-group row">
                <label for="price" class="col-sm-2 control-label">Price</label>
                <div class="col-sm-10">
                  <input type="text" v-model="product.price" class="form-control" placeholder="Price">
                </div>
              </div>
          
            </div>
       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" v-on:click="updateProduct" class="btn btn-success">Update changes</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {db} from "@/firebase.js"
export default {
    props:[
        'products',
        'product',
        'productID'
    ],
    methods: {
        watcher() {
            db.collection("products")
            .onSnapshot((querySnapshot) => {
                this.products = [];
                querySnapshot.forEach((doc) => {
                    this.products.push(doc);
                });
    
            });
        },
        updateProduct() {
            db.collection("products").doc(this.productID).update(this.product)
            .then(()=> {
                $("#editModal").modal('hide');
            
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        }
    },
    created() {
        if(this.updateProduct()){
            this.watcher();
        }
    }
}
</script>
