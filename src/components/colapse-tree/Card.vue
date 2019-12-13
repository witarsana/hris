<template>
    <div>
        <template v-if="dataCard.length>0">
            <div v-for="data in dataCard" :key="data.id">
                <div :role="'tablist'+data.id"> 
                    <ObjCard 
                        :dataObj="data"
                        :addObj="addC"
                        :editObj="editC"
                        :deleteObj="deleteC"
                        :viewObj="viewC"
                    />
                </div>
            </div> 
        </template>
        <template v-else>
            <div class="row">
                <div class="col-md-12 nodata"><center>No Data Available</center></div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name : 'Card',
    components : {
        ObjCard: () => import('./Object.vue')
    },
    props : {
        dataCard : {
            type: Array,
            required: true,
            default : [],
        },
        addF : {
            type : Function,
        },
        editF : {
            type : Function,
        },
        deleteF : {
            type : Function,
        },
        viewF : {
            type : Function,
        }
    },
    methods : {
        addC(obj){
            this.addF(obj);
        },
        editC(obj){
            this.editF(obj);
        },
        deleteC(obj){
            this.deleteF(obj);
        },
        viewC(obj){
            this.viewF(obj);
        }
    }
}
</script>
<style>
    .nodata{
        background-color: #e5e5e5;
        padding: 10px;
    }
</style>