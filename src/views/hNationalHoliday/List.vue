<template>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
        <CCard>
          <CCardHeader>
            National Holiday         
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
                <label>Holiday 
                  <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                </label>
                <Datepicker :typeable=true  format="dd/MM/yyyy" :input-class="{ 'is-invalid' : errorMessages!=null && errorMessages.holiday!=undefined}" :bootstrap-styling="boostrapStyle" v-model="form.holiday" name="uniquename"></Datepicker>
                <div class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.holiday!=undefined">
                    {{errorMessages.holiday[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-12">
                <label>Description <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <textarea :class="{ 'is-invalid' : errorMessages!=null && errorMessages.description!=undefined}" v-model="form.description" class="form-control"></textarea>
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.description!=undefined">
                    {{errorMessages.description[0]}}
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
            <label>Holiday</label>
            <div class="data-view">{{form.holiday}}</div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-md-12">
            <label>Description</label>
            <div class="data-view">{{form.description}}</div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
            <label>User Input</label>
            <div class="data-view">{{form.user_i.name}}</div>
            </div>
            <div class="col-md-6">
            <label>User Edit</label>
            <div class="data-view">{{form.user_e.name}}</div>
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

//convert helper
import {convertDateDMY} from '../../helpers/convertion'
import {convertDateYMD} from '../../helpers/convertion'

import Datepicker from 'vuejs-datepicker';

const url = process.env.VUE_APP_API_SOURCE;
export default {
  name: 'NationalHoliday',
  components : {
    GridAjax,
    ButtonAddFull,
    ButtonSaveFull,
    ButtonCloseFull,
    Datepicker
  },
  data: () => {
    return {
      urlData : url + 'nationalholiday/filter',
      titleModal : "Add New Data",
      status : '',
      isLoading : false,
      isError : false,
      errorMessages : null,
      errorMessage  :'',
      boostrapStyle : true,
      statusRefresh : false,
      form : {
        id : '', 
        holiday : '',
        description : '',
        user_i : '',
        user_e : '',
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
          {'column' : 'holiday', 'name' : 'Holiday','format': this.formatDate},
          {'column' : 'description', 'name' : 'Description', 'format' : this.getBadge}, 
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
    formatDate(data){
        return convertDateDMY(data);
    },
    getBadge(data){
      return "<span class='badge badge-success'>"+data+"</span>";
    }, 
    
    cleanForm(){
        this.form.id = '';
        this.form.holiday = '';
        this.form.description = '';
        this.form.user_i = '';
        this.form.user_e = '';
        this.form.deleted_at = '';
        this.form.created_at = '';
        this.form.updated_at = '';
    },
    editAct(data){
      this.titleModal = "Edit Data";
      this.status = "update";
      this.form = Object.assign({},data);
      this.errorMessage = '';
      this.errorMessages = null
      this.$bvModal.show('add-edit');    
    },
    deleteAct(data){
      if (confirm("Are you sure delete selected data?")==true){
        this.status = "delete";
        axios.delete(''+url+'nationalholiday/'+data.id+'',{
            headers : this.headerAccess
        }).then((res)=>{
            this.isLoading = false;
            this.processResponse(res,this.status);
        }).catch((err)=>{
            this.isLoading = false;
            console.log(err);
        })
      }
    },
    viewAct(data){
      this.form = Object.assign({},data);
      this.form.holiday =convertDateDMY(this.form.holiday);
      this.$bvModal.show('view');
    },
    newAct(){
      this.titleModal = "Add New Data";
      this.status = "save";
      this.cleanForm();
      this.errorMessage = '';
      this.errorMessages = null
      this.$bvModal.show('add-edit');
    },
    processResponse(res,status){
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
         
          switch (status){
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
      if (this.status=="save"){
        //save
        this.form.holiday = convertDateYMD(this.form.holiday);
        axios.post(''+url+'nationalholiday',this.form,{
          headers : this.headerAccess
        }).then((res)=>{
            this.isLoading = false;
            this.processResponse(res,this.status);
        }).catch((err)=>{
            this.isLoading = false;
            console.log(err);
        })
      }else{
        this.form.holiday = convertDateYMD(this.form.holiday);
        axios.post(''+url+'nationalholiday/'+this.form.id+'/update',this.form,{
          headers : this.headerAccess
        }).then((res)=>{
            this.isLoading = false;
            this.processResponse(res,this.status);
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

  .invalid-feedback-local{
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #e55353;
  }
</style>
