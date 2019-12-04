<template>
  <CRow>
    <CCol col="12" xl="12">
      <transition name="slide">
        <CCard>
          <CCardHeader>
            Salary Master Data         
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
              <div class="col-md-4">
                <label>Salary Code 
                  <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                </label>
                <input :readonly="status == 'update'" :class="{ 'is-invalid' : errorMessages!=null && errorMessages.salary_code!=undefined}" v-model="form.salary_code" type="text" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.salary_code!=undefined">
                    {{errorMessages.salary_code[0]}}
                </div>
              </div>
              <div class="col-md-8">
                <label>Salary Name 
                  <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                </label>
                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.salary_name!=undefined}" v-model="form.salary_name" type="text" class="form-control">
                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.salary_name!=undefined">
                    {{errorMessages.salary_name[0]}}
                </div>
              </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-6">
                    <label>
                        Income/Deduction
                        <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                    </label>
                    <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.income_deduction_status!=undefined}" v-model="form.income_deduction_status" class="form-control">
                        <option value="income">Income</option>
                        <option value="deduction">Deduction</option>
                    </select>
                    <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.income_deduction_status!=undefined">
                        {{errorMessages.income_deduction_status[0]}}
                    </div>
                </div>
                <div class="col-md-6">
                    <label>
                        Active Status
                        <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                    </label>
                    <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.active_status!=undefined}" v-model="form.active_status" class="form-control">
                        <option value="active">Active</option>
                        <option value="non active">Non Active</option>
                    </select>
                    <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.active_status!=undefined">
                        {{errorMessages.active_status[0]}}
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-6">
                    <label>
                        Regular/Iregular
                        <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                    </label>
                    <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.regular_iregular_status!=undefined}" v-model="form.regular_iregular_status" class="form-control">
                        <option value="regular">Regular</option>
                        <option value="iregular">Iregular</option>
                    </select>
                    <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.regular_iregular_status!=undefined">
                        {{errorMessages.regular_iregular_status[0]}}
                    </div>
                </div>
                <div class="col-md-6">
                    <label>
                        Attendance Related
                        <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                    </label>
                    <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.attendance_related_status!=undefined}" v-model="form.attendance_related_status" class="form-control">
                        <option value="related">Related</option>
                        <option value="non related">Non Related</option>
                    </select>
                    <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.attendance_related_status!=undefined">
                        {{errorMessages.attendance_related_status[0]}}
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-6">
                    <label>
                        THR Related
                        <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                    </label>
                    <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.thr_related_status!=undefined}" v-model="form.thr_related_status" class="form-control">
                        <option value="related">Related</option>
                        <option value="non related">Non Related</option>
                    </select>
                    <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.thr_related_status!=undefined">
                        {{errorMessages.thr_related_status[0]}}
                    </div>
                </div>
                <div class="col-md-6">
                    <label>
                        Overtime Related
                        <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                    </label>
                    <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.overtime_related_status!=undefined}" v-model="form.overtime_related_status" class="form-control">
                        <option value="related">Related</option>
                        <option value="non related">Non Related</option>
                    </select>
                    <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.overtime_related_status!=undefined">
                        {{errorMessages.overtime_related_status[0]}}
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-12">
                    <label>
                        Tax Related
                        <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                    </label>
                    <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.tax_related_status!=undefined}" v-model="form.tax_related_status" class="form-control">
                        <option value="related">Related</option>
                        <option value="non related">Non Related</option>
                    </select>
                    <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.tax_related_status!=undefined">
                        {{errorMessages.tax_related_status[0]}}
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-6">
                    <label>
                        BPJS Tenaga Kerja Related
                        <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                    </label>
                    <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.bpjstk_related_status!=undefined}" v-model="form.bpjstk_related_status" class="form-control">
                        <option value="related">Related</option>
                        <option value="non related">Non Related</option>
                    </select>
                    <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.bpjstk_related_status!=undefined">
                        {{errorMessages.bpjstk_related_status[0]}}
                    </div>
                </div>
                <div class="col-md-6">
                    <label>
                        BPJS Kesehatan Related
                        <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                    </label>
                    <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.bpjskes_related_status!=undefined}" v-model="form.bpjskes_related_status" class="form-control">
                        <option value="related">Related</option>
                        <option value="non related">Non Related</option>
                    </select>
                    <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.bpjskes_related_status!=undefined">
                        {{errorMessages.bpjskes_related_status[0]}}
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-12">
                    <label>
                        Description
                    </label>
                    <textarea class="form-control" v-model="form.description"></textarea>
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
            <div class="col-md-4">
            <label>Salary Code</label>
            <div class="data-view">{{form.salary_code}}</div>
            </div>
            <div class="col-md-8">
            <label>Salary Name</label>
            <div class="data-view">{{form.salary_name}}</div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
            <label>Income/Deduction</label>
            <div class="data-view">{{form.income_deduction_status | upper}}</div>
            </div>
            <div class="col-md-6">
            <label>Active Status</label>
            <div class="data-view">{{form.active_status | upper}}</div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
            <label>Regular/Iregular</label>
            <div class="data-view">{{form.regular_iregular_status | upper}}</div>
            </div>
            <div class="col-md-6">
            <label>Attendance Related</label>
            <div class="data-view">{{form.attendance_related_status | upper}}</div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
            <label>THR Related</label>
            <div class="data-view">{{form.thr_related_status | upper}}</div>
            </div>
            <div class="col-md-6">
            <label>Overtime Related</label>
            <div class="data-view">{{form.overtime_related_status | upper}}</div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-md-12">
            <label>Tax Related</label>
            <div class="data-view">{{form.tax_related_status | upper}}</div>
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-md-6">
            <label>BPJS Tenaga Kerja Related</label>
            <div class="data-view">{{form.bpjstk_related_status | upper}}</div>
            </div>
            <div class="col-md-6">
            <label>BPJS Kesehatan Related</label>
            <div class="data-view">{{form.bpjskes_related_status | upper }}</div>
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

