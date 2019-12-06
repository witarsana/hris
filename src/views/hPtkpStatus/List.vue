<template>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
        <CCard>
          <CCardHeader>
            PTKP Status           
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
                <label>Status <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                
                <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.status!=undefined}" v-model="form.status" class="form-control" >
                  <option v-for="st in ptkp_status" :key= "st.code" :value="st.code">{{st.status}}</option>
                </select>
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.status!=undefined">
                    {{errorMessages.status[0]}}
                </div>
              </div>
              <div class="col-md-6">
                <label>Dependents <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required, min 1, max 3'" icon="info-circle"/></label>
                <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.dependents!=undefined}" v-model="form.dependents" class='form-control'>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.dependents!=undefined">
                    {{errorMessages.dependents[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-12">
                <label>PTKP Value <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.ptkp_value!=undefined}" v-model="form.ptkp_value" type="number" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.ptkp_value!=undefined">
                    {{errorMessages.ptkp_value[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-12">
                <label>Description 
                  <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                </label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.description!=undefined}" v-model="form.description" type="text" class="form-control">
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
            <div class="col-md-6">
            <label>status</label>
            <div class="data-view">{{renderStatus(form.status)}}</div>
            </div>
            <div class="col-md-6">
            <label>dependents</label>
            <div class="data-view">{{form.dependents}}</div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-md-12">
            <label>PTKP Values</label>
            <div class="data-view">{{form.ptkp_value}}</div>
            </div>
            
        </div>
        <div class="row mb-2">
            <div class="col-md-12">
            <label>Description</label>
            <div class="data-view">{{form.description}}</div>
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
  name: 'PtkpStatus',
  components : {
    GridAjax,
    ButtonAddFull,
    ButtonSaveFull,
    ButtonCloseFull
  },
  data: () => {
    return {
      urlData : url + 'ptkpstatus/filter',
      titleModal : "Add New Data",
      status : '',
      isLoading : false,
      isError : false,
      errorMessages : null,
      errorMessage  :'',
      statusRefresh : false,
      form : {
        id : '', 
        ptkp_code : '',
        description : '',
        status : '',
        dependents : '',
        ptkp_value : '',
        deleted_at : '',
        created_at : '',
        updated_at : ''
      },
      ptkp_status : [
        {'code' : 1,'status':'TK'},
        {'code' : 2,'status':'K'},
        {'code' : 5,'status':'HB'},
      ]
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
          {'column' : 'description', 'name' : 'Description', 'format' : this.getBadge},
          {'column' : 'status', 'name' : 'Status', 'format': this.renderStatus},
          {'column' : 'dependents', 'name' : 'Dependents' },
          {'column' : 'ptkp_value', 'name' : 'PTKP Value','format' : this.getPtkpFormat}  
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
    renderStatus(data){
      let objS = this.ptkp_status.filter(obj=>{
         return obj.code === data;
       });
       try {
         return data + " (" + objS[0].status + ")";
       } catch (error) {
         return "";
       }
    },
    getPtkpFormat(data){
      return "<div style='text-align:right;'>"+convertToMoney(data)+"</div>";
    },
    
    cleanForm(){
        this.form.id = '';
        this.form.ptkp_code = '';
        this.form.description = '';
        this.form.status = '';
        this.form.dependents = '';
        this.form.ptkp_value = '';
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
        axios.delete(''+url+'ptkpstatus/'+data.ptkp_code+'',{
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
      this.form.ptkp_value =convertToMoney(this.form.ptkp_value);
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
        axios.post(''+url+'ptkpstatus',this.form,{
          headers : this.headerAccess
        }).then((res)=>{
            this.isLoading = false;
            this.processResponse(res,this.status);
        }).catch((err)=>{
            this.isLoading = false;
            console.log(err);
        })
      }else{
        axios.post(''+url+'ptkpstatus/'+this.form.ptkp_code+'/update',this.form,{
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
    
  },
  filters : {
    renderStatus(data,ptkp_status){
      let objS = ptkp_status.filter(obj=>{
         return obj.code === data;
       });
       try {
         return objS[0].status;
       } catch (error) {
         return "";
       }
      
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
