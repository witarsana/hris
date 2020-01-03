<template>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
        <CCard>
          <CCardHeader>
            Organization Level           
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
              <div class="col-md-6">
                <label>Level Code <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.org_level_code!=undefined}" v-model="form.org_level_code" type="text" class="form-control">


                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.org_level_code!=undefined">
                    {{errorMessages.org_level_code[0]}}
                </div>

              </div>

              <div class="col-md-6">

                <label>Level Name <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>

                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.org_level_name!=undefined}" v-model="form.org_level_name" type="text" class="form-control">

                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.org_level_name!=undefined">
                    {{errorMessages.org_level_name[0]}}
                </div>

              </div>

            </div>



             <div class="row mb-2">
              <div class="col-md-6">
                <label>Level Desc. <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.org_level_desc!=undefined}" v-model="form.org_level_desc" type="text" class="form-control">


                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.org_level_desc!=undefined">
                    {{errorMessages.org_level_desc[0]}}
                </div>

              </div>

              <div class="col-md-6">

                <label>Sorting Number<font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>

                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.sorting_number!=undefined}" v-model="form.sorting_number" type="number" class="form-control">

                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.sorting_number!=undefined">
                    {{errorMessages.sorting_number[0]}}
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
            <div class="col-md-6">
              <label>Level Code</label>
              <div class="data-view">{{form.org_level_code}}</div>
            </div>
            <div class="col-md-6">
              <label>Level Name</label>
              <div class="data-view">{{form.org_level_name}}</div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
              <label>Level Desc.</label>
              <div class="data-view">{{form.org_level_desc}}</div>
            </div>
            <div class="col-md-6">
              <label>Sorting Number</label>
              <div class="data-view">{{form.sorting_number}}</div>
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
import {convertToMoney} from '../../helpers/convertion'

const url = process.env.VUE_APP_API_SOURCE;
export default {
  name: 'OrganizationLevel',
  components : {
    GridAjax,
    ButtonAddFull,
    ButtonSaveFull,
    ButtonCloseFull
  },
  data: () => {
    return {
      urlData : url + 'organizationlevel/filter',
      titleModal : "Add New Data",
      status : '',
      isLoading : false,
      isError : false,
      errorMessages : null,
      errorMessage  :'',
      statusRefresh : false,
      form : {
        id : '', 
        org_level_code : '',
        org_level_name : '',
        org_level_desc : '',
        sorting_number : '',
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
          {'column' : 'org_level_code', 'name' : 'Level Code', 'format' : this.getBadge},
          {'column' : 'org_level_name', 'name' : 'Level Name'},
          {'column' : 'org_level_desc', 'name' : 'Description'},
          {'column' : 'sorting_number', 'name' : 'Sorting Number'}

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
        this.form.org_level_code = '';
        this.form.org_level_name = '';
        this.form.org_level_desc = '';
        this.form.sorting_number = '';
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
        axios.delete(''+url+'organizationlevel/'+data.id+'',{
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
      //alert('here');
      this.isLoading = true;
      if (this.status=="save"){
        //save
        axios.post(''+url+'organizationlevel',this.form,{
          headers : this.headerAccess
        }).then((res)=>{
          //alert(JSON.stringify(res));
            this.isLoading = false;
            this.processResponse(res,this.status);
        }).catch((err)=>{
            this.isLoading = false;
            console.log(err);
        })
      }else{
        axios.post(''+url+'organizationlevel/'+this.form.id+'/update',this.form,{
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
</style>
