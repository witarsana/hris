<template>
  <CRow>
    <CCol col="9" xl="9">
      <transition name="slide">
        <CCard>
          <CCardHeader>
            <strong>BPJS Rates</strong>            
          </CCardHeader>
          <CCardBody>
            <div :class="{'dis' : isLoading==true }">
              <template v-if="status=='view'">
                <div class="row mb-2">
                  <div class="col-md-6">
                    <TextViewer :label="'JHTP'" :text="form.jhtp"/>
                  </div>
                  <div class="col-md-6">
                    <TextViewer :label="'JHTK'" :text="form.jhtk"/>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <TextViewer :label="'JK'" :text="form.jk"/>
                  </div>
                  <div class="col-md-6">
                    <TextViewer :label="'JKK'" :text="form.jkk"/>                    
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <TextViewer :label="'JPK Lajang'" :text="form.jpk_lajang"/>  
                  </div>
                  <div class="col-md-6">
                    <TextViewer :label="'JPK Nikah'" :text="form.jpk_nikah"/>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <TextViewer :label="'BPJS Kes. Company'" :text="form.bpjskesp"/>
                  </div>
                  <div class="col-md-6">
                    <TextViewer :label="'BPJS Kes. Employee'" :text="form.bpjskesk"/>
                  </div>
                </div>        
                <div class="row mb-2">
                  <div class="col-md-6">
                    <TextViewer :label="'Pension Company'" :text="form.pension_company"/>
                  </div>
                  <div class="col-md-6">
                    <TextViewer :label="'Pension Employees'" :text="form.pension_employees"/>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-6">
                    <TextViewer :label="'Max Salary Pension'" :text="formatMoney(form.max_salary_pension)"/>
                  </div>
                  <div class="col-md-6">
                    <TextViewer :label="'Max Salary Medical'" :text="formatMoney(form.max_salary_medical)"/>
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-12">
                    <TextViewer :label="'Description'" :text="form.description"/>
                  </div>
                </div>
              </template>
              <template v-if="status=='update'">
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
              </template>
            </div>
          </CCardBody>
        </CCard>
        
      </transition>
    </CCol>
    <CCol col="3" xl="3">
      <CCard>
          <CCardHeader>
            Action           
          </CCardHeader>
          <CCardBody>           
            <div v-if="status=='view'">
              <div class="row"><ButtonEditFull :width="'100%'" ref="btnEdit" :actions="editAct" /></div>
            </div>
            <div v-if="status=='update'">
              <div class='row mb-2'><ButtonSaveFull :width="'100%'" ref="btnSave" :actions="saveAct" /></div>
              <div class="row"><ButtonCancelFull :width="'100%'" ref="btnCancel" :actions="cancelAct" /></div>
              
            </div>
          </CCardBody>
        </CCard>
    </CCol>
    
  </CRow>
</template>

<script>

//button
import ButtonEditFull from '../../components/button/ButtonEditFull.vue'
import ButtonSaveFull from '../../components/button/ButtonSaveFull.vue'
import ButtonCancelFull from '../../components/button/ButtonCancelFull.vue'
//textviewer
import TextViewer from '../../components/textview/TextViewer'

//axios
import axios from 'axios'

//convert helper
import {convertToMoney} from '../../helpers/convertion'

const url = process.env.VUE_APP_API_SOURCE;
export default {
  name: 'BpjsRates',
  components : {
    TextViewer,
    ButtonEditFull,
    ButtonSaveFull,
    ButtonCancelFull,
  },
  data: () => {
    return {     
      status : 'update',
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
      },
      formPrev : {} 
    }
  },
  computed : {
    headerAccess(){
      return {
        'Authorization' : ''+this.$store.getters.curentCompany.token_type+' '+this.$store.getters.curentCompany.access_token+'',
        'tenant-token'  : ''+this.$store.getters.curentUser.api_token+''
      }
    },
    
  },
  watch : {
    isLoading(){      
      if (this.isLoading == true){
        if (status=="update"){
          this.$refs.btnSave.disabled();
          this.$refs.btnCancel.disabled();
        }
      }
      
    }
  },
  methods :{
    editAct(){
      this.status = "update";       
    },
    
    cancelAct(data){
      this.form = Object.assign({},this.formPrev);
      this.status = "view"; 
    },
    formatMoney(data){
      return convertToMoney(data);
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
          this.status = "view";
          //toasted
          let messageT = "";
         
          switch (status){           
            case "update" :
              messageT = "Data updated successfully";
            break;           
          }

          this.$toasted.show(messageT,{
            'position' : 'bottom-right',           
            'type' : 'success',
            'theme' : 'bubble',   
            'duration' : 5000,        
            'closeOnSwipe' : true
          });

          this.getData()

        break;
      }
    },
    saveAct(){ 
      if (confirm("Are you sure to save the changes?")){
        this.isLoading = true;
        this.status = "update";
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
    getData(){
      this.isLoading = true;
      this.status = "view";
      axios.get(''+url+'bpjsrate/',{
        headers : this.headerAccess
      }).then((res)=>{
        this.isLoading = false;
        this.form = Object.assign({},res.data.data[0]);
        this.formPrev = Object.assign({},res.data.data[0]);
      }).catch((err)=>{
        this.isLoading = false;
        console.log(err);
      });
    }
  },
  mounted(){
    this.getData();
  }
  
}
</script>
<style>

</style>
