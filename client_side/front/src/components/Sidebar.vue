<template>
    <nav id=sidebar class=behavior_1>
        <div class=wrap>
            <div class=profile>
                <a href="/"> 
                    <img 
                        :src="siteInfo.site_url.value +'/' + siteInfo.logo_url.value" 
                        alt="{{siteInfo.title.value}}">
                </a> 
                <span>{{siteInfo.title.value}}</span>
            </div>
            <ul class="buttons">
                <li>
                    <a v-link="{name:'main'}" title="首页"> <i class="iconfont icon-home"></i> <span>首页</span></a>
                </li>
                <li>
                    <a v-link="{name:'archive'}" title="归档"> <i class="iconfont icon-archive"></i> <span>归档</span></a>
                </li>
                <li>
                    <a v-link="{name:'tag'}"  title="标签"> <i class="iconfont icon-tags"></i> <span>标签</span></a>
                </li>
                <li>
                    <a v-link="{name:'about'}" title="关于"> <i class="iconfont icon-user"></i> <span>关于</span></a>
                </li>
                <!--<li>
                    <a href="/links/" title="友情链接"> <i class="iconfont icon-link"></i> <span>友链</span></a>
                </li>-->
            </ul>
            <ul class="buttons">
                <li>
                    <a class="inline" target=_blank href="{{siteInfo.github_blog.value}}"> <i class="iconfont icon-github-v" title=GitHub></i></a>
                    <a class="inline" href="/rss.html"> <i class="iconfont icon-rss-v" title=RSS></i></a>
                    <a class="inline" href="/search.html"> <i class="iconfont icon-search" title=Search></i></a>
            </ul>
        </div>
    </nav>
</template>

<script>
/* eslint-disable */
import store from '../store/index';

export default {
  data () {
    return {
        siteInfo: {},
    }
  },
  ready (){
    store.fetchOption(this).then(result=>{
      let obj = {};
      result.forEach(value=>{
          obj[value.key] = value;
      });
      this.siteInfo = obj;

      if(this.siteInfo['title']){
          document.title = this.siteInfo['title'].value;
      }
    })
  }

}
</script>
 
<style>
    @import '../assets/res/css/all.css';
    @import '../assets/res/css/article.css';
    @import '../assets/res/css/base.css';
    @import '../assets/res/css/comment.css';
    @import '../assets/res/css/footer.css';
    @import '../assets/res/css/header.css';
    @import '../assets/res/css/highlight.css';
    @import '../assets/res/css/icon.css';
    @import '../assets/res/css/pagination.css';
    @import '../assets/res/css/search.css';
    @import '../assets/res/css/sidebar.css';
    @import '../assets/res/css/responsive.css';
</style>