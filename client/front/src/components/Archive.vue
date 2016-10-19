<template>
    <div id='main'>
        <article class="post archive">
            <h1 class=title>{{title}}</h1>
            <div class="entry-content" v-for="(item, key, index) in items">
                <h3>{{ key }} ({{item.length}})</h3>
                <ul>
                    <li v-for="subItem in item"> 
                        <router-link :to="{name: 'post', params: { pathName:subItem.pathName  }}" :title="subItem.title">{{subItem.title}}</router-link>&nbsp;
                        <span class=date>{{ subItem.createdAt.split(' ')[0] }}</span>
                    </li>
                </ul>
            </div>
        </article>
        <my-footer></my-footer>
    </div>
</template>

<script>
/* eslint-disable */
import store from '../store/api'

export default {
  data () {
    return {
      title: "归档",
      items: {},
    }
  },
  mounted () {
      store.fetchAllBlog().then(items=>{
            
            let result = { };

            items.forEach(item=>{
                let time = item.createdAt.slice(0,7).replace("-","年")+"月";
                if (typeof result[time] == 'undefined'){
                    result[time] = [item];
                }else{
                    result[time].push(item);
                }
            });


            this.items = result
        });
  }

}
</script>