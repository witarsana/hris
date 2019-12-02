<template>
    <button @click="actions" class='btn btn-pill btn-danger float-right'>
        <font-awesome-icon icon="window-close"/> Close
    </button>
</template>
<script>
export default {
    name : 'ButtonCloseFull',
    props : {
        actions : Function,
    }
}
</script>