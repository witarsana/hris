<template>
    <div>
      <b-modal 
        id="add-edit"      
        no-close-on-backdrop
        size = "lg"
        
      >
        <template v-slot:modal-header="{ close }">    
          <h5>{{titleModal}}</h5>
        </template>
        <template v-slot:default="{ hide }">
            <div class="row" id="title-step">
                <div class="col-md-12 col-xs-12"> 
                    <ul class="breadcrumb">
                        <li :class="getClass(1)"><a>1. General Information</a></li>
                        <li :class="getClass(2)"><a>2. Contact</a></li>
                        <li :class="getClass(3)"><a>3. Personal</a></li>
                        <li :class="getClass(4)"><a>4. Payroll and Tax</a></li>
                        <li :class="getClass(5)"><a>5. Salary</a></li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <template v-if="step==1">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    Employee Id
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.employee_id!=undefined}" v-model="form.employee_id" type="text" class="form-control">
                                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.employee_id!=undefined">
                                    {{errorMessages.employee_id[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="FirstName">
                                    First Name
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.first_name!=undefined}" v-model="form.first_name" type="text" class="form-control">
                                <div class="invalid-feedback" v-if="errorMessages!=null && errorMessages.first_name!=undefined">
                                    {{errorMessages.first_name[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="MiddleName">
                                    Middle Name
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.middle_name!=undefined}" v-model="form.middle_name" type="text" class="form-control">
                                <div  class="invalid-feedback" v-if="errorMessages!=null && errorMessages.middle_name!=undefined">
                                    {{errorMessages.middle_name[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="FirstName">
                                    Last Name
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.last_name!=undefined}" v-model="form.last_name" type="text" class="form-control">
                                <div  class="invalid-feedback" v-if="errorMessages!=null && errorMessages.last_name!=undefined">
                                    {{errorMessages.last_name[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="MiddleName">
                                    Alias Name
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.alias_name!=undefined}" v-model="form.alias_name" type="text" class="form-control">
                                <div  class="invalid-feedback" v-if="errorMessages!=null && errorMessages.alias_name!=undefined">
                                    {{errorMessages.alias_name[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <label for="FirstName">
                                    Join Date
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <Datepicker :input-class="{ 'is-invalid' : errorMessages!=null && errorMessages.join_date!=undefined}" :typeable=true  format="dd/MM/yyyy" :bootstrap-styling="boostrapStyle" v-model="form.join_date" name="uniquename"></Datepicker>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.join_date!=undefined">
                                    {{errorMessages.join_date[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="MiddleName">
                                    Employee Type
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <v-select :class="{ 'style-chooser' : errorMessages!=null && errorMessages.employee_type_code!=undefined}" v-model="form.employee_type_code" :reduce="employee_type_name => employee_type_name.employee_type_code"  label="employee_type_name" :options="employeeTypes"></v-select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.employee_type_code!=undefined">
                                    {{errorMessages.employee_type_code[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="FirstName">
                                    Contract Begin Date
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <Datepicker :input-class="{ 'is-invalid' : errorMessages!=null && errorMessages.contract_begin_date!=undefined}" :typeable=true  format="dd/MM/yyyy" :bootstrap-styling="boostrapStyle" v-model="form.contract_begin_date" name="uniquename"></Datepicker>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.contract_begin_date!=undefined">
                                    {{errorMessages.contract_begin_date[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="MiddleName">
                                    Contract End Date
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <Datepicker :input-class="{ 'is-invalid' : errorMessages!=null && errorMessages.contract_end_date!=undefined}" :typeable=true  format="dd/MM/yyyy" :bootstrap-styling="boostrapStyle" v-model="form.contract_end_date" name="uniquename"></Datepicker>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.contract_end_date!=undefined">
                                    {{errorMessages.contract_end_date[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="FirstName">
                                    Contract Number
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.pkwt_number!=undefined}" v-model="form.pkwt_number" type="number" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.pkwt_number!=undefined">
                                    {{errorMessages.pkwt_number[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="MiddleName">
                                    Fingerprint Id
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.fingerprint_id!=undefined}" v-model="form.fingerprint_id" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.fingerprint_id!=undefined">
                                    {{errorMessages.fingerprint_id[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="Organization">
                                    Organization
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <treeselect :class="{ 'style-chooser' : errorMessages!=null && errorMessages.organization_code!=undefined}" v-model="form.organization_code" :normalizer="normalizer" :multiple="false" :options="organizations" />
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.organization_code!=undefined">
                                    {{errorMessages.organization_code[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="FirstName">
                                    Work Shift
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <v-select :class="{ 'style-chooser' : errorMessages!=null && errorMessages.shift_code!=undefined}" v-model="form.shift_code" :reduce="shift_name => shift_name.shift_code"  label="shift_name" :options="workShifts"></v-select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.shift_code!=undefined">
                                    {{errorMessages.shift_code[0]}}
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="step==2">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    Handphone Number
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.handphone_number!=undefined}"  v-model="form.handphone_number" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.handphone_number!=undefined">
                                    {{errorMessages.handphone_number[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    Phone Number
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.phone_number_1!=undefined}" v-model="form.phone_number_1" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.phone_number_1!=undefined">
                                    {{errorMessages.phone_number_1[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    Email
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.email_1!=undefined}" v-model="form.email_1" type="email" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.email_1!=undefined">
                                    {{errorMessages.email_1[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    Country
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.country_1!=undefined}" v-model="form.country_1" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.country_1!=undefined">
                                    {{errorMessages.country_1[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    Province
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.province_1!=undefined}" v-model="form.province_1" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.province_1!=undefined">
                                    {{errorMessages.province_1[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    City
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.city_1!=undefined}" v-model="form.city_1" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.city_1!=undefined">
                                    {{errorMessages.city_1[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    District
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.district_1!=undefined}" v-model="form.district_1" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.district_1!=undefined">
                                    {{errorMessages.district_1[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    Sub distict
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.sub_district_1!=undefined}" v-model="form.sub_district_1" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.sub_district_1!=undefined">
                                    {{errorMessages.sub_district_1[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    Address
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.address_1!=undefined}" v-model="form.address_1" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.address_1!=undefined">
                                    {{errorMessages.address_1[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    Postal Code
                                </label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.postal_code_1!=undefined}" v-model="form.postal_code_1" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.postal_code_1!=undefined">
                                    {{errorMessages.postal_code_1[0]}}
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="step==3">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    Birth Place
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <input  :class="{ 'is-invalid' : errorMessages!=null && errorMessages.birth_place!=undefined}" v-model="form.birth_place" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.birth_place!=undefined">
                                    {{errorMessages.birth_place[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="EmployeeId">
                                    Birth Date
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <Datepicker  :input-class="{ 'is-invalid' : errorMessages!=null && errorMessages.birth_date!=undefined}" :typeable=true  format="dd/MM/yyyy" :bootstrap-styling="boostrapStyle" v-model="form.birth_date" name="uniquename"></Datepicker>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.birth_date!=undefined">
                                    {{errorMessages.birth_date[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="Gender">
                                    Gender
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <select  :class="{ 'is-invalid' : errorMessages!=null && errorMessages.gender!=undefined}" v-model="form.gender" class="form-control">
                                    <option v-for="gen in genders" :key="gen.key" :value="gen.key">{{gen.caption}}</option>
                                </select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.gender!=undefined">
                                    {{errorMessages.gender[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="Gender">
                                    Citizens
                                    <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/>
                                </label>
                                <select  :class="{ 'is-invalid' : errorMessages!=null && errorMessages.citizen!=undefined}" v-model="form.citizen" class="form-control">
                                    <option v-for="cz in citizens" :key="cz" :value="cz">{{cz}}</option>
                                </select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.citizen!=undefined">
                                    {{errorMessages.citizen[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="Religion">Religion</label>
                                <select  :class="{ 'is-invalid' : errorMessages!=null && errorMessages.religion!=undefined}" v-model="form.religion" class="form-control">
                                    <option v-for="reli in religions" :key="reli" :value="reli">{{reli}}</option>
                                </select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.religion!=undefined">
                                    {{errorMessages.religion[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <label for="Marital">Marital Status <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <select  :class="{ 'is-invalid' : errorMessages!=null && errorMessages.marital_status!=undefined}" v-model="form.marital_status" class="form-control">
                                    <option v-for="mari in maritalStatus" :key="mari.key" :value="mari.key">{{mari.caption}}</option>
                                </select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.marital_status!=undefined">
                                    {{errorMessages.marital_status[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="dependents">Number of Dependent <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <select  :class="{ 'is-invalid' : errorMessages!=null && errorMessages.number_of_dependents!=undefined}" v-model="form.number_of_dependents" class="form-control">
                                    <option v-for="depent in numberOfDependents" :key="depent" :value="depent">{{depent}}</option>
                                </select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.number_of_dependents!=undefined">
                                    {{errorMessages.number_of_dependents[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label for="BankName">Bank Name <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <input  :class="{ 'is-invalid' : errorMessages!=null && errorMessages.bank_name_1!=undefined}" v-model="form.bank_name_1" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.bank_name_1!=undefined">
                                    {{errorMessages.bank_name_1[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="BankAccountName">Bank Account Name <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <input  :class="{ 'is-invalid' : errorMessages!=null && errorMessages.bank_account_name_1!=undefined}" v-model="form.bank_account_name_1" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.bank_account_name_1!=undefined">
                                    {{errorMessages.bank_account_name_1[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="BankAccountNumber"> Bank Account Number <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <input  :class="{ 'is-invalid' : errorMessages!=null && errorMessages.bank_account_number_1!=undefined}" v-model="form.bank_account_number_1" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.bank_account_number_1!=undefined">
                                    {{errorMessages.bank_account_number_1[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="BankBranchName">Bank Branch Name <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <input  :class="{ 'is-invalid' : errorMessages!=null && errorMessages.bank_branch_name_1!=undefined}" v-model="form.bank_branch_name_1" type="text" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.bank_branch_name_1!=undefined">
                                    {{errorMessages.bank_branch_name_1[0]}}
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="step==4">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="StatusPTKP">Status PTKP <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <v-select :class="{ 'style-chooser' : errorMessages!=null && errorMessages.kode_status_ptkp!=undefined}" v-model="form.kode_status_ptkp" :reduce="description => description.ptkp_code"  label="description" :options="statusPtkp"></v-select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.kode_status_ptkp!=undefined">
                                    {{errorMessages.kode_status_ptkp[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="SalarytaxType">Salary tax type <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.salary_tax_type!=undefined}" v-model="form.salary_tax_type" class="form-control">
                                    <option v-for="stp in salaryTaxTypes" :key="stp.key" :value="stp.key">{{stp.caption}}</option>
                                </select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.salary_tax_type!=undefined">
                                    {{errorMessages.salary_tax_type[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="NPWPStatus">NPWP Status <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.npwp_status!=undefined}" v-model="form.npwp_status" class="form-control" >
                                    <option v-for ="status in activeStatus" :key="status.key" :value="status.key">{{status.caption}}</option>
                                </select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.npwp_status!=undefined">
                                    {{errorMessages.npwp_status[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <label for="SalaryMonthBegin">Salary Month Begin <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.salary_month_begin!=undefined}" v-model="form.salary_month_begin" class="form-control">
                                    <option v-for="mth in months" :value="mth" :key="mth">{{mth}}</option>
                                </select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.salary_month_begin!=undefined">
                                    {{errorMessages.salary_month_begin[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="SalaryMonthEnd">Salary Month End <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.salary_month_end!=undefined}" v-model="form.salary_month_end" class="form-control">
                                    <option v-for="mth in months" :value="mth" :key="mth">{{mth}}</option>
                                </select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.salary_month_end!=undefined">
                                    {{errorMessages.salary_month_end[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <label for="LastSalary">Last salary accumulation for tax</label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.saldo_pendapatan!=undefined}" v-model="form.saldo_pendapatan" type="number" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.saldo_pendapatan!=undefined">
                                    {{errorMessages.saldo_pendapatan[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="LastSalary">Last payed tax accumulation</label>
                                <input :class="{ 'is-invalid' : errorMessages!=null && errorMessages.saldo_pajak!=undefined}" v-model="form.saldo_pajak" type="number" class="form-control">
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.saldo_pajak!=undefined">
                                    {{errorMessages.saldo_pajak[0]}}
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <label for="OvertimeStatus">Overtime status <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.overtime_status!=undefined}" v-model="form.overtime_status" class="form-control" >
                                    <option v-for ="status in activeStatus" :key="status.key" :value="status.key">{{status.caption}}</option>
                                </select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.overtime_status!=undefined">
                                    {{errorMessages.overtime_status[0]}}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="BPJSStatus">BPJS Status <font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
                                <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.bpjs_status!=undefined}" v-model="form.bpjs_status" class="form-control" >
                                    <option v-for ="status in activeStatus" :key="status.key" :value="status.key">{{status.caption}}</option>
                                </select>
                                <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.bpjs_status!=undefined">
                                    {{errorMessages.bpjs_status[0]}}
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-if="step==5">
                        <div class="row mt-2" v-for="(sE,key) in $v.salaryElement.$each.$iter" :key="key">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label>Salary Type</label>
                                    <v-select :class="{ 'style-chooser' : sE.salary_code.$error}"  v-model.trim="sE.salary_code.$model" :reduce="salary_name => salary_name.salary_code"  label="salary_name" :options="salaryMaster"></v-select>
                                    <div class="invalid-feedback-local" v-if="!sE.salary_code.required">Salary Type is required.</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Amount</label>
                                    <input :class="{ 'is-invalid' : sE.amount.$error}" v-model="sE.amount.$model" type="number" class="form-control">
                                    <div class="invalid-feedback-local" v-if="!sE.amount.required">Amount is required.</div>
                                    <div class="invalid-feedback-local" v-if="!sE.amount.numeric">Amount is Numeric.</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Description</label>
                                    <input v-model="sE.description.$model" type="text" class="form-control">
                                </div>
                            </div>
                            <div class="col-md-1">
                                <div role="group" class="">
                                    <label>&nbsp; &nbsp; </label>
                                    <button @click="deleteElement(key)" type='button' class="btn btn-sm btn-pill btn btn-danger mt-4">
                                        <font-awesome-icon icon="trash-alt"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <ButtonAddFull :actions="newElement" />
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12">
                                <div style="text-align:center; font-size:small;" class="invalid-feedback-local" v-if="!$v.salaryElement.required && errorSave">Salary Element must not be empty.</div>
                                <div style="text-align:center; font-size:small;" class="invalid-feedback-local" v-else-if="$v.salaryElement.$error && errorSave">Salary Element is invalid.</div>                               
                            </div>
                        </div>

                    </template>
                </div>
            </div>
            
        </template>
        <template v-slot:modal-footer="{save, close}">
            <template v-if="step>1">
                <ButtonBackFull ref="btnBack" :actions="prevStep" />
            </template>
            <template v-if="step<5">
                <ButtonNextFull ref="btnNext" :actions="nextStep" />
            </template>
            <template v-if="step==5">
                <ButtonSaveFull ref="btnSave" :actions="saveAct" />
            </template>
          
          <ButtonCloseFull ref="btnClose" :actions="closeAct" />
        </template>
      </b-modal>
    </div>
</template>

<script>

//button
import ButtonSaveFull from '../../components/button/ButtonSaveFull.vue'
import ButtonCloseFull from '../../components/button/ButtonCloseFull.vue'
import ButtonNextFull from '../../components/button/ButtonNextFull.vue'
import ButtonBackFull from '../../components/button/ButtonBackFull.vue'
import ButtonAddFull from '../../components/button/ButtonAddFull.vue'

//axios
import axios from 'axios'

//convert helper
import {convertDateDMY} from '../../helpers/convertion'
import {convertDateYMD} from '../../helpers/convertion'

//date picker
import Datepicker from 'vuejs-datepicker';

// import the component
import Treeselect from '@riophae/vue-treeselect'

// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { stringify } from 'querystring'

//vuelidate
import { required, numeric,minLength  } from 'vuelidate/lib/validators'

const url = process.env.VUE_APP_API_SOURCE;
export default {
    name : 'Add',
    props : {
        refreshList : Function
    },
    components : {
        ButtonSaveFull,
        ButtonAddFull,
        ButtonCloseFull,
        Datepicker,
        ButtonNextFull,
        ButtonBackFull,
        Treeselect,
    },
    data() {
        return {
            titleModal : "Add New Data",
            status : '',
            errorSave : false,
            isLoading : false,
            isError : false,
            errorMessages : null,
            errorMessage  :'',
            boostrapStyle : true,
            statusRefresh : false,
            boostrapStyle : true,
            step : 1,
            form : {
                employee_id : '', 
                first_name : '',
                middle_name : '',
                last_name : '',
                alias_name : '',
                kode_status_ptkp : '',
                // kode_tarif_jamsostek : '',
                join_date : '',
                // resign_date : '',
                contract_begin_date : '',
                contract_end_date : '',
                employee_active_status :'',
                handphone_number :'',
                pkwt_number : '',
                email_1 : '',
                // email_2 : '',
                bank_account_number_1 : '',
                bank_name_1 : '',
                bank_account_name_1 : '',
                bank_branch_name_1 : '',
                // bank_account_number_2 :'',
                // bank_name_2 : '',
                // bank_account_name_2 : '',
                // bank_branch_name_2 : '',
                birth_place : '',
                birth_date : '',
                gender : '',
                citizen : '',
                religion : '',
                marital_status : '',
                number_of_dependents : '',
                salary_tax_type : '',
                ptkp_status : '',
                saldo_pendapatan : '',
                saldo_pajak : '',
                salary_month_begin : '',
                salary_month_end : '',
                overtime_status : '',
                shift_code : '',
                // npwp_number : '',
                // npwp_activation_date : '',
                // npwp_status : '',
                // bpjs_number : '',
                // bpjs_activation_date :'',
                bpjs_status : '',
                // pension_number : '',
                // pension_active_date : '',
                // pension_status : '',
                address_1 : '',
                sub_district_1 : '',
                district_1 : '',
                city_1 : '',
                province_1 : '',
                country_1 : '',
                phone_number_1 : '',
                postal_code_1 : '',
                // address_2 : '',
                // sub_district_2 : '',
                // district_2 : '',
                // city_2 : '',
                // province_2 : '',
                // country_2 : '',
                // phone_number_2 : '',
                // postal_code_2 : '',
                // ktp_number : '',
                // ktp_validity_period : '',
                // sim_a_number : '',
                // sim_a_validity_period :'',
                // sim_c_number : '',
                // sim_c_validity_period : '',
                // father_name : '',
                // mother_name : '',
                // blood_type : '',
                // eployee_photo_file : '',
                // leave_status : '',
                // remaining_day_off_1 : '',
                // remaining_day_off_2 : '',
                // new_employee_id : '',
                // resign_reason : '',
                fingerprint_id : '',
                // first_employee_id : '',
                //contract_counter : '',
                employee_type_code : '',
                organization_code : '',
                
            },
            employeeTypes :[],
            workShifts : [],
            genders : [
                {'key' : 'Pria','caption': 'Male'},
                {'key' : 'Wanita','caption': 'Female'},
            ],
            citizens : ['WNI','WNA'],
            religions : ['ISLAM','KRISTEN','KATHOLIK','HINDU','BUDHA','KONG HU CU'],
            maritalStatus : [
                {'key' : 'Menikah','caption':'Married'},
                {'key' : 'Single','caption':'Single'},
                {'key' : 'Janda','caption':'Widow'},
                {'key' : 'Duda','caption':'Widower'},
            ],
            numberOfDependents : [0,1,2,3],
            months : [1,2,3,4,5,6,7,8,9,10,11,12],
            salaryTaxTypes : [
                {'key' : 1, 'caption' :'GROSS'},
                {'key' : 2, 'caption' :'NETT'}
            ],
            activeStatus : [
                {'key' : 1, 'caption' : 'Active'},
                {'key' : 0, 'caption' : 'NonActive'}
            ],
            organizations: [],
            statusPtkp : [],
            salaryMaster : [],
            salaryElement : [],
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
    methods : {
        formatDate(data){
            return convertDateDMY(data);
        },
        showModal(){
            this.titleModal = "Add New Employee";
            this.salaryElement = Object.assign([]);
            this.salaryElement.push(
                {
                    'salary_code' : '',
                    'amount'    : 0,
                    'description' : '',
                }
            )
            this.$v.$touch();
            this.status = "save";
            this.step = 1;
            this.cleanForm();
            this.errorMessage = '';
            this.errorMessages = null
            this.$bvModal.show('add-edit');
        },
        getClass(s){
            if (s==this.step){
                return "active";
            }else if (this.step>s){
                return "completed";
            }else{
                return "";
            }
        },
        nextStep(){
            this.errorMessage = '';
            this.errorMessages = null
            this.form.join_date = convertDateYMD(this.form.join_date);
            this.form.contract_begin_date = convertDateYMD(this.form.contract_begin_date);
            this.form.contract_end_date = convertDateYMD(this.form.contract_end_date);
            
            axios.post(''+url+'pegawai/checkvalidate',Object.assign({},this.form,{'step' : this.step}),{
                headers : this.headerAccess
            }).then((res)=>{
                if (res.data.message==500){
                    this.isError = true;
                    this.errorMessages = res.data.data.error;
                    this.form.join_date = convertDateDMY(this.form.join_date);
                    
                }else{
                    this.isError = false;
                    this.step +=1;
                }
                
                }).catch((err)=>{
                    console.log(err);
                });
        },
        prevStep(){
            this.step -= 1;
        },
        cleanForm(){
            let obj = Object.assign(this.form);
            Object.keys(obj).forEach(function(key){
                obj[key] = '';
            });
            obj.organization_code = null;
            obj.employee_active_status = "active";
            obj.saldo_pendapatan = 0;
            obj.saldo_pajak = 0;
            this.form = Object.assign(obj);
        },
        saveAct(){ 
            this.$v.$touch();
            this.isLoading = true;
            if (this.$v.$invalid) {
                this.errorSave = true;
                this.isLoading = false;
            }else{
                this.errorSave = false;
                //proses simpan
                let objectSend = Object.assign(this.form,{'salary_employee':this.salaryElement});
                objectSend.birth_date = convertDateYMD(objectSend.birth_date);
                objectSend.join_date = convertDateYMD(objectSend.join_date);
                objectSend.contract_begin_date = convertDateYMD(objectSend.contract_begin_date);
                objectSend.contract_end_date = convertDateYMD(objectSend.contract_end_date);
                console.log(objectSend);
                axios.post(''+url+'pegawai',objectSend,{
                    headers : this.headerAccess
                }).then((res)=>{
                    this.processResponse(res,this.status);
                    this.isLoading = false;
                }).catch((err)=>{
                    console.log(err);
                    this.isLoading = false;
                });
            }
        },
        closeAct(){
            this.$bvModal.hide('add-edit');
        },
        getEmployeeTypes(){
            axios.get(''+url+'employeetype',{
                headers : this.headerAccess
            }).then((resp)=>{
                this.employeeTypes = Object.assign(resp.data.data);
            }).catch((err)=>{
                console.log(err);
            })
        },
        getWorkShifts(){
            axios.get(''+url+'workshiftmasterdata',{
                headers : this.headerAccess
            }).then((resp)=>{
                this.workShifts = Object.assign(resp.data.data);
            }).catch((err)=>{
                console.log(err);
            })
        },
        getOrganization(){
            axios.get(''+url+'organizationmasterdata',{
                headers : this.headerAccess
            }).then((resp)=>{
                this.organizations = Object.assign(resp.data.data);
            }).catch((err)=>{
                console.log(err);
            })
        },
        getStatusPTKP(){
            axios.get(''+url+'ptkpstatus',{
                headers : this.headerAccess
            }).then((resp)=>{
                this.statusPtkp = Object.assign(resp.data.data);
            }).catch((err)=>{
                console.log(err);
            })
        },
        getSalaryMasterData(){
            axios.get(''+url+'salarymasterdata',{
                headers : this.headerAccess
            }).then((res)=>{
                this.salaryMaster = Object.assign(res.data.data);
            }).catch((err)=>{
                console.log(err);
            });
        },
        normalizer(obj){
            return {
                'id' : obj.org_code,
                'label' : obj.org_name
            }
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
                this.refreshList();
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
        newElement(){
            if (this.salaryElement.length==0){
                this.salaryElement.push(
                    {
                        'salary_code' : '',
                        'amount'    : 0,
                        'description' : '',
                    }
                );
                this.$v.$touch();
            }else{
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.salaryElement.push(
                        {
                            'salary_code' : '',
                            'amount'    : 0,
                            'description' : '',
                        }
                    );
                    this.$v.$touch();
                }
            }
           
        },
        deleteElement(index){
            this.salaryElement.splice(index);
        }
    },
    watch : {
        isLoading(){
            if (this.isLoading == true){
                this.$refs.btnSave.disabled();
                this.$refs.btnClose.disabled();
                this.$refs.btnBack.disabled();
                this.$refs.btnNext.disabled();
            }else{
                this.$refs.btnSave.enabled();
                this.$refs.btnClose.enabled();
                this.$refs.btnBack.enabled();
                this.$refs.btnNext.enabled();
            }
        }
    },
    mounted(){
        this.getEmployeeTypes();
        this.getWorkShifts();
        this.getOrganization();
        this.getStatusPTKP();
        this.getSalaryMasterData();
    },
    validations: {
        salaryElement : {
            required,
            minLength: minLength(1),
            $each: {
                salary_code: {
                    required
                },
                amount : {
                    required,
                    numeric
                },
                description : {}
            }
        }
    }
}
</script>
<style scoped>
    .breadcrumb {
        padding: 0px;
        background: #D4D4D4;
        list-style: none; 
        overflow: hidden;
        margin-top: 20px;
        
    }
    .breadcrumb>li+li:before {
        padding: 0;
    }
    .breadcrumb li { 
        float: left; 
        color: white;
    }
    .breadcrumb li.active a {
        background: brown;                   /* fallback color */
        background: #ffc107 ; 
        font-weight: bold;
    }
    .breadcrumb li.completed a {
        background: brown;                   /* fallback color */
        background: hsla(153, 57%, 51%, 1); 
    }
    .breadcrumb li.active a:after {
        border-left: 30px solid #ffc107 ;
    }
    .breadcrumb li.completed a:after {
        border-left: 30px solid hsla(153, 57%, 51%, 1);
    } 

    .breadcrumb li a {
        color: white;
        text-decoration: none; 
        padding: 10px 0 10px 45px;
        position: relative; 
        display: block;
        float: left;
        cursor: pointer;
    }
    .breadcrumb li a:after { 
        content: " "; 
        display: block; 
        width: 0; 
        height: 0;
        border-top: 50px solid transparent;           /* Go big on the size, and let overflow hide */
        border-bottom: 50px solid transparent;
        border-left: 30px solid hsla(0, 0%, 83%, 1);
        position: absolute;
        top: 50%;
        margin-top: -50px; 
        left: 100%;
        z-index: 2; 
    }	
    .breadcrumb li a:before { 
        content: " "; 
        display: block; 
        width: 0; 
        height: 0;
        border-top: 50px solid transparent;           /* Go big on the size, and let overflow hide */
        border-bottom: 50px solid transparent;
        border-left: 30px solid white;
        position: absolute;
        top: 50%;
        margin-top: -50px; 
        margin-left: 1px;
        left: 100%;
        z-index: 1; 
    }	
    .breadcrumb li:first-child a {
        padding-left: 15px;
    }
    .breadcrumb li a:hover { background: #ffc107  ; }
    .breadcrumb li a:hover:after { border-left-color: #ffc107   !important; }

    .invalid-feedback-local{
        display: block;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 80%;
        color: #e55353;
    }


   
    .style-chooser{
        border: thin solid #e55353;
        border-radius: 0.5ch;
    }

    
</style>