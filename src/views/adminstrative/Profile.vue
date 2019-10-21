<template>

<div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Profile</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">User Profile</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>

    <!-- Main content -->
 
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-3">

            <!-- Profile Image -->
            <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img class="profile-user-img img-fluid img-circle"
                       src="/img/svg/avatar/superhero-black-panther.svg"
                       alt="User profile picture">
                </div>

                <h3 class="profile-username text-center">Nina Mcintire</h3>

                <p class="text-muted text-center">Software Engineer</p>

                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Followers</b> <a class="float-right">1,322</a>
                  </li>
                  <li class="list-group-item">
                    <b>Following</b> <a class="float-right">543</a>
                  </li>
                  <li class="list-group-item">
                    <b>Friends</b> <a class="float-right">13,287</a>
                  </li>
                </ul>

                <a href="#" class="btn btn-primary btn-block"><b>Follow</b></a>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->

            <!-- About Me Box -->
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">About Me</h3>
              </div>
              <!-- /.card-header -->
              <div class="card-body">
                <strong><i class="fas fa-book mr-1"></i> Education</strong>

                <p class="text-muted">
                  B.S. in Computer Science from the University of Tennessee at Knoxville
                </p>

                <hr>

                <strong><i class="fas fa-map-marker-alt mr-1"></i> Location</strong>

                <p class="text-muted">Malibu, California</p>

                <hr>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
          <!-- /.col -->
          <div class="col-md-9">
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                 
                  <li class="nav-item"><a class="nav-link active" href="#profile" data-toggle="tab">Profile</a></li>
                  <li class="nav-item"><a class="nav-link " href="#settings" data-toggle="tab">Account Settings</a></li>
                  <li class="nav-item"><a class="nav-link " href="#passwordreset" data-toggle="tab">Reset Password</a></li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                
                  <!-- /.tab-pane -->
                  <div class="tab-pane active" id="profile">
                    <!-- The Profile -->
                    <form class="form-horizontal">
                      <div class="form-group">
                        <label for="inputName" class="col-sm-2 control-label">Name</label>

                        <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="profile.name" placeholder="FullName">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="phoneNumber" class="col-sm-4 control-label">Phone Number</label>

                        <div class="col-sm-10">
                          <input type="number" class="form-control" v-model="profile.phoneNumber" placeholder="Phone Number">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="address" class="col-sm-2 control-label">Address</label>

                        <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="profile.address" placeholder="Address">
                        </div>
                      </div>
                     
                      <div class="form-group">
                        <label for="postCode" class="col-sm-2 control-label">Post Code</label>

                        <div class="col-sm-10">
                          <input type="number" class="form-control" v-model="profile.postCode" placeholder="Post Code">
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <button type="submit" v-on:click.prevent="updateProfile" class="btn btn-primary">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->

                  <div class="tab-pane " id="settings">
                    <form class="form-horizontal">
                      <div class="form-group">
                        <label for="username" class="col-sm-2 control-label">User Name</label>

                        <div class="col-sm-10">
                          <input type="text" class="form-control"  placeholder="User Name">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="email" class="col-sm-2 control-label">Email</label>

                        <div class="col-sm-10">
                          <input type="email" class="form-control" placeholder="Email">
                        </div>
                      </div>
                    
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <button type="submit" class="btn btn-success">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                  <div class="tab-pane " id="passwordreset">
                    <form class="form-horizontal">
                     
                      <div class="form-group">
                        <label for="password" class="col-sm-2 control-label">Old Password</label>

                        <div class="col-sm-10">
                          <input type="password" class="form-control" placeholder="Old Password">
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="password" class="col-sm-4 control-label">New Password</label>

                        <div class="col-sm-10">
                          <input type="password" class="form-control" placeholder="New Password">
                        </div>
                      </div>
                     
                      <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                          <button type="submit" v-on:click.prevent="resetPassword" class="btn btn-warning">Reset Password</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div><!-- /.container-fluid -->

    <!-- /.content -->
 


</div>




</template>


<script>
//import Name from './components/Name.vue'
import {fb,db} from "@/firebase.js"
export default {
    components: {
       
    },
  data(){
    return {
      profile: {
        name:null,
        phoneNumber:null,
        address:null,
        poseCode:null,

      },
    }
  },
  firestore() {
    //Get Current User ID.
    const user= fb.auth().currentUser;
    return {
      //Get single document using firestore.
      profile : db.collection("profiles").doc(user.uid)

    }
  },
  methods:{
    updateProfile(){
      this.$firestore.profile.update(this.profile)
    },
    resetPassword() {
      const auth = fb.auth();

      auth.sendPasswordResetEmail(auth.currentUser.email).then( () => {
        // Email sent.
       Toast.fire({
          type: 'success',
          title: 'Check your Email and follow the link to Reset your Password.'
        })
      }).catch( (error) => {
        // An error happened.
        console.log("Error Occurred Here!!!" + error);
      });

    }
  }
}
</script>