<script>
/* eslint-disable */
import store from '../store/index';

export default {
  methods: {
    logout(){
      store.logout(this).then(response=>{
        localStorage.removeItem('token');
        if (response.body.status == 'fail'){
          console.log('logout fails');
          this.$router.go({path: '/admin/login' });
        }else if(response.body.status == 'success'){

          this.$router.go({path: '/admin/login' });
        }

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