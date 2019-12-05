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
              
            </div>
            <div>
            <GridAjax 
              :configuration= "configuration" 
              :url= "urlData" 
              :token= "headerAccess" 
              :column = "column"
              :editAct = "editAct"
              
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
                <label>JHTP <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.jhtp!=undefined}" v-model="form.jhtp" type="number" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.jhtp!=undefined">
                    {{errorMessages.jhtp[0]}}
                </div>
              </div>
              <div class="col-md-6">
                <label>JHTK <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.jhtk!=undefined}" v-model="form.jhtk" type="number" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.jhtk!=undefined">
                    {{errorMessages.jhtk[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6">
                <label>JK <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.jk!=undefined}" v-model="form.jk" type="number" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.jk!=undefined">
                    {{errorMessages.jk[0]}}
                </div>
              </div>
              <div class="col-md-6">
                <label>JKK <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.jkk!=undefined}" v-model="form.jkk" type="number" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.jkk!=undefined">
                    {{errorMessages.jkk[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6">
                <label>JPK Lajang <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.jpk_lajang!=undefined}" v-model="form.jpk_lajang" type="number" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.jpk_lajang!=undefined">
                    {{errorMessages.jpk_lajang[0]}}
                </div>
              </div>
              <div class="col-md-6">
                <label>JPK Nikah <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.jpk_nikah!=undefined}" v-model="form.jpk_nikah" type="number" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.jpk_nikah!=undefined">
                    {{errorMessages.jpk_nikah[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6">
                <label>BPJS Kes. Company <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.bpjskesp!=undefined}" v-model="form.bpjskesp" type="number" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.bpjskesp!=undefined">
                    {{errorMessages.bpjskesp[0]}}
                </div>
              </div>
              <div class="col-md-6">
                <label>BPJS Kes. Employee <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.bpjskesk!=undefined}" v-model="form.bpjskesk" type="number" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.bpjskesk!=undefined">
                    {{errorMessages.bpjskesk[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6">
                <label>Pension Company <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.pension_company!=undefined}" v-model="form.pension_company" type="number" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.pension_company!=undefined">
                    {{errorMessages.pension_company[0]}}
                </div>
              </div>
              <div class="col-md-6">
                <label>Pension Employees <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.pension_employees!=undefined}" v-model="form.pension_employees" type="number" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.pension_employees!=undefined">
                    {{errorMessages.pension_employees[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6">
                <label>Max Salary Pension <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.max_salary_pension!=undefined}" v-model="form.max_salary_pension" type="text" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.max_salary_pension!=undefined">
                    {{errorMessages.max_salary_pension[0]}}
                </div>
              </div>
              <div class="col-md-6">
                <label>Max Salary Medical <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.max_salary_medical!=undefined}" v-model="form.max_salary_medical" type="text" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.max_salary_medical!=undefined">
                    {{errorMessages.max_salary_medical[0]}}
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
    <b-modal 
        id="view"      
        no-close-on-backdrop
        size = "md"  
        title="View Detail" 
    >
      
      <div class="row mb-2">
        <div class="col-md-6">
          <label>JHTP</label>
          <div class="data-view">{{form.jhtp}}</div>
        </div>
        <div class="col-md-6">
          <label>JHTK</label>
          <div class="data-view">{{form.jhtk}}</div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <label>JK</label>
          <div class="data-view">{{form.jk}}</div>
        </div>
        <div class="col-md-6">
          <label>JKK</label>
          <div class="data-view">{{form.jkk}}</div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <label>JPK Lajang</label>
          <div class="data-view">{{form.jpk_lajang}}</div>
        </div>
        <div class="col-md-6">
          <label>JPK Nikah</label>
          <div class="data-view">{{form.jpk_nikah}}</div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <label>BPJS Kes. Company</label>
          <div class="data-view">{{form.bpjskesp}}</div>
        </div>
        <div class="col-md-6">
          <label>BPJS Kes. Employee</label>
          <div class="data-view">{{form.bpjskesk}}</div>
        </div>
      </div>
                
      <div class="row mb-2">
        <div class="col-md-6">
          <label>Pension Company</label>
          <div class="data-view">{{form.pension_company}}</div>
        </div>
        <div class="col-md-6">
          <label>Pension Employees</label>
          <div class="data-view">{{form.pension_employees}}</div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-md-6">
          <label>Max Salary Pension</label>
          <div class="data-view">{{form.max_salary_pension}}</div>
        </div>
        <div class="col-md-6">
          <label>Max Salary Medical</label>
          <div class="data-view">{{form.max_salary_medical}}</div>
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
  name: 'BpjsRates',
  components : {
    GridAjax,
    ButtonAddFull,
    ButtonSaveFull,
    ButtonCloseFull
  },
  data: () => {
    return {
      urlData : url + 'bpjsrate/filter',
      titleModal : "Add New Data",
      status : '',
      isLoading : false,
      isError : false,
      errorMessages : null,
      errorMessage  :'',
      statusRefresh : false,
      form : {
        id : '', 
        code : '',
        description : '',
        jhtp : '',
        jhtk : '',
        jk : '',
        jkk : '',
        jpk_lajang : '',
        jpk_nikah : '',
        bpjskesp : '',
        bpjskesk : '',
        max_salary_pension :'',
        max_salary_medical : '',
        pension_company : '',
        pension_employees : '',
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
          {'column' : 'description', 'name' : 'Description', 'format' : this.getBadge},
          {'column' : 'jhtp', 'name' : 'JHTP'},
          {'column' : 'jhtk', 'name' : 'JHTK' },
          {'column' : 'jk', 'name' : 'JK' },
          {'column' : 'jkk', 'name' : 'JKK' },  
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
      this.form.id = "";
      this.form.code = "";
      this.form.description = "";
      this.form.jhtp = "";
      this.form.jhtk = "";
      this.form.jk = "";
      this.form.jkk = "";
      this.form.jpk_lajang = "";
      this.form.jpk_nikah = "";
      this.form.bpjskesp = '';
      this.form.bpjskesk = '';
      this.form.max_salary_pension ='';
      this.form.max_salary_medical = '';
      this.form.pension_company = '';
      this.form.pension_employees = '';
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
        axios.delete(''+url+'bpjsrate/'+data.code+'',{
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
      this.form.max_salary_pension =convertToMoney(this.form.max_salary_pension);
      this.form.max_salary_medical =convertToMoney(this.form.max_salary_medical);
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
      //alert(JSON.stringify(res));
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
        axios.post(''+url+'bpjsrate',this.form,{
          headers : this.headerAccess
        }).then((res)=>{
            this.isLoading = false;
            this.processResponse(res,this.status);
        }).catch((err)=>{
            this.isLoading = false;
            console.log(err);
        })
      }else{
        axios.post(''+url+'bpjsrate/'+this.form.code+'/update',this.form,{
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
