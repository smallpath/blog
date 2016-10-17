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

export default {
    data () {
        return {
            items: [] ,
            page: 1,
            totalPage: 1,
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.fetchData();
        })
    },
    preFetch (state) {
        //Object.keys(this).map((value)=>console.log(value))
        return store.fetchBlogCount({ type: 0 }).then(totalPage=>this.totalPage=totalPage);
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

            store.fetchBlogByPage({ type: 0 } , page -1 ).then(items=>{
                this.items=items;
                // if (oldVal.query.name && oldVal.query.name!= 'post' ){

                // }
            });

            this.page = page; 
        }
    },
    mounted () {
        store.fetchBlogCount({ type: 0 }).then(totalPage=>this.totalPage=totalPage);
    }

}
</script>