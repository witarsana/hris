<template>
  <CRow>
    <CCol col="9" xl="9">
      <transition name="slide">
        <CCard>
            <CCardHeader>
              <strong>Organization Data</strong>            
            </CCardHeader>
            <CCardBody>

             <OrgComboboxes 
              :content="DataCombos" 
              :counter="getDataCounter">
             </OrgComboboxes>
            
            </CCardBody>
          </CCard>
      </transition>
    </CCol>
  </CRow>
</template>

<script>
  import OrgComboboxes from '@/components/org-combo/OrgComboboxes.vue'
 

  export default{
    components:{
      OrgComboboxes
    },
    data:function(){
      return {       
        DataCombos : {        
          ComboCount:3,
          ComboLabelValue:["TipeData","Mobil","Toko"],
          ComboLabelCaption:["Tipe Data","Mobil","Toko"],
          ComboName :["TipeData","Mobil","Toko"],
          ComboRelation : [
            {relation:["TipeData","Mobil"]},
            {relation:["Mobil","Toko"]}
          ],
          ComboSelected :[
            {selectdata:["TipeData","2"]},
            {selectdata:["Mobil","2"]},
            {selectdata:["Toko","1"]},
          ],
          DataComb: [
            {combo:[{value : "",caption : ""},{value : "1",caption : "Data1"}, {value : "2",caption : "Data2"}, {value : "3",caption : "Data3"}, {value : "4",caption : "Data4"}]},
            {combo:[{value : "",caption : ""},{value : "1",caption : "Toyota"},{value : "2",caption : "Honda"}, {value : "3",caption : "BMW"},{value : "4",caption : "Mercedes"}]},
            {combo:[{value : "",caption : ""},{value : "1",caption : "Bukalapak"},{value : "2",caption : "TokoPedia"}, {value : "3",caption : "Shoppee"},{value : "4",caption : "Lazada"}]}
          ],
          DataCombRelation :[
            {combo:[
                {value : "1",subcombo : [{value : "1",caption : "Toyota"},{value : "2",caption : "Honda"}]},
                {value : "2",subcombo : [{value : "3",caption : "BMW"},{value : "4",caption : "Mercedes"}]}, 
                {value : "3",subcombo : [{value : "1",caption : "Toyota"},{value : "3",caption : "BMW"}]},
                {value : "4",subcombo : [{value : "2",caption : "Honda"},{value : "4",caption : "Mercedes"}]}
            ]},
            {combo:[
                {value : "a",subcombo : [{value : "1",caption : "Bukalapak"},{value : "2",caption : "TokoPedia"}]},
                {value : "b",subcombo : [{value : "3",caption : "Shoppee"},{value : "4",caption : "Lazada"}]}, 
                {value : "c",subcombo : [{value : "1",caption : "Bukalapak"},{value : "3",caption : "Shoppee"}]},
                {value : "d",subcombo : [{value : "2",caption : "TokoPedia"},{value : "4",caption : "Lazada"}]}
            ]}
          ]
         }

      }
    },
    computed : {
      getDataCounter(){
        return  parseInt(Object.assign(this.DataCombos.ComboCount));
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
