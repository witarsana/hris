<template>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
        <CCard>
          <CCardHeader>
            Workshift data           
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
                <label>Shift Code <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                
               <input :readonly="status==='update'" :class="{ 'is-invalid' : errorMessages!=null && errorMessages.shift_code!=undefined}" v-model="form.shift_code" type="text" class="form-control">

                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.shift_code!=undefined">
                    {{errorMessages.shift_code[0]}}
                </div>
              </div>         
              <div class="col-md-6">
                <label>Shift Name <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.shift_name!=undefined}" v-model="form.shift_name" type="text" class="form-control">

                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.shift_name!=undefined">
                    {{errorMessages.shift_name[0]}}
                </div>
              </div>
            </div>






            <div class="row mb-2">
              <div class="col-md-6">
                <label>Begin time (ex:07:00) <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                
               <input  :class="{ 'is-invalid' : errorMessages!=null && errorMessages.begin_time!=undefined}" v-model="form.begin_time" type="text" class="form-control">

                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.begin_time!=undefined">
                    {{errorMessages.begin_time[0]}}
                </div>
              </div>         
              <div class="col-md-6">
                <label>End time (ex:18:00) <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.end_time!=undefined}" v-model="form.end_time" type="text" class="form-control">

                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.end_time!=undefined">
                    {{errorMessages.end_time[0]}}
                </div>
              </div>
            </div>


            <div class="row mb-2">
              <div class="col-md-12">
                <label>Description <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
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
            <label>Shift code</label>
            <div class="data-view">{{form.shift_code}}</div>
            </div>
            <div class="col-md-6">
            <label>Shift name</label>
            <div class="data-view">{{form.shift_name}}</div>
            </div>
        </div>

        <div class="row mb-2">
            <div class="col-md-6">
            <label>Begin time</label>
            <div class="data-view">{{form.begin_time}}</div>
            </div>
            <div class="col-md-6">
            <label>End time</label>
            <div class="data-view">{{form.end_time}}</div>
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

import {convertTimeShort} from '../../helpers/convertion'




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
      urlData : url + 'workshiftmasterdata/filter',
      titleModal : "Add New Data",
      status : '',
      isLoading : false,
      isError : false,
      errorMessages : null,
      errorMessage  :'',
      statusRefresh : false,
      form : {
        id : '', 
        shift_code : '', 
        shift_name : '', 
        begin_time : '', 
        end_time : '', 
        description : '', 
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
          {'column' : 'shift_code', 'name' : 'Shift Code', 'format' : this.getBadge},
          {'column' : 'shift_name', 'name' : 'Shift Name'},
          {'column' : 'begin_time', 'name' : 'Begin Time', 'format' : convertTimeShort },
          {'column' : 'end_time', 'name' : 'End Time', 'format' : convertTimeShort}, 
          {'column' : 'description', 'name' : 'Description'}
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
   /* renderStatus(data){
      let objS = this.ptkp_status.filter(obj=>{
         return obj.code === data;
       });
       try {
         return data + " (" + objS[0].status + ")";
       } 
       catch (error) {
         return "";
       }
    },
    getPtkpFormat(data){
      return "<div style='text-align:right;'>"+convertToMoney(data)+"</div>";
    },*/
    
    cleanForm(){
        this.form.id = '';
        this.form.shift_code = '';
        this.form.shift_name = '';
        this.form.begin_time = '';
        this.form.end_time = '';
        this.form.description = '';
        this.form.deleted_at = '';
        this.form.created_at = '';
        this.form.updated_at = '';

    },
    editAct(data){
      this.titleModal = "Edit Data";
      this.status = "update";
      this.form = Object.assign({},data);
      this.form.begin_time = convertTimeShort(this.form.begin_time);
      this.form.end_time = convertTimeShort(this.form.end_time);
      this.errorMessage = '';
      this.errorMessages = null
      this.$bvModal.show('add-edit');    
    },
    deleteAct(data){
      if (confirm("Are you sure delete selected data?")==true){
        this.status = "delete";
        axios.delete(''+url+'workshiftmasterdata/'+data.shift_code+'',{
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
      //this.form.ptkp_value =convertToMoney(this.form.ptkp_value);
      this.form.begin_time = convertTimeShort(this.form.begin_time);
      this.form.end_time = convertTimeShort(this.form.end_time);

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
        axios.post(''+url+'workshiftmasterdata',this.form,{
          headers : this.headerAccess
        }).then((res)=>{
          //alert(JSON.stringify(res));
            this.isLoading = false;
            this.processResponse(res,this.status);
        }).catch((err)=>{
            //alert('here---');
            this.isLoading = false;
            console.log(err);
        })
      }else{
        axios.post(''+url+'workshiftmasterdata/'+this.form.shift_code+'/update',this.form,{
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
    
  }/*,
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
  }*/
  
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