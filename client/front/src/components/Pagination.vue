<template>
  <nav class="pagination">
    <router-link v-if="page > 1" :to="{ query: { page: parseInt(page) - 1} }" class="prev">&laquo; 上一页</router-link>
    <router-link v-if="page < totalPage" :to="{ query: { page: parseInt(page) + 1}  }" class="next">下一页 &raquo;</router-link>
    <div class=center>
      <router-link :to="{name:'archive'}">博客归档</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    totalPage: Number,
    page: Number
  }
}
</script>