<template>
    <div id='main'>
        <section id="page-index">
            <blog-summary v-for="item in items" :article="item"></blog-summary>
            <pagination :page="page" :total-page="totalPage"></pagination>
        </section>
        <my-footer></my-footer>
    </div>
</template>

<script>
/* eslint-disable */
import store from '../store/index'

let items = [] ,
    page=  1,
    totalPage= 1;

export default {
    data () {
        return {
            items ,
            page,
            totalPage,
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.fetchData();
        })
    },
    preFetch (state) {
        let fetchDataPromise = new Promise((resolve)=>{
            let query;
            try{
              query = this.$route.query;
            }catch(err){
                query = { page: 1 };
            }
            let page = (typeof query.page !== 'undefined') ? parseInt(query.page) : 1; 
            if (page <0 ){
                page = 1;
            }
            console.log(this.data);
            this.data.page = page; 

            store.fetchBlogByPage({ type: 0 } , page -1 ).then(fetchedItems=>{
                items= fetchedItems;
                resolve(items);
            });
        })
        let arr = [
            store.fetchBlogCount({ type: 0 }).then(fetchedTotalPage=>totalPage=fetchedTotalPage),
            fetchDataPromise,
        ];
        return Promise.all(arr);
    },
    watch: {
    '$route': 'fetchData'
    },
    methods: {
        fetchData: function(val, oldVal) {
            let query = this.$route.query;
            let page = (typeof query.page !== 'undefined') ? parseInt(query.page) : 1; 
            if (page <0 ){
                page = 1;
            }

            this.page = page; 

            store.fetchBlogByPage({ type: 0 } , page -1 ).then(items=>{
                this.items=items;
            });
        }
    },
    mounted () {
        store.fetchBlogCount({ type: 0 }).then(totalPage=>this.totalPage=totalPage);
    }

}
</script>