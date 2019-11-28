<template>
    <div class="GridAjax">
        
        <div class="row mt-2 mb-2">
            
            <div class="col-md-2">
                <template v-if="showDataPerPage">
                    <select class="form-control form-control-sm" @change="getDataByPage(1)" v-model="show">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </template>
            </div>
            <div class="col-md-6">&nbsp;</div>
            <template v-if="showSearch">
                <div class="col-md-4 justify-content-end">
                    <input @keyup="getDataByPage(1)" type="text" class="form-control form-control-sm float-right" v-model="filter">                   
                </div>
            </template>
        </div>
        <div class="table-responsive">
            <table :class="{ 'table-loading' : isLoading == true}" class="table table-responsive-sm table-striped table-bordered table-hover">
                <thead class="thead-dark">
                    <tr>
                        <th style="width:4%;" scope="col">No</th>
                        <th scope="col" v-for="title in columnTableTitle" :key="title">{{title}}</th>
                        <th style="width:16%;" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-if="listData.length>0">
                        <tr v-for="(obj,idx) in listData" :key="obj.id">
                            <td>{{idx+1}}</td>
                            <td v-for="ttl in columnTableKey" :key="ttl"><span v-html="formatDataRender(obj[ttl],ttl)"></span></td>
                            <td>
                                <span v-if="viewAct!=undefined">
                                    <button @click="viewAct(obj)" type='button' class="btn mr-2 btn-sm btn-pill btn btn-info">
                                        <font-awesome-icon icon="eye"/>
                                    </button>
                                </span>
                                <span v-if="editAct!=undefined">
                                    <button @click="editAct(obj)" type='button' class="btn mr-2 btn-sm btn-pill btn btn-warning">
                                        <font-awesome-icon icon="edit"/>
                                    </button>
                                </span>
                                <span v-if="deleteAct!=undefined">
                                    <button @click="deleteAct(obj)" type='button' class="btn btn-sm btn-pill btn btn-danger">
                                        <font-awesome-icon icon="trash-alt"/>
                                    </button>
                                </span>
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td :colspan="columnTableKey.length+2" class="text-center">No Data Available</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <div class="row">
            <div class="col-md-6">
                Showing {{from}} to {{to}} of {{total}} entries
            </div>
            <div class="col-md-6">
                <nav aria-label="Page navigation example">
                    <ul class="pagination  justify-content-end">
                        <li @click="getDataByPage(1)" class="page-item" :disabled="curentPage == 1" :class="{ 'disabled' : curentPage == 1}"><a class="page-link" >First</a></li>
                        <li @click="getDataByPage(curentPage-1)" class="page-item " :class="{ 'disabled' : curentPage == 1}">
                            <a class="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        <li 
                            v-for="i in lastPageLoop" 
                            :key="i" 
                            :class="{ 'active' : i == curentPage}"
                            class="page-item"
                            v-show="i>=curentPage"
                            @click="getDataByPage(i)"
                            >
                            <a class="page-link" href="#">{{i}}</a>
                        </li>
                        
                        <li @click="getDataByPage(curentPage+1)" class="page-item" :class="{ 'disabled' : curentPage == lastPage}">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                            <span class="sr-only">Next</span>
                        </a>
                        </li>
                        <li @click="getDataByPage(lastPage)" class="page-item" :class="{ 'disabled' : curentPage == lastPage}"><a class="page-link" href="#">Last</a></li>
                    </ul>
                </nav>
            </div>
            
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { stringify } from 'querystring';

export default {
    name : 'GridAjax',
    props : {
        url : String,
        urlParam : String,
        column : Array,
        configuration : Object,
        token : Object,
        actions : Array,
        editAct : Function,
        viewAct : Function,
        deleteAct : Function,
    },
    data() {
        return {
            listData : {},
            curentPage : 0,
            lastPage : 0,
            lastPageLoop :0,
            from : 0,
            to :0,
            total :0,
            show : 5,
            filter :'',
            showDataPerPage : true,
            showSearch : true,
            columnTable : {},
            columnTableTitle : [],
            columnTableKey : [],
            columnTableFormat : [],
            isLoading : false,
            includeAction : false
        }
    },
    methods : {
        
        formatDataRender(data,titleColumn){
            let iColumn = this.columnTableKey.indexOf(titleColumn);
            try {                
                //     
                if (this.columnTableFormat[iColumn]!= undefined){
                    return this.columnTableFormat[iColumn](data);
                }  else{
                    return data;
                }         
            } catch (error) {
                return data;
            }
            
            
        },
        actionDataRender(data){
            if (this.$props.actions!=undefined){
                return this.$props.actions(data);
                this.includeAction = true;
            }else{
                this.includeAction = false;
            }
            
        },
        sDataPerPage(config){
            if (config==false){
                this.showDataPerPage = false;
                this.show = 10;
            }
        },
        sSearch(config){
            if (config==false){
                this.showSearch = false;
                this.filter = '';
            }
        },
        setColumn(config){
            if (config!=null){
                this.columnTable = config;                
            }
            
        },
        columnTitle(){
            //alert(this.columnTable.length);
            this.columnTableTitle = [];
            this.columnTableKey = [];
            if (this.columnTable.length>0){              
                for (let i=0;i<this.columnTable.length;i++){
                    this.columnTableTitle.push(this.columnTable[i]["name"]);
                    this.columnTableKey.push(this.columnTable[i]["column"]);
                    try {
                        this.columnTableFormat.push(this.columnTable[i]["format"]);
                    } catch (error) {
                        this.columnTableFormat.push(null);
                    }
                }
            }else{
                //alert(this.listData);
                if (this.listData.length>0){
                    let curObj = this.listData[0];
                    this.columnTableTitle = Object.keys(curObj);
                    this.columnTableKey = Object.keys(curObj);
                }
            }
        },
        calculatePaging(){
            let temp = this.curentPage+2;
            if (temp > this.lastPage){
                temp = this.curentPage+1;
                if (temp>this.lastPage){
                    this.lastPageLoop = this.curentPage;
                }else{
                    this.lastPageLoop = temp;
                }
                
            }else{
                this.lastPageLoop = temp;
            }
        },
        getDataByPage(page){
            
            this.isLoading = true;
            let url = ''+this.$props.url+'?page='+page+'&count='+this.show+'&filter='+this.filter+'';
            if (this.$props.urlParam!=undefined){
                url = url + "&"+this.$props.urlParam+"";
            }
            
            axios.get(url,{
                headers : this.$props.token
            })
            .then((response)=>{      
                this.listData = response.data.data.data;
                this.curentPage = response.data.data.current_page;
                this.lastPage = response.data.data.last_page; 
                this.from = response.data.data.from;
                this.to = response.data.data.to;
                this.total = response.data.data.total;
                this.calculatePaging();   
                this.columnTitle();
                this.isLoading = false;       
            })
            .catch((response)=>{
                this.listData = {};
                this.isLoading = false;
            })
        },
        filterColumn(key){
            return this.columnTableKey.includes(key)
        }
    },
    computed : {
       
    },
    mounted (){
       
        try {
            this.setColumn(this.$props.column)
        } catch (error) {
            this.setColumn(null)
        }
        
        try {
             this.sDataPerPage(this.$props.configuration.showDataPerPage)
        } catch (error) {
            
        }
           
        try {
            this.sSearch(this.$props.configuration.showSearch)
        }catch (error) {
            
        }
        this.getDataByPage(1);
        
        
        
    }
}
</script>
<style  scoped>
    .table-loading{
        opacity: 0.5;
    }
</style>