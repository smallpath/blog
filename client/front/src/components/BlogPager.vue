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
    watch: {
    '$route': 'fetchData'
    },
    methods: {
        fetchData: function() {

            let query = this.$route.query;
            let page = (typeof query.page !== 'undefined') ? parseInt(query.page) : 1; 
            if (page <0 ){
                page = 1;
            }

            store.fetchBlogByPage(this, { type: 0 } , page -1 ).then(items=>{
                console.log(items);
                this.items=items;
            });

            this.page = page; 
        }
    },
    mounted () {
        store.fetchBlogCount(this, { type: 0 }).then(totalPage=>this.totalPage=totalPage);
    }

}
</script>
