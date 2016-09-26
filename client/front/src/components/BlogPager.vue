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
        data(transition){
            let query = transition.to.query;
            let page = (typeof query.page !== 'undefined') ? parseInt(query.page) : 1; 
            if (page <0 ){
                page = 1;
            }

            store.fetchBlogByPage(this, { type: 0 } , page -1 ).then(items=>{this.items=items;})

            if(transition.from.name != 'post'){
                window.scrollTo(0, 0)
            }

            return {
                page: page,
            }; 
        },
    },
    ready () {
        store.fetchBlogCount(this, { type: 0 }).then(totalPage=>this.totalPage=totalPage);
    }

}
</script>
