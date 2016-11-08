<script>
/* eslint-disable */
import Api from '../store/api';

export default {
  methods: {
    logout(){
      Api.logout().then(response => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.$router.go({path: '/admin/login' });
      });

    }
  },
  routes: {
      data({ to }){
          this.logout();
      }
  },
  ready(){
      this.logout();
  }
}
</script>