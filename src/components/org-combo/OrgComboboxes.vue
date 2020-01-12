<template>
   <div>

     <div  v-for="(row,index) in counter"  >
       <OrgCombo 
        :content="getDataCombo" 
        :counter="index"             
         ></OrgCombo>
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
      counter : Number,
    },
    computed :{
      getDataCombo(){
          return  Object.assign(this.content);
      }
    }
  }
</script>