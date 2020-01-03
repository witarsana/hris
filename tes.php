
<div id="app">
    <label for="country" class="control-label">Country</label>
    


    <select v-model="selectedCountry" @change="onChangeCountry" name="country" id="country" class="form-control" tabindex="11">
        <option selected disabled value="">Please select one</option>
        @foreach($countries as $country)
            <option value="{{ $country->id }}">{{ $country->name }}</option>
        @endforeach
    </select>
    


    <label for="city" class="control-label">City</label>
   
    <select v-model="cities" name="city" id="city" class="form-control" tabindex="12">
        <option v-bind:value="city.id">@{{ city.name }}</option>
    </select>



  <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.org_level_code!=undefined}" v-model="form.org_level_code" class="form-control" >

  <option v-bind:value="form.org_level_code">@{{ form.org_level_name }}</option>
                            <!-- <option v-for="(ms,key) in mandatorys" :key= "key" :value="ms">{{ms}}</option> -->
                                <option value="1">Company</option>
                                <option value="2">Divisi</option>
                                <option value="3">Department</option>
                                <option value="4">Workgroup</option>
                                <option value="5">Section</option>
                                <option value="6">Position</option>
                                <option value="7">Unit Kerja</option>
                                <option value="8">Shift</option>
                            </select>


                              <select :class="{ 'is-invalid' : errorMessages!=null && errorMessages.org_level_code!=undefined}" v-model="form.org_level_code" class="form-control" >

                            <option v-bind:value="form.org_level_code.org_level_code">@{{ form.org_level_code.org_level_name }}</option>
                                                     
                            </select>



</div>


<script type="text/javascript">
    new Vue({
      el: '#app',
      data: {
        selectedCountry: '',
        cities: []
      },
      methods: {
          onChangeCountry: function (event) {
            axios.get('http://localhost:8000/api/cities/country/' + this.selectedCountry)
            .then(function (
                this.cities = response.data
            }).catch(function(error) {
                console.log('an error occured ' + error);
            });

          getDataComboOrganizationLevel(){
              axios.get(''+url+'organizationlevel/filter',this.form,{
              headers : this.headerAccess
              }).then((res)=>{
                  this.isLoading = false;
                  this.form.org_level_code = response.data;
              }).catch((err)=>{
                  this.isLoading = false;
                  console.log(err);
              })
          }




          }
        }
    });
</script>