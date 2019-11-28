<template>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
        <CCard>
          <CCardHeader>
            BPJS Rates 
            
          </CCardHeader>
          <CCardBody>
            <div class="mb-5">
              <button @click="newAct()" class='btn btn-pill btn-primary float-right'>
                <font-awesome-icon icon="plus-square"/> New Data
              </button>
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
            />
            </div>
          </CCardBody>
        </CCard>
      </transition>
    </CCol>
  </CRow>
</template>

<script>
import GridAjax from '../../components/grid/GridAjax.vue'
import axios from 'axios'
const url = process.env.VUE_APP_API_SOURCE;
export default {
  name: 'BpjsRates',
  components : {
    GridAjax
  },
  data: () => {
    return {
      urlData : url + 'bpjsrate/filter',     
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
          {'column' : 'jhtp', 'name' : 'JHTP'},
          {'column' : 'jhtk', 'name' : 'JHTK' },
          {'column' : 'jk', 'name' : 'JK' },
          {'column' : 'jkk', 'name' : 'JKK' },  
      ];
    }
  },
  methods :{
    getBadge(data){
      return "<span class='badge badge-success'>"+data+"</span>";
    }, 
    editAct(data){
      alert(JSON.stringify(data));      
    },
    deleteAct(data){
      alert(JSON.stringify(data)); 
    },
    viewAct(data){
      alert(JSON.stringify(data)); 
    },
    newAct(){
      alert("new");
    }
    
  }
  
}
</script>
