<template>
    <button @click="actions" class='btn btn-pill btn-primary float-right'>
        <font-awesome-icon icon="plus-square"/>
    </button>
</template>
<script>
export default {
    name : 'ButtonAddMin',
    props : {
        actions : Function,
    }
}
</script>