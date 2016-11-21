<template>
</template>

<script>
/* eslint-disable */
import Api from '../store/api';

export default {
  methods: {
    logout () {
      Api.logout().then(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.$message({
          message: '登出成功',
          type: 'success',
          duration: 2000
        });
        this.$router.push({ path: '/admin/login' });
      });

    }
  },
  beforeMount () {
    this.logout();
  }
}
</script>