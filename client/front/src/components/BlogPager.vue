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

function fetchItems (serverStore, { path, query, params}) {
    let fetchDataPromise = new Promise((resolve)=>{
        if (path != '/'){
            return resolve()
        }

        let page = (typeof query.page !== 'undefined') ? parseInt(query.page) : 1; 
        if (page < 0 ){
            page = 1;
        }

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
}

export default {
    data () {
        const isInitialRender = !this.$root._isMounted
        return {
            //items: isInitialRender ? this.$store.getters.items: [],
            items: this.$store.getters.items,
            page: 1,
            totalPage: 1,
        }
    },
    /*beforeRouteEnter (to, from, next) {
        next(vm => {
            const isMounted = vm.$root._isMounted;
            isMounted && fetchItems(vm.$store, {
                path: vm.$store.state.route.path,
                query: vm.$store.state.route.query
            });
        })
    },*/
    beforeMount () {
        if (this.$root._isMounted){
            fetchItems(this.$store, this.$store.state.route)
            store.fetchBlogCount({ type: 0 }).then(totalPage=>this.totalPage=totalPage);
        }
    },
    preFetch: fetchItems,
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData: function(val, oldVal) {
            
            if (val.name != 'main')
                return 

            console.log('fetchData')
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

        }
    },


}
</script>