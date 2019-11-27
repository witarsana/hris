<template>
  <div class="container d-flex align-items-center min-vh-100">
    <div class="row justify-content-md-center" style="width:100%">
      <div class="col-md-6">
        <div :class="{ 'dis' : isSubmitted == true}" class="card" style="width: 100%;">
          <div class="card-body">
            <h1 class="card-title">Login</h1>
            <p class="card-text text-muted">Please sign in to your account</p>
            <form   @submit.prevent="login">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <div class="input-group-text"><CIcon name="cil-user"/></div>
                </div>
                <input v-model="form.name" placeholder="Username" type="text" class="form-control " :class="{ 'is-invalid' : errorMessages!=null && errorMessages.name!=undefined}">
                <div class="invalid-feedback">
                    The Field is Required
                </div>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <div class="input-group-text"><CIcon name="cil-lock-locked"/></div>                
                </div>
                <input v-model="form.password" placeholder="Password" type="password" class="form-control" :class="{ 'is-invalid' : errorMessages!=null && errorMessages.password!=undefined}">
                <div class="invalid-feedback">
                   The Field is Required
                </div>
              </div>
              <div v-if="errorMessage.length>0" class="text-center mb-3 text-danger">
                {{errorMessage}}
              </div>
              <a @click="login" href="#" :class="{ 'disabled' : isSubmitted == true}" class="btn btn-primary">Sign In</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
const url = process.env.VUE_APP_API_SOURCE;

export default {
  name: 'Login',
  data() {
    return {   
      form : {
        name : '',
        password : ''
      },
      isSubmitted : false,
      isError : false,
      errorMessages : null,
      errorMessage  :''      
    }
  },
  methods :{
    enableSubmit(){
      this.isSubmitted = true;
    },
    disabledSubmit(){
      this.isSubmitted = false;
    },
    login(){     
      this.sendFormData();
    },
    sendFormData(){
      this.enableSubmit();
      axios.post(''+url+'tenantlogin',this.form,{
        headers : {
          'Authorization' : ''+this.$store.getters.curentCompany.token_type+' '+this.$store.getters.curentCompany.access_token+''
        }
      }).then((res)=>{
        this.disabledSubmit();
        this.processResponse(res);
      }).catch((err)=>{
        this.disabledSubmit();
        console.log(err);
      })
    },
    processResponse(res){
      this.errorMessage = '';
      this.errorMessages = null
      switch(res.data.message){
        case 500 :
          this.isError = true;
          this.errorMessages = res.data.data;
        break;
        case 404 :
           this.isError = true;
           this.errorMessage = res.data.data.error;
           
        break;
        case 200 : 
          this.isError = false;
          this.$store.state.curentUser = res.data.data;
          localStorage.setItem('user',JSON.stringify(this.$store.state.curentUser));
          this.$router.push('/home');
        break;
      }
    }
  },
  mounted(){
   
  }
}
</script>
<style scoped>
  .dis{
    opacity: 0.5;
  }
</style>
