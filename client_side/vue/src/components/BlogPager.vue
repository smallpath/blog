<template>
    <div id='main'>
        <section id="page-index">
            <blog-summary v-for="item in items" :article="item" ></blog-summary>
            <pagination :page.sync="page" :total-page="totalPage" ></pagination>
        </section>
        <my-footer></my-footer>
    </div>
</template>

<script>
/* eslint-disable */
import store from '../store/index'

export default {
    data (...args) {
        return {
            items: store.fetchBlogByPage(this,0).then(items=>{this.items=items;window.scrollTo(0, 0)}) ,
            page: 1,
            totalPage: store.fetchBlogCount(this).then(totalPage=>this.totalPage=totalPage),
        }
    },
    watch: {
        page (val, oldVal) {
            this.getItems();
        }
    },
    methods: {
        getItems () {
            store.fetchBlogByPage(this,this.page -1 ).then(items=>{this.items=items;window.scrollTo(0, 0)})
        }
    },

}
</script>
