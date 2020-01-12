<template>
		 <div class="row">
            <div class="col-md-12">
                <label for="getDataComboLabelvalue">{{getDataComboLabelCaption}}<font-awesome-icon :style="{ color: 'darkorange' }" v-c-tooltip.hover.click="'Required'" icon="info-circle"/></label>
			
					<select v-model="form.selected" v-bind:name="getDataComboName" :id="getDataComboName" @change="onChange($event)" class="form-control">
						 <option v-for="row in getDataContent" v-bind:value="row.value">{{row.caption }}</option>
					</select>			

					<!-- <select   v-model="form.gender" class="form-control">
                            <option v-for="gen in genders" :key="gen.key" :value="gen.key">{{gen.caption}}</option>
                     </select>-->
				<!-- <div  class="invalid-feedback-local" v-if="errorMessages!=null && errorMessages.salary_tax_type!=undefined">
				                        {{errorMessages.salary_tax_type[0]}}
				       			 </div> -->
            </div>
        </div>		
</template>
<script>
export default {
	props: {
		content: Object,
		counter : Number,
		content_option : Object,
		ComboSelected_arr : Array,
		ComboRelation : Array,
		CurrentComboData : Array
	},
	data:function(){
		return {
			form:{
				selected : ''
			}
		}
	},
	computed :{
		getDataContent(){
			 return  Object.assign(this.content.DataComb[this.counter].combo);
		},
		getDataComboName(){
			return  Object.assign(this.content.ComboName[this.counter]);
		},
		getDataComboId(){
			return 'select-' + this.counter;
		},
		getDataComboLabelvalue(){
			return Object.assign(this.content.ComboLabelValue[this.counter]);
		},
		getDataComboLabelCaption(){
			return Object.assign(this.content.ComboLabelCaption[this.counter]);
		}		
	},
	methods :{
		getDataComboSelectedDefault(){
			this.ComboSelected_arr = Object.assign(this.content.ComboSelected);
			this.ComboRelation_arr = Object.assign(this.content.ComboRelation);

			//cek jika ada data yg selected maka diset selected
			if(this.ComboSelected_arr.length > 0){
				this.form.selected = this.ComboSelected_arr[this.counter].selectdata[1];
			}
		},
		checkValueExistInComboRelation_arr(arr,value){
			for (var i = 0; i < arr.length; i++) { //console.log(arr[i].relation[0]);
		        if(arr[i].relation[0].indexOf(value) !== -1){
		            return true;
		        }
		    }
		    return false;
		},
		override_option_select(id,data){
			var VarOption;			
			//[{"value":"1","caption":"Toyota"},{"value":"3","caption":"BMW"}]
			if(data.length > 0 ){
				for(var i = 0; i< data.length;i++){
					VarOption = VarOption + "<option value='"+data[i].value+"'>"+data[i].caption+"</option>";
				}
				document.getElementById(id).innerHTML = VarOption;
			}			
		},
		onChange(event){
			if(this.ComboRelation_arr.length > 0){ //jika ada relasi antar combobox
				var ValueExistStat = this.checkValueExistInComboRelation_arr(this.ComboRelation_arr,event.srcElement.name);
				if(ValueExistStat){					
					this.NextComboRelation = this.content.ComboRelation[parseInt(this.counter)].relation[1];
			        this.NextComboContain = this.content.DataCombRelation[parseInt(this.counter)].combo[parseInt(event.srcElement.selectedIndex)].subcombo;	
					this.override_option_select(this.NextComboRelation,this.NextComboContain);			    	
				}				
			}			
		}
	},
	mounted(){
			this.getDataComboSelectedDefault();	
	}
}
</script>
