<template>
</template>

<script>
import Api from '../../store/api'

export default {
  methods: {
    logout() {
      Api.logout().then(response => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('username')
        this.$message({
          message: '登出成功',
          type: 'success',
          duration: 2000
        })
        this.$router.push({ path: '/admin/login' })
      }).catch(() => {})
    }
  },
  watch: {
    '$route': function(route) {
      if (route.name === 'logout') {
        this.logout()
      }
    }
  },
  created() {
    this.logout()
  }
}
</script>