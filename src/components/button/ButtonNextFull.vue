<template>
    <button :style="{'width' : width}"  :class="{ 'disabled' : isEnabled == false}" @click="actions" class='btn btn-pill btn-info float-right'>
        <font-awesome-icon icon="arrow-circle-right"/> Next
    </button>
</template>
<script>
export default {
    name : 'ButtonNextFull',
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