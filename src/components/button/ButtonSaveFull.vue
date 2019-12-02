<template>
    <button @click="actions" class='btn btn-pill btn-success float-right'>
        <font-awesome-icon icon="save"/> Save Data
    </button>
</template>
<script>
export default {
    name : 'ButtonSaveFull',
    props : {
        actions : Function,
    }
}
</script>