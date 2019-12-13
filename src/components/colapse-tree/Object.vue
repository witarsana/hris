<template>
    <div>
        <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1 org-header" role="tab">
                
                    <span class="organization" v-b-toggle="'accordion-'+dataObj.id">
                        {{dataObj.org_name}} ({{dataObj.org_code}})
                        <b-badge pill variant="dark">{{dataObj.children.length>0?''+dataObj.children.length+'':''}}</b-badge>                   
                    </span>
                    <span class="float-right">
                        <button @click="add(dataObj)" type='button' class="btn mr-2 btn-sm btn-pill btn btn-outline-info">
                            <font-awesome-icon icon="plus-square"/>
                        </button>
                        <button @click="edit(dataObj)" type='button' class="btn mr-2 btn-sm btn-pill btn btn-outline-warning">
                            <font-awesome-icon icon="edit"/>
                        </button>
                        <button @click="look(dataObj)" type='button' class="btn mr-2 btn-sm btn-pill btn btn-outline-info">
                            <font-awesome-icon icon="eye"/>
                        </button>
                        <button @click="del(dataObj)" type='button' class="btn btn-sm btn-pill btn btn-outline-danger">
                            <font-awesome-icon icon="trash-alt"/>
                        </button>
                    </span>
                
            </b-card-header>
            <template v-if="dataObj.children.length>0">
                <b-collapse :id="'accordion-'+dataObj.id" role="tabpanel">
                    <b-card-body>
                        <Card 
                            :dataCard="dataObj.children"
                            :addF="add"
                            :editF="edit"
                            :deleteF="del"
                            :viewF="look"
                        />
                    </b-card-body>
                </b-collapse>
            </template>
        </b-card> 
    </div>
</template>
<script>
export default {
    name : 'Object',
    components : {
        Card: () => import('./Card.vue')
    },
    props : {
        dataObj : Object,
        addObj : Function,
        editObj : Function,
        deleteObj : Function,
        viewObj : Function,
    },
    methods : {
        add(obj){
            this.addObj(obj);
        },
        edit(obj){
            this.editObj(obj);
        },
        del(obj){
            this.deleteObj(obj);
        },
        look(obj){
            this.viewObj(obj);
        },
    }

}
</script>
<style scoped>
    .organization{
        cursor: pointer;
        padding: 5px;
        display: inline-block; 
    }
    .org-header{
        background-color:aliceblue;
        font-weight: 400;
    }
</style>
