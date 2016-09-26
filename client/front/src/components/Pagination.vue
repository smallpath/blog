<template>
    <nav class="pagination">
        <a v-if="page > 1" v-link="{ path:'/?page=' + (page-1) }" class="prev">&laquo; 上一页</a>
        <a v-if="page < totalPage" v-link="{ path:'/?page=' + (page+1) }" class="next">下一页 &raquo;</a>
        <div class=center>
            <a v-link="{name:'archive'}">博客归档</a>
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

    }
}
</script>