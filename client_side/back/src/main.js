/* eslint-disable */
import Vue from 'vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.interceptors.push((request, next)  => {

    const token = localStorage.getItem('token')

    if ( request.method == 'get' && request.url.indexOf('/proxyPrefix/user') == -1 ){
      next();
    }

    if (token !== null && token !== 'undefined') {
      request.headers.set('authorization', token);
    }

    console.log(request);

    next();

});

import App from './App'
import Login from './components/Login';
import Logout from './components/Logout';
import Dashboard from './components/Dashboard';
import Tip from './components/Tip'
import Sidebar from './components/Sidebar'
import PostList from './components/PostList';
import PostCreate from './components/PostCreate';
import PageList from './components/PageList';
import PageCreate from './components/PageCreate';
import TagList from './components/TagList';
import CateList from './components/CateList';
import TagCreate from './components/TagCreate';
import CateCreate from './components/CateCreate';
import UserList from './components/UserList';
import OptionGeneral from './components/OptionGeneral';
import OptionComment from './components/OptionComment';
import OptionAnalytic from './components/OptionAnalytic';

Vue.component('sidebar', Sidebar);

let router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  transitionOnLoad: true,
})

router.redirect({
  '/': '/dashboard',
  '/post': '/post/list',
  '/page': '/page/list',
  '/tag': '/tag/list',
  '/cate': '/cate/list',
  '/user': '/user/list',
  '/option': '/option/general'
})

router.map({
  '/admin/login': {
    component: Login,
    auth: false,
  },
  '/admin/logout': {
    component: Logout,
    auth: false,
  },
  '/': {
    component: App,
    auth: true,
    subRoutes: {
      '/dashboard': {
        name: 'dashboard',
        component: Dashboard,
        auth: true,
      },
    }
  },
  '/post': {
    name: 'post',
    component: App,
    auth: true,
    subRoutes: {
      '/list': {
        component: PostList,
        auth: true,
      },
      '/create': {
        component: PostCreate,
        auth: true,
      },
      '/edit/:id': {
        name: 'editPost',
        component: PostCreate,
        auth: true,
      }
    }
  },
  '/page': {
    name: 'page',
    component: App,
    auth: true,
    subRoutes: {
      '/list': {
        component: PageList,
        auth: true,
      },
      '/create': {
        component: PageCreate,
        auth: true,
      },
      '/edit/:id': {
        name: 'editPage',
        component: PageCreate,
        auth: true,
      }
    }
  },
  '/user': {
    name: 'user',
    component: App,
    auth: true,
    subRoutes: {
      '/list': {
        component: UserList,
        auth: true,
      },
    }
  },
  '/cate': {
    name: 'cate',
    component: App,
    auth: true,
    subRoutes: {
      '/list': {
        component: CateList,
        auth: true,
      },
      '/create': {
        component: CateCreate,
        auth: true,
      },
      '/edit/:id': {
        name: 'editCate',
        component: CateCreate,
        auth: true,
      }
    }
  },
  '/tag': {
    name: 'tag',
    component: App,
    auth: true,
    subRoutes: {
      '/list': {
        component: TagList,
        auth: true,
      },
      '/create': {
        component: TagCreate,
        auth: true,
      },
      '/edit/:id': {
        name: 'editTag',
        component: TagCreate,
        auth: true,
      }
    }
  },
  '/option': {
    name: 'option',
    component: App,
    auth: true,
    subRoutes: {
      '/general': {
        component: OptionGeneral,
        auth: true,
      },
      '/comment': {
        component: OptionComment,
        auth: true,
      },
      '/analytic': {
        component: OptionAnalytic,
        auth: true,
      },
    }
  },

})

router.beforeEach(function (transition) {
  let authenticated = true;
  let token = localStorage.getItem('token');
  if (!token){
    authenticated = false;
  }
  if (transition.to.path != '/admin/login' && transition.to.auth && !authenticated) {
    transition.redirect('/admin/login')
  } else {
    transition.next()
  }
})

router.afterEach(function (transition) {
  if (transition.to.router._children[0] && typeof transition.to.router._children[0].currentRoute !='undefined'){
    
    let arr = transition.to.path.split('/').filter(value=>value!='').filter((value,index)=>index<2).map(value=>{
      if(value=='edit')
        value='create';
      return value;
    });

    transition.to.router._children[0].currentRoute = '/'+arr.join('/');
  }
})

router.redirect({
  '*': '/dashboard'
})

router.start(Vue.extend({
  data(){
    return {
      currentRoute: '/', 
    }
  }
}), 'body')
