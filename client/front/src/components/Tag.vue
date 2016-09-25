<template>
    <div id='main'>
        <article class="post tags">
            <h1 class=title>{{title}}</h1>
            <div class="entry-content">
                <section> 
                    <a v-for="item in items" v-link="{ name: 'tagPager', params:{ tagName: item.name } }" data-tag="{{ item.name }}">{{item.name}}({{item.count}})</a> 
                </section>
            </div>
        </article>
        <my-footer></my-footer>
    </div>
</template>

<script>
/* eslint-disable */
import store from '../store/index'

export default {
  data () {
    return {
      title: "标签",
      items: {},
    }
  },
  ready () {
    //   let 
      store.fetchTags(this).then(items=>{
          store.fetchPostTags(this).then(postTags=>{
              postTags.forEach(value=>{
                  let tagID = value.tagID;
                  let targetIndex = 0;
                  items.forEach((value,index)=>{
                      if (value._id == tagID){
                          targetIndex = index;
                      }
                  })

                  if (typeof items[targetIndex].count === 'undefined'){
                      items[targetIndex].count = 1;
                  }else{
                      items[targetIndex].count ++ ;
                  }
              })
              items.sort((a,b)=>b.count-a.count)
              this.items = items
          });
        });
  }

}
</script>