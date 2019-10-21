<template>
<div class="wrapper">

  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <router-link to="/" class="nav-link">Front End</router-link>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li>
    </ul>

    <!-- SEARCH FORM -->
    <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </form>

  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img src="/img/svg/avatar/robot-02.svg" alt="Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">Ecom</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="/img/svg/avatar/traditional-african-man.svg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{email}}</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <a href="#" class="nav-link">
              
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <span class="right badge badge-danger">New</span>
              </p>
            </a>
          </li>
          <li class="nav-item">
            <router-link to="/admin/overview" class="nav-link">
              <i class="nav-icon fas fa-chart-bar"></i>
              <p>
                Overview
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link">
              
              <i class="nav-icon fab fa-product-hunt"></i>
              <p>
                Products
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link">
              <i class="nav-icon fas fa-shopping-cart"></i>
              <p>
                Orders
              </p>
            </router-link>
          </li>
          </li>
          <li class="nav-item">
            <router-link to="/admin/profile" class="nav-link">
              <i class="nav-icon fas fa-user"></i>
              <p>
                Profile
              </p>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="" v-on:click.prevent="signOut()" >
              <i class="nav-icon fas fa-sign-out-alt"></i>
    
              <p>
                Logout
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) 
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-12">
            <h1 class="m-0 text-dark">Starter Page</h1>
          </div> /.col -->
    
       <!-- </div> /.row -->
     <!-- </div> /.container-fluid -->
    <!--</div>
     /.content-header -->

    <!-- Main content -->
    <div class="content">
      <router-view> </router-view>
    </div>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->


  <!-- Main Footer -->
  <footer class="main-footer">
    <!-- To the right -->
    <div class="float-right d-none d-sm-inline">
      Anything you want
    </div>
    <!-- Default to the left -->
    <strong>Copyright &copy; 2014-2019 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
  </footer>
</div>
<!-- ./wrapper -->
</template>

<script>
import { fb as firebase } from "@/firebase.js";
export default {
  data() {
    return {
      name: null,
      email:null,
    }
  },
  methods : {
    getUserInformation() {
      var user = firebase.auth().currentUser;
      this.email = user.email;
    },
    signOut: function() {
      firebase.auth().signOut()
      .then(() => {
        this.$router.replace('/')
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  created() {
    this.getUserInformation();
  }
}
</script>