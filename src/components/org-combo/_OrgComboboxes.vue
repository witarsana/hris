<template>
   <div>

     <div class="tes">
      <OrgCombo :content="getDataCombo1"></OrgCombo>
    </div>

     <div class="tes2">
      <OrgCombo :content="combo2"></OrgCombo>
    </div>

   </div>
</template>

<script>
  import OrgCombo from '@/components/org-combo/OrgCombobox.vue'

  export default{
    components:{
      OrgCombo
    },
    props: {
      content: Object,
      combo1: Array,
      combo2: Array
    },
    methods :{
      getData(obj){
        //var arr = obj.toString();
        alert(JSON.stringify(obj));
        //alert(JSON.stringify(obj.combo1));
        //console.log('My object: ', obj);

        this.combo1 = Object.assign(obj.DataComb.combo1);
        this.combo2 = Object.assign(obj.DataComb.combo2);
        
      }
    },
    mounted() {
        this.getData(this.content);
        
    }
  }
</script>