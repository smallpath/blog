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
import store from '../store/api'

export default {
    data () {
        const isInitialRender = !this.$root._isMounted
        return {
            items: isInitialRender ? this.$store.getters.items: [],
            page: 1,
            totalPage: 1,
        }
    },
    /*beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.fetchData();
        })
    },*/
    preFetch (serverStore, { path, query, params}) {
        let fetchDataPromise = new Promise((resolve)=>{
            if (path != '/'){
                return resolve()
            }

            console.log(path, query, params)

            let page = (typeof query.page !== 'undefined') ? parseInt(query.page) : 1; 
            if (page < 0 ){
                page = 1;
            }

            this.data.page = page; 
            serverStore.dispatch('FETCH_ITEMS',{
                queryJSON: { type: 0 },
                page: page-1
            }).then(()=>{
                resolve(page)
            })
            /*store.fetchBlogByPage({ type: 0 } , page -1 ).then(fetchedItems=>{
                resolve(items);
            });*/
        })
        let arr = [
            //store.fetchBlogCount({ type: 0 }).then(fetchedTotalPage=>totalPage=fetchedTotalPage),
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

            this.$store.dispatch('FETCH_ITEMS',{
                queryJSON: { type: 0 },
                page: page-1
            }).then(()=>{

            })

            console.log('fetchData', page)

            //store.fetchBlogByPage({ type: 0 } , page -1 ).then(items=>{
            //    this.items=items;
            //});
        }
    },
    mounted () {
        store.fetchBlogCount({ type: 0 }).then(totalPage=>this.totalPage=totalPage);
    }

}
</script>