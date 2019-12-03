<template>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
        <CCard>
          <CCardHeader>
            Training Type          
          </CCardHeader>
          <CCardBody>
            <div class="mb-5">
              <ButtonAddFull :actions="newAct" />
            </div>
            <div>
            <GridAjax 
              :configuration= "configuration" 
              :url= "urlData" 
              :token= "headerAccess" 
              :column = "column"
              :editAct = "editAct"
              :deleteAct = "deleteAct"
              :viewAct = "viewAct"
              ref="gridajax"
            />
            </div>
            
          </CCardBody>
        </CCard>
        
      </transition>
    </CCol>
    <!--Modal for CRUD Operations-->
    <div>
      <b-modal 
        id="add-edit"      
        no-close-on-backdrop
        size = "md"
        
      >
        <template v-slot:modal-header="{ close }">    
          <h5>{{titleModal}}</h5>
        </template>
        <template v-slot:default="{ hide }">
          <form>
            <div class="row mb-2">
              <div class="col-md-12">
                <label>Code 
                  <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                </label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.training_type_code!=undefined}" v-model="form.training_type_code" type="text" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.training_type_code!=undefined">
                    {{errorMessages.training_type_code[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-12">
                <label>Training Type <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.training_type_name!=undefined}" v-model="form.training_type_name" type="text" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.training_type_name!=undefined">
                    {{errorMessages.training_type_name[0]}}
                </div>
              </div>
            </div>
            
          </form>
        </template>
        <template v-slot:modal-footer="{save, close}">
          <ButtonSaveFull ref="btnSave" :actions="saveAct" />
          <ButtonCloseFull ref="btnClose" :actions="closeAct" />
        </template>
      </b-modal>
    </div>
    <!--Modal for CRUD end here --> 
    <!--Modal for View -->
    <div>
        <b-modal 
            id="view"      
            no-close-on-backdrop
            size = "md"  
            title="View Detail" 
        >
        <div class="row mb-2">
            <div class="col-md-12">
            <label>Code</label>
            <div class="data-view">{{form.training_type_code}}</div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-md-12">
            <label>Training Type</label>
            <div class="data-view">{{form.training_type_name}}</div>
            </div>
            
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
            <label>User Input</label>
            <div class="data-view">{{form.user_input.name}}</div>
            </div>
            <div class="col-md-6">
            <label>User Edit</label>
            <div class="data-view">{{form.user_edit.name}}</div>
            </div>
        </div>
        
        <template v-slot:modal-footer="{close}">
            <ButtonCloseFull ref="btnClose" :actions="closeActView" />
        </template>
        </b-modal>
    </div>
    <!--Modal View end here -->
    
  </CRow>
</template>

<script>
//grid
import GridAjax from '../../components/grid/GridAjax.vue'

//button
import ButtonAddFull from '../../components/button/ButtonAddFull.vue'
import ButtonSaveFull from '../../components/button/ButtonSaveFull.vue'
import ButtonCloseFull from '../../components/button/ButtonCloseFull.vue'

//axios
import axios from 'axios'

const url = process.env.VUE_APP_API_SOURCE;
export default {
  name: 'TrainingType',
  components : {
    GridAjax,
    ButtonAddFull,
    ButtonSaveFull,
    ButtonCloseFull
  },
  data: () => {
    return {
      urlData : url + 'mastertrainingtype/filter',
      titleModal : "Add New Data",
      training_type_name : '',
      isLoading : false,
      isError : false,
      errorMessages : null,
      errorMessage  :'',
      training_type_nameRefresh : false,
      form : {
        id : '', 
        training_type_code : '',
        training_type_name : '',
        user_input : '',
        user_edit : '',
        deleted_at : '',
        created_at : '',
        updated_at : ''
      }  
    }
  },
  computed : {
    headerAccess(){
      return {
        'Authorization' : ''+this.$store.getters.curentCompany.token_type+' '+this.$store.getters.curentCompany.access_token+'',
        'tenant-token'  : ''+this.$store.getters.curentUser.api_token+''
      }
    },
    configuration(){
      return {
          showSearch : true,
          showDataPerPage : true,
          showPageIndicator : true
      };
      
    },
    column(){
      return [
          {'column' : 'training_type_code', 'name' : 'Code', 'format' : this.getBadge},
          {'column' : 'training_type_name', 'name' : 'Training Type'},
      ];
    }
  },
  watch : {
    isLoading(){
      if (this.isLoading == true){
        this.$refs.btnSave.disabled();
        this.$refs.btnClose.disabled();
      }else{
        this.$refs.btnSave.enabled();
        this.$refs.btnClose.enabled();
      }
    }
  },
  methods :{
    getBadge(data){
      return "<span class='badge badge-success'>"+data+"</span>";
    }, 
    cleanForm(){
        this.form.id = '';
        this.form.training_type_code = '';
        this.form.training_type_name = '';
        this.form.user_input = '';
        this.form.user_edit = '';
        this.form.deleted_at = '';
        this.form.created_at = '';
        this.form.updated_at = '';
    },
    editAct(data){
      this.titleModal = "Edit Data";
      this.training_type_name = "update";
      this.form = Object.assign({},data);
      this.errorMessage = '';
      this.errorMessages = null
      this.$bvModal.show('add-edit');    
    },
    deleteAct(data){
      if (confirm("Are you sure delete selected data?")==true){
        this.training_type_name = "delete";
        axios.delete(''+url+'mastertrainingtype/'+data.id+'',{
            headers : {
              'Authorization' : ''+this.$store.getters.curentCompany.token_type+' '+this.$store.getters.curentCompany.access_token+'',
              'tenant-token'  : ''+this.$store.getters.curentUser.api_token+''
            }
        }).then((res)=>{
            this.isLoading = false;
            this.processResponse(res,this.training_type_name);
        }).catch((err)=>{
            this.isLoading = false;
            console.log(err);
        })
      }
    },
    viewAct(data){
      this.form = Object.assign({},data);
      this.$bvModal.show('view');
    },
    newAct(){
      this.titleModal = "Add New Data";
      this.training_type_name = "save";
      this.cleanForm();
      this.errorMessage = '';
      this.errorMessages = null
      this.$bvModal.show('add-edit');
    },
    processResponse(res,training_type_name){
      this.errorMessage = '';
      this.errorMessages = null
      switch(res.data.message){
        case 500 :
          this.isError = true;
          this.errorMessages = res.data.data;         
        break;
        case 404 : 
          this.isError = true;
        break;
        case 200 : 
          this.isError = false;
          this.$refs.gridajax.refreshTable();
          this.$bvModal.hide('add-edit');

          //toasted
          let messageT = "";
         
          switch (training_type_name){
            case "save" :
              messageT = "Data saved successfully";
            break;
            case "update" :
              messageT = "Data updated successfully";
            break;
            case "delete" :
              messageT = "Data deleted successfully";
            break;
          }

          this.$toasted.show(messageT,{
            'position' : 'bottom-right',           
            'type' : 'success',
            'theme' : 'bubble',   
            'duration' : 5000,        
            'closeOnSwipe' : true
          });

        break;
      }
    },
    saveAct(){ 
      
      this.isLoading = true;
      if (this.training_type_name=="save"){
        //save
        axios.post(''+url+'mastertrainingtype',this.form,{
          headers : {
            'Authorization' : ''+this.$store.getters.curentCompany.token_type+' '+this.$store.getters.curentCompany.access_token+'',
            'tenant-token'  : ''+this.$store.getters.curentUser.api_token+''
          }
        }).then((res)=>{
            this.isLoading = false;
            this.processResponse(res,this.training_type_name);
        }).catch((err)=>{
            this.isLoading = false;
            console.log(err);
        })
      }else{
        axios.post(''+url+'mastertrainingtype/'+this.form.id+'/update',this.form,{
          headers : {
            'Authorization' : ''+this.$store.getters.curentCompany.token_type+' '+this.$store.getters.curentCompany.access_token+'',
            'tenant-token'  : ''+this.$store.getters.curentUser.api_token+''
          }
        }).then((res)=>{
            this.isLoading = false;
            this.processResponse(res,this.training_type_name);
        }).catch((err)=>{
            this.isLoading = false;
            console.log(err);
        })
      }
    },
    closeAct(){
      this.$bvModal.hide('add-edit');
    },
    closeActView(){
      this.$bvModal.hide('view');
    }
    
  }
  
}
</script>
<style>
  .modal-backdrop{  
    opacity: 0.5 !important;
  }
  .dis{
    opacity: 0.8;
  }

  .data-view{
    border-bottom: solid thin #e5e5e5;
    padding: 5px;
  }
</style>