const url = process.env.VUE_APP_API_SOURCE;
export default {
  name: 'SalaryMasterData',
  components : {
    GridAjax,
    ButtonAddFull,
    ButtonSaveFull,
    ButtonCloseFull
  },
  data: () => {
    return {
      urlData : url + 'salarymasterdata/filter',
      titleModal : "Add New Data",
      status : '',
      isLoading : false,
      isError : false,
      errorMessages : null,
      errorMessage  :'',
      statusRefresh : false, 
      form : {
        id : '', 
        salary_code : '',
        salary_name : '',
        income_deduction_status : '',
        active_status : '',
        regular_iregular_status : '',
        attendance_related_status : '',
        thr_related_status : '',
        overtime_related_status : '',
        tax_related_status : '',
        bpjstk_related_status : '',
        bpjskes_related_status : '',
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
          {'column' : 'salary_code', 'name' : 'Code', 'format' : this.getBadge},
          {'column' : 'salary_name', 'name' : 'Name'},
          {'column' : 'income_deduction_status', 'name' :'Income/Deduction', 'format' : this.uppercase},
          {'column' : 'active_status','name' : 'Active Status', 'format' : this.uppercase},
          {'column' : 'regular_iregular_status', 'name' : 'Regular/Iregular', 'format' : this.uppercase},
          {'column' : 'attendance_related_status', 'name' : 'Attendace Related', 'format' : this.uppercase}
      ];
    }
  },
  filters : {
      upper (text){
        return text.charAt(0).toUpperCase() + text.slice(1);
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
    uppercase(data){
        let result =  data.toString();
        return result.charAt(0).toUpperCase() + result.slice(1);
    },
    cleanForm(){
        this.form.id = '';
        this.form.salary_code = '';
        this.form.salary_name = '';
        this.form.income_deduction_status = '';
        this.form.active_status = '';
        this.form.regular_iregular_status = '';
        this.form.attendance_related_status = '';
        this.form.thr_related_status = '';
        this.form.overtime_related_status = '';
        this.form.tax_related_status = '';
        this.form.bpjstk_related_status = '';
        this.form.bpjskes_related_status = '';
        this.form.description = '';
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
        axios.delete(''+url+'salarymasterdata/'+data.salary_code+'',{
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
        //alert(JSON.stringify(res.data.data));
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
        axios.post(''+url+'salarymasterdata',this.form,{
          headers : this.headerAccess
        }).then((res)=>{
            this.isLoading = false;
            this.processResponse(res,this.status);
        }).catch((err)=>{
            this.isLoading = false;
            console.log(err);
        })
      }else{
        axios.post(''+url+'salarymasterdata/'+this.form.salary_code+'/update',this.form,{
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
