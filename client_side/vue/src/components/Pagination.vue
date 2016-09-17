<template>
    <nav class="pagination">
        <a v-if="hasPrev" @click="prev()" class="prev">&laquo; 上一页</a>
        <a v-if="hasNext" @click="next()" class="next">下一页 &raquo;</a>
        <div class=center>
            <a href="/archives.html">博客归档</a>
        </div>
    </nav>
</template>

<script>
/* eslint-disable */
export default {
    props: {
        hasPrev: Boolean,
        hasNext: Boolean,
        page: Number,
    },

    data () {
        return {

        }
    },

    methods: {
        jump(num){
            this.page = num;
        },
        prev(){
            this.page--;
        },
        next(){
            console.log(this.page);
            this.page++;
        },
    }
}
</script>