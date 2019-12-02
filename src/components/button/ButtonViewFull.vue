<template>
    <button @click="viewAct(obj)" type='button' class="btn mr-2 btn-sm btn-pill btn btn-info">
        <font-awesome-icon icon="eye"/> View
    </button>
</template>
<script>
export default {
    name : 'ButtonViewFull',
    props : {
        actions : Function,
    }
}
</script>