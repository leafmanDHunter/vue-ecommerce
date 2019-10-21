<template>
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
    <div class="col-md-12">
        <div class="card">
            <div class="card-header">
                <h3 class="d-inline-block card-title">List of Products</h3>
                <button v-on:click="showAddProductModal" class="btn btn-primary float-right">Add Product</button>
            </div>
            <!-- /.card-header -->
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>                  
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Manipulate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(product,index) in products" v-bind:key="product['.key']">
                            <td>{{index}}</td>
                            <td>{{product.name}}</td>
                            <td>{{product.price}}</td>
                           
                            <td>
                                <a v-on:click="editProduct(product)" class="btn  btn-success btn-custom">
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
            <!-- /.card-body -->
        </div>
        <!-- /.card -->
    </div>


        <!--Product Modal-->
    
      <!-- /.modal -->
        <!--End of Product Modal-->


   <!-- Modal -->

    <div class="modal fade" id="product-modal">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" v-if="showModal=='addProduct'">Add Product</h4>
              <h4 class="modal-title" v-if="showModal=='editProduct'">Edit Product</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                    
                      <vue-editor v-model="product.description"></vue-editor>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>
                    <div class="form-group">
                      <input type="text" v-model="product.price" placeholder="Product price"  class="form-control">
                    </div>

                    <div class="form-group">
                      <!--Add multiple tag to product.tags using event -->
                      <input type="text" v-on:keyup.188="addTag" v-model="tag" placeholder="Product tags"  class="form-control">
                      <span class="badge bg-primary" style="margin-right:5px;" v-for="(ta, index) in product.tags" v-bind:key="index" >
                        {{ta}}
                      </span>
                    </div>

                    <div class="form-group">
                      <div class="custom-file">
                        <input type="file" v-on:change="uploadImage" class="custom-file-input" id="exampleInputFile">
                        <label class="custom-file-label" for="exampleInputFile">Product Images</label>
                      </div>
                    </div>
                 

                    <div class="form-group d-flex">
                      <div class="p-1" v-for="(image, index) in product.images" v-bind:key="index">
                          <div class="img-wrapp">
                              <img :src="image" alt="" width="80px">
                              <span class="delete-img" v-on:click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>

                  </div>
                </div>

            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" v-if="showModal=='addProduct'" v-on:click="addProduct" class="btn btn-primary">Add Product</button>
              <button type="button" v-if="showModal=='editProduct'" v-on:click="updateProduct" class="btn btn-success">Edit Product</button>
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->

    </div>
</template>
<script>
import {fb, db} from "@/firebase.js"
//Vue-QUILL WYSIWYG Editor.
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },
    firestore() {
        return {
            products: db.collection('products'),
        }
    },
    data() {
        return {
            products : [],
            product:{
                name:null,
                price:null,
                description:null,
                tags:[],
                images:[],
            },
            showModal: null,
            tag:null
        }
    },
    methods:{
      //Upload Image
      uploadImage(e) {
        
         if(e.target.files[0]){
        
          let file = e.target.files[0];
    
          var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
    
          let uploadTask  = storageRef.put(file);
    
          uploadTask.on('state_changed', (snapshot) => {
            
          }, (error) => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
            });
          });
      }
      },
    
     deleteImage(img,index){
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index,1);
      image.delete().then(function() {
        console.log('image deleted');
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log('an error occurred');
      });
    },
      //Add Tag.
      addTag(){
        this.product.tags.push(this.tag);
        this.tag="";
      },
      showAddProductModal() {
        this.showModal = "addProduct";
        //Clean Form Data first.
        this.formReset();
        $("#product-modal").modal('show');
      },
      addProduct() {
          this.$firestore.products.add(this.product);
           Toast.fire({
                  type: 'success',
                  title: 'Record Added Successfully'
                })
          $("#product-modal").modal('hide');
      },
      //Show Edit Product Modal
      editProduct(product) {
        this.showModal = "editProduct";
        //Assign product object in data() to current Product.
        this.product = product;
        $("#product-modal").modal('show');
      
      },
      updateProduct() {
        this.$firestore.products.doc(this.product.id).update(this.product);
        Toast.fire({
          type: 'success',
          title: 'Record Updated Successfully'
        })
        $("#product-modal").modal('hide');
      },
      deleteProduct(product) {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.value) {
              //Perform Asynchronous or server request to
              //Delete record from database. 
              this.$firestore.products.doc(product.id).delete()
              //if Successful, show Success Message. SwtAlert or Toast.
              /*
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              */
              Toast.fire({
                  type: 'success',
                  title: 'Record Deleted Successfully'
                })
            }
          })
        },
        formReset() {
         this.product = {
                name:null,
                price:null,
                description:null,
                tags:[],
                images:[],
            }
        }

    }
    
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.btn-custom {
	margin: 0 0 10px 10px;
}
.img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
  cursor: pointer;
}

</style>