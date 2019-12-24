<template>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
        <CCard>
          <CCardHeader>
            <strong>Employee</strong>       
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
    <!--Modal for Add New Employee Operations-->
    <add-page ref="addPegawaiPage" :refreshList="refreshGrid"></add-page>
    <!--Modal for Add New Employee end here --> 
   
    
  </CRow>
</template>

<script>
//grid
import GridAjax from '../../components/grid/GridAjax.vue'

//button
import ButtonAddFull from '../../components/button/ButtonAddFull.vue'

//axios
import axios from 'axios'

//import page
import AddPage from './Add.vue'

const url = process.env.VUE_APP_API_SOURCE;
export default {
  name: 'Employee',
  components : {
    GridAjax,
    ButtonAddFull,
    AddPage
  },
  data: () => {
    return {
      urlData : url + 'pegawai/filter',
      
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
          {'column' : 'employee_id', 'name' : 'Id','format' : this.getBadge},
          {'column' : 'full_name', 'name' : 'Name'}, 
          {'column' : 'handphone_number', 'name' : 'Phone'}, 
          {'column' : 'email_1', 'name' : 'Email'}, 
          {'column' : 'get_employee_type', 'name' : 'Employee Type', 'format' : this.getEmployeeType}
      ];
    }
  },
  
  methods :{
    
    getEmployeeType(data){
        return data.employee_type_name;
    },
    getBadge(data){
      return "<span class='badge badge-success'>"+data+"</span>";
    }, 
    
    editAct(data){
     
    },
    deleteAct(data){
      
    },
    viewAct(data){
     
    },
    newAct(){
      this.$refs.addPegawaiPage.showModal();
    }, 
    refreshGrid(){
      this.$refs.gridajax.refreshTable();
    }
  },
  
  
}
</script>
<style>
.modal-backdrop{  
    opacity: 0.5 !important;
}
.dis{
    opacity: 0.8;
}


</style>
