<template>
    <nav class="pagination">
        <a v-if="page > 1" @click="prev()" href="javascript:avoid(0)" class="prev">&laquo; 上一页</a>
        <a v-if="page < totalPage" @click="next()" href="javascript:avoid(0)" class="next">下一页 &raquo;</a>
        <div class=center>
            <a href="/archives.html">博客归档</a>
        </div>
    </nav>
</template>

<script>
/* eslint-disable */
export default {
    props: {
        totalPage: Number,
        page: Number,
    },

    data () {
        return {

        }
    },

    methods: {
        prev(){
            console.log(this.page);
            this.page--;
        },
        next(){
            console.log(this.page);
            this.page++;
        },
    }
}
</script>