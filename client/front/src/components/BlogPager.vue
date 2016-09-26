<template>
    <div id='main'>
        <section id="page-index">
            <blog-summary v-for="item in items" :article="item" ></blog-summary>
            <pagination :page="page" :total-page="totalPage" ></pagination>
        </section>
        <my-footer></my-footer>
    </div>
</template>

<script>
/* eslint-disable */
import store from '../store/index'

export default {
    data () {
        return {
            items: [] ,
            page: 1,
            totalPage: 1,
        }
    },
    route:{
        data({ to }){
            let query = to.query;
            let page = (typeof query.page !== 'undefined') ? parseInt(query.page) : 1; 
            if (page <0 ){
                page = 1;
            }
            return {
                page: page,
            }; 
        }
    },
    watch: {
        page (val, oldVal) {
            this.getItems();
        }
    },
    methods: {
        getItems () {
            store.fetchBlogByPage(this, { type: 0 } , this.page -1 ).then(items=>{this.items=items;/*window.scrollTo(0, 0)*/})
        }
    },
    ready () {
        store.fetchBlogByPage(this, { type: 0 } , 0).then(items=>{this.items=items;/*window.scrollTo(0, 0)*/});
        store.fetchBlogCount(this, { type: 0 }).then(totalPage=>this.totalPage=totalPage);
    }

}
</script>
