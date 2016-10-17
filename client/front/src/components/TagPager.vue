<template>
    <div id='main'>
        <section id="page-index">
            <h1 class="intro">标签<a href="javascript:avoid(0)">{{$route.params.tagName}}</a>下的文章</h1>
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
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getItems();
        })
    },
    methods: {
        getItems () {
            let idArr = [];
            store.fetchTags().then(tags=>{
                let tagID = '';
                tags.forEach(value=>{
                    if (value.name == this.$route.params.tagName)
                        tagID = value._id;
                });
                
                store.fetchPostTags().then(postTags=>{
                    postTags = postTags.filter((value,index)=>{
                        return value.tagID == tagID;
                    });

                    postTags.forEach((value)=>{
                        store.fetchBlogByID(value.postID).then(item=>{
                            if(item._id)
                                this.items.push(item);
                        })
                    });
                });
            // store.fetchBlogByPage(this,{ type: 0 } ,this.page -1 ).then(items=>{this.items=items;/*window.scrollTo(0, 0)*/})
            });
        }
    },
    mounted () {
        this.getItems();
    }

}
</script>
