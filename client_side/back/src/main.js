/* eslint-disable */
import Vue from 'vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(VueResource)

import App from './App'
import Login from './components/Login';
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
  '/': {
    component: App,
    subRoutes: {
      '/dashboard': {
        name: 'dashboard',
        component: Dashboard
      },
    }
  },
  '/post': {
    name: 'post',
    component: App,
    subRoutes: {
      '/list': {
        component: PostList
      },
      '/create': {
        component: PostCreate
      },
      '/edit/:id': {
        name: 'editPost',
        component: PostCreate,
      }
    }
  },
  '/page': {
    name: 'page',
    component: App,
    subRoutes: {
      '/list': {
        component: PageList
      },
      '/create': {
        component: PageCreate
      },
      '/edit/:id': {
        name: 'editPage',
        component: PageCreate
      }
    }
  },
  '/user': {
    name: 'user',
    component: App,
    subRoutes: {
      '/list': {
        component: UserList
      },
    }
  },
  '/cate': {
    name: 'cate',
    component: App,
    subRoutes: {
      '/list': {
        component: CateList
      },
      '/create': {
        component: CateCreate
      },
      '/edit/:id': {
        name: 'editCate',
        component: CateCreate
      }
    }
  },
  '/tag': {
    name: 'tag',
    component: App,
    subRoutes: {
      '/list': {
        component: TagList
      },
      '/create': {
        component: TagCreate
      },
      '/edit/:id': {
        name: 'editTag',
        component: TagCreate
      }
    }
  },
  '/option': {
    name: 'option',
    component: App,
    subRoutes: {
      '/general': {
        component: OptionGeneral
      },
      '/comment': {
        component: OptionComment
      },
      '/analytic': {
        component: OptionAnalytic
      },
    }
  },

})

router.beforeEach(function () {
  // window.scrollTo(0, 0)
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
