<template>
    <div>
         <CRow>
            <CCol col="12" xl="12">
                <transition name="slide">
                    <CCard>
                        <CCardHeader>
                            <strong>Organization Relation Master</strong>   
                        </CCardHeader>
                        <CCardBody>
                            
                            <div class="mb-5">
                                <ButtonAddFull :actions="addData" />
                            </div>
                            <div v-if="isWait" class="mt-5 text-center">
                                <b-spinner label="Spinning"></b-spinner>
                            </div>
                            <ColapseTree 
                                :dataDynamic="treeData"
                                :addFunction="addData"
                                :editFunction="editData"
                                :deleteFunction="deleteData"
                                :viewFunction="viewData"
                            />
                        </CCardBody>
                    </CCard>
                </transition>
            </CCol> 
        </CRow>
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

                 <div class="row">
                        <div class="col-md-6">
                            <label>
                                Organization Level
                                <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                            </label>

                             <select  :class="{ 'is-invalid' : errorMessages!=null && errorMessages.org_level_code!=undefined}" v-model="form.org_level_code" class="form-control" >

                             <option v-for="org_level_code_option in org_level_code_options" v-bind:value="org_level_code_option.org_level_code">
                                {{ org_level_code_option.org_level_name }}
                              </option>                        
                             
                            </select>

                         


                            <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.org_level_code!=undefined">
                                {{errorMessages.org_level_code[0]}}
                            </div>
                        </div>
                        <div class="col-md-6">
                            &nbsp; &nbsp;
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <label>
                                Organization Code
                                <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                            </label>
                            <input :readonly="status==='update'" type="text" :class="{ 'is-invalid' : errorMessages!=null && errorMessages.org_code!=undefined}" v-model="form.org_code" class="form-control">
                            <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.org_code!=undefined">
                                {{errorMessages.org_code[0]}}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label>
                                Organization Name
                                <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                            </label>
                            <input type="text" :class="{ 'is-invalid' : errorMessages!=null && errorMessages.org_name!=undefined}" v-model="form.org_name" class="form-control">
                            <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.org_name!=undefined">
                                {{errorMessages.org_name[0]}}
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mb-2">
                        <div class="col-md-6">
                            <label>
                                Dependent Status 
                                <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                            </label>
                            <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.status!=undefined}" v-model="form.dependent_status" class="form-control" >
                            <option v-for="(ds,key) in dependants" :key= "key" :value="ds">{{ds}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.dependent_status!=undefined">
                                {{errorMessages.dependent_status[0]}}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label>Dependent To </label>
                            <input readonly type="text" :class="{ 'is-invalid' : errorMessages!=null && errorMessages.dependent_to!=undefined}" v-model="form.dependent_to" class="form-control">
                            <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.dependent_to!=undefined">
                                {{errorMessages.dependent_to[0]}}
                            </div>
                        </div>
                    </div>




                    <div class="row">
                        <div class="col-md-6">
                            <label>
                                Mandatory Status 
                                <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                            </label>
                            <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.mandatory_status!=undefined}" v-model="form.mandatory_status" class="form-control" >
                            <option v-for="(ms,key) in mandatorys" :key= "key" :value="ms">{{ms}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.mandatory_status!=undefined">
                                {{errorMessages.mandatory_status[0]}}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label>
                                User Management Status 
                                <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                            </label>
                            <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.user_management_status!=undefined}" v-model="form.user_management_status" class="form-control" >
                            <option v-for="(um,key) in userManagements" :key= "key" :value="um">{{um}}</option>
                            </select>
                            <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.user_management_status!=undefined">
                                {{errorMessages.user_management_status[0]}}
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
                    <TextViewer :text="form.org_level.org_level_name" :label="'Organization Level'"/>
                </div>
                <div class="col-md-6">
                    &nbsp;&nbsp;
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-6">
                    <TextViewer :text="form.org_code" :label="'Organization Code'"/>
                </div>
                <div class="col-md-6">
                    <TextViewer :text="form.org_name" :label="'Organization Name'"/>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-md-6">
                    <TextViewer :text="form.dependent_status" :label="'Dependent Status'"/>
                </div>
                <div class="col-md-6">
                    <TextViewer :text="form.dependent_to" :label="'Dependent To'"/>
                </div>
            </div>
            
            <div class="row mb-2">
                <div class="col-md-6">
                    <TextViewer :text="form.mandatory_status" :label="'Mandatory Status'"/>
                </div>
                <div class="col-md-6">
                    <TextViewer :text="form.user_management_status" :label="'User Management Status'"/>
                </div>
            </div>
            <template v-slot:modal-footer="{close}">
                <ButtonCloseFull ref="btnClose" :actions="closeActView" />
            </template>
            </b-modal>
        </div>
        <!--Modal View end here -->
    </div>
    
</template>
<script>
//Colapse Tree
import ColapseTree from '../../components/colapse-tree/ColapseTree';

//Button
import ButtonAddFull from '../../components/button/ButtonAddFull.vue';
import ButtonSaveFull from '../../components/button/ButtonSaveFull.vue'
import ButtonCloseFull from '../../components/button/ButtonCloseFull.vue'

//textview
import TextViewer from '../../components/textview/TextViewer.vue'

//Axios
import axios from 'axios';

const url = process.env.VUE_APP_API_SOURCE;

export default {
    name : 'OrganizationMasterData',
    components : {
        ColapseTree,
        ButtonAddFull,
        ButtonSaveFull,
        ButtonCloseFull,
        TextViewer
    },
    data (){
        return {
            titleModal : "Add New Data",
            status : '',
            treeData: [],
            isWait : false,
            isLoading : false,
            errorMessages : null,
            errorMessage  :'',
            form : {
                id : '',
                org_code : '',
                org_name :'',
                dependent_to : '',
                dependent_status : '',
                org_level_code : '',
                mandatory_status : '',
                user_management_status : '',
                sorting_number : 0,
                user_input : '',
                user_edit : '',
                created_at : '',
                updated_at : '',
                deleted_at : '',
                org_level :[],
                children : [],
                user_i : {},
                user_e : {},
            },
            dependants : ['dependant','not dependant'],
            mandatorys : ['mandatory','not mandatory'],
            userManagements : ['related','not related'],
            org_level_code_options :[],
            
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
    computed : {
        headerAccess(){
            return {
                'Authorization' : ''+this.$store.getters.curentCompany.token_type+' '+this.$store.getters.curentCompany.access_token+'',
                'tenant-token'  : ''+this.$store.getters.curentUser.api_token+'',
              }
        },
    }, 
    methods : {
        cleanForm(){
            this.form.id = '';
            this.form.org_code = '';
            this.form.org_name ='';
            this.form.dependent_to = '';
            this.form.dependent_status = '';
            this.form.mandatory_status = '';
            this.form.user_management_status = '';
            this.form.sorting_number = 0;
            this.form.user_input = '';
            this.form.user_edit = '';
            this.form.created_at = '';
            this.form.updated_at = '';
            this.form.deleted_at = '';
            this.form.org_level = [];
            this.form.children = [];
            this.form.user_i = {};
            this.form.user_e ={};
        },
        getData(){
            //alert('tes');
            this.isWait = true;
            axios.get(''+url+'organizationmasterdata',{
                headers : this.headerAccess
            }).then((res)=>{
                this.isWait = false;
                this.treeData = Object.assign(res.data.data);
                // alert(alert(JSON.stringify(res.data.data)));
               
            }).catch((err)=>{
                this.isWait = false;
                console.log(err);
            });
        
        },
       
        getDataComboOrganizationLevel(CurrentLevel){
               //alert(this.status + '--' + CurrentLevel);
              //alert( this.headerAccess.Authorization+ '');
              //alert( this.$store.getters.curentUser.api_token+ '');
              //if(CurrentLevel.length == 0){ //Jika CurrentLevel kosong
               axios.get(''+url+'organizationlevel',{
                     headers : this.headerAccess
                }).then((resp)=>{
                    //alert(resp.data.data.length);
                    //alert(alert(JSON.stringify(resp.data.data[0].id)));
                    if(this.status == "update"){ //kalau status update maka yang diambil data
                        this.org_level_code_options = [];
                        this.org_level_code_options.push(resp.data.data[parseInt(CurrentLevel)-1]);
                    }
                    else{   //kalau status add data
                        if(CurrentLevel.length == 0){
                            this.org_level_code_options = resp.data.data;
                        }
                        else{
                            var i;
                            var varTemp;
                            this.org_level_code_options = [];
                            for (i = 0; i < resp.data.data.length; i++) {
                              if(parseInt(resp.data.data[i].id) > parseInt(CurrentLevel)){
                                 this.org_level_code_options.push(resp.data.data[i]);
                                 break;
                              }
                            }
                        }       
                    }
                                
                }).catch((err)=>{
                    console.log(err);
                })
          
        },
        addData(obj){
            //alert(obj.id+'---'+obj.org_level_code);
            var CurrentLevel;
            this.cleanForm();
            if (obj.id==undefined){
                this.form.dependent_to = '';
                this.form.dependent_status = 'not dependant';
                CurrentLevel = '';
            }else{
                this.form.dependent_to = obj.org_code;
                this.form.dependent_status = 'dependant';
                CurrentLevel = obj.org_level_code;
            }
            this.titleModal = "Add New Data";
            this.status = "save";
            this.errorMessage = '';
            this.errorMessages = null
            this.$bvModal.show('add-edit');
            this.getDataComboOrganizationLevel(CurrentLevel);
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
                    this.getData();
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
                axios.post(''+url+'organizationmasterdata',this.form,{
                headers : this.headerAccess
                }).then((res)=>{
                    this.isLoading = false;
                    this.processResponse(res,this.status);
                }).catch((err)=>{
                    this.isLoading = false;
                    console.log(err);
                })
            }else{
                axios.post(''+url+'organizationmasterdata/'+this.form.org_code+'/update',this.form,{
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
        editData(obj){
            var CurrentLevel;
            this.titleModal = "Edit Data";
            this.status = "update";
            this.form = Object.assign({},obj);
            this.errorMessage = '';
            this.errorMessages = null
            this.$bvModal.show('add-edit'); 
            CurrentLevel = obj.org_level_code;
            this.getDataComboOrganizationLevel(CurrentLevel);
        },
        deleteData(obj){
            if (confirm("Are you sure delete selected data?")==true){
                this.status = "delete";
                axios.delete(''+url+'organizationmasterdata/'+obj.org_code+'',{
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
        viewData(obj){
            this.form = Object.assign({},obj);
            this.$bvModal.show('view');
        },
        closeAct(){
            this.$bvModal.hide('add-edit');
        },
        closeActView(){
            this.$bvModal.hide('view');
        }

    },
    mounted(){
        this.getData();   
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

  .data-view{
    border-bottom: solid thin #e5e5e5;
    padding: 5px;
  }
</style>