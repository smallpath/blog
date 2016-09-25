<script>
/* eslint-disable */
import store from '../store/index';

export default {
  methods: {
    logout(){
      store.logout(this).then(response=>{
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