<template>
    <button :class="{ 'disabled' : isEnabled == false}" @click="actions" class='btn btn-pill btn-success float-right'>
        <font-awesome-icon icon="save"/> Save Data
    </button>
</template>
<script>
export default {
    name : 'ButtonSaveFull',
    props : {
        actions : Function,
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