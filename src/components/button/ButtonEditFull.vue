<template>
    <button :style="{'width' : width}" :class="{ 'disabled' : isEnabled == false}" @click="actions" class='btn btn-pill btn-warning'>
        <font-awesome-icon icon="edit"/> Edit Data
    </button>
</template>
<script>
export default {
    name : 'ButtonEditFull',
    props : {
        actions : Function,
        width : String
    },
    data () {
        return {
            isEnabled : true,
        }
    },
    methods : {
        enabled(){
            this.isEnabled = true;
        },
        disabled(){
            this.isEnabled = false;
            
        }
    }
}
</script>
<style>
    .dis{
        opacity: 0.8;
    }
</style>