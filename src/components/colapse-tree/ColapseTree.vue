<template>
    <div>
        
        <Cards 
            :dataCard="dataDynamic"
            :addF="addF"
            :editF="editF"
            :deleteF="deleteF"
            :viewF="viewF"
        />
    </div>
</template>
<script>
import Cards from './Card.vue'
export default {
    name : 'Grid',
    components : {
        Cards,
    },
    props : {
        dataDynamic : {
            type: Array,
            required: true,
            default : [],
        },
        addFunction : {
            type : Function,
            required : true
        },
        editFunction : {
            type : Function,
            required : true
        },
        deleteFunction : {
            type : Function,
            required : true
        },
        viewFunction : {
            type : Function,
            required : true
        }
    },

    methods : {
        addF(obj){
            this.addFunction(obj);
        },
        editF(obj){
            this.editFunction(obj);
        },
        viewF(obj){
            this.viewFunction(obj);
        },
        deleteF(obj){
            this.deleteFunction(obj);
        }
    }
    
    
}
</script>