<template>

  <!-- Content Wrapper. Contains page content -->
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-12">
            <h1 class="m-0 text-dark">Product Page</h1>
          </div><!-- /.col -->
    
        </div><!-- /.row -->
      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <div class="container-fluid">
    <!--
        <div class="intro">
          <div class="row">
            <div class="col-md-6">
              <h3>Overview</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore id, saepe ex placeat et a vero! Explicabo deleniti dolorum veritatis. Vel accusamus cupiditate sit officia nemo dolores quae, culpa unde.
              </p>
            </div>
            <div class="col-md-6">
              <img src="/img/svg/product-admin.svg" class="img-fluid" alt="Product SVG">
            </div>
          </div>
        </div>
 -->
        <div class="card card-primary">
          <!-- form start -->
          <form class="form-horizontal">
            <div class="card-body">
              <div class="form-group row">
                <label for="name" class="col-sm-2 control-label">Name</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control"  v-model="product.name"  placeholder="Product Name">
                </div>
              </div>
              <div class="form-group row">
                <label for="price" class="col-sm-2 control-label">Price</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="product.price" placeholder="Price">
                </div>
              </div>
          
            </div>
            <!-- /.card-body -->
            <div class="card-footer">
              <button type="submit" v-on:click.prevent="saveProduct" class="btn btn-primary">Save</button>
              <button type="submit" class="btn btn-danger float-right">Cancel</button>
            </div>
            <!-- /.card-footer -->
            </form>
        </div> 
        <!--table Starts Here-->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Product Details</h3>
          </div>
          <div class="card-body">
            <table class="table table-bordered">
              <thead>                  
                <tr>
                  <th style="width: 10px">#</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in products" v-bind:key="index">
                  <td>{{index}}</td>
                  <td>{{product.data().name}}</td>
                  <td>
                    {{product.data().price}}
                  </td>
                  <td>
                    <a v-on:click="editProduct(product)" class="btn btn-custom btn-success">
                      <i class="fas fa-edit"></i> Edit
                    </a>
                     <a  v-on:click="deleteProduct(product)" class="btn btn-custom btn-danger" >
                     <i class="fas fa-trash"></i> Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--Table Ends Here-->

      </div><!-- /.container-fluid -->
      <!--
    <edit-product-modal v-bind:products="products" v-bind:product="product" :productID="productID"> </edit-product-modal>
    -->
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
  </div>
  <!-- /.content-wrapper -->


<!-- ./wrapper -->
</template>

<script>
import {db} from  "@/firebase.js"
//import EditModal from '@/sections/ProductModal.vue'
export default {
  components : {
    //'edit-product-modal' : EditModal
  },
  data() {
    return {
      products : [],
      product: {
        name: null,
        price: null
      },
      productID:null
    }
  },
  methods: {
    //Add Data to Database
    saveProduct() {
      db.collection("products").add(this.product)
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.readProducts();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    },
    //Get All Data from FireStore.
    readProducts() {
      db.collection("products").get().then( (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
          //to get data use doc.data().
          let test = this.products.push(doc);
        });
      });
    },
    editProduct(product) {
      $('#editModal').modal('show');
      this.product = product.data();
      this.productID = product.id;
    },
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
                this.watcher()
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        },
    deleteProduct(doc){
      //Getting primary key from firestore.
      //console.log(doc.id);
      if(confirm('Are you sure you want to delete Data')) {
        db.collection("products").doc(doc.id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch( (error) => {
            console.error("Error removing document: ", error);
        });
      } else {
        console.log("Nothing Happened Cancelled.");
      }
    },
    resetForm() {
     // Object.assign(this.$data, this.$options.data.apply(this))
    }
  },
  created() {
    this.readProducts();
  }

}
</script>

<style >
.btn-custom {
	border-radius: 3px;
	position: relative;
	padding: 15px 5px;
	margin: 0 0 10px 10px;

	text-align: center;
	color: #666;
	border: 1px solid #ddd;
	background-color: #f4f4f4;
	font-size: 12px;
}
</style>
