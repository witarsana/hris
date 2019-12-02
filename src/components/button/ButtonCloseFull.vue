<template>
    <button :class="{ 'disabled' : isEnabled == false}" @click="actions" class='btn btn-pill btn-danger float-right'>
        <font-awesome-icon icon="window-close"/> Close
    </button>
</template>
<script>
export default {
    name : 'ButtonCloseFull',
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