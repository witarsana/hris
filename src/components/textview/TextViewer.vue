<template>
    <div>
        <label>{{label}}</label>
        <div class="data-view">{{text}}</div>
    </div>
</template>
<script>
export default {
    name : 'TextViewer',
    props : {
        text : String,
        label : String,
    }
}
</script>
<style scoped>
    .data-view{
        border-bottom: solid thin #e5e5e5;
        padding: 6px;
    }
</style>