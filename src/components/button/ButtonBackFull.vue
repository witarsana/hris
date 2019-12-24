<template>
    <button :style="{'width' : width}"  :class="{ 'disabled' : isEnabled == false}" @click="actions" class='btn btn-pill btn-info float-right'>
        <font-awesome-icon icon="arrow-circle-left"/> Previous
    </button>
</template>
<script>
export default {
    name : 'ButtonBackFull',
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