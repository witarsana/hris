<template>
    <button @click="actions" class='btn btn-pill btn-primary float-right'>
        <font-awesome-icon icon="plus-square"/> New Data
    </button>
</template>
<script>
export default {
    name : 'ButtonAddFull',
    props : {
        actions : Function,
    }
}
</script>