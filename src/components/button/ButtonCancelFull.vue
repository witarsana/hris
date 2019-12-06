<template>
    <button :style="{'width' : width}" :class="{ 'disabled' : isEnabled == false}" @click="actions" class='btn btn-pill btn-danger float-right'>
        <font-awesome-icon icon="window-close"/> Cancel
    </button>
</template>
<script>
export default {
    name : 'ButtonCancelFull',
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