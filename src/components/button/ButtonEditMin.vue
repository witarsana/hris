<template>
    <button @click="viewAct(obj)" type='button' class="btn mr-2 btn-sm btn-pill btn btn-warning">
        <font-awesome-icon icon="edit"/>
    </button>
</template>
<script>
export default {
    name : 'ButtonViewMin',
    props : {
        actions : Function,
    }
}
</script>