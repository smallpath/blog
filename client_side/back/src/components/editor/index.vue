<template>
    <div class="md-panel">
        <div class="md-menubar">
            <ul class="md-modebar">
                <li class="tb-btn pull-right">
                    <a class="" title="预览模式"><i class="glyphicon glyphicon-eye-open" ></i></a>
                </li><span> </span>
                <li class="tb-btn pull-right">
                    <a class="" title="分屏模式"><i class="glyphicon glyphicon-adjust" ></i></a>
                </li><span> </span>
                <li class="tb-btn pull-right">
                    <a class="active" title="编辑模式"><i class="glyphicon glyphicon-pencil" ></i></a>
                </li><span> </span>
                <li class="tb-btn spliter pull-right"></li>
                <li class="tb-btn pull-right"><a title="全屏模式"><i class="glyphicon glyphicon-fullscreen" ></i></a></li>
                <span> </span>
            </ul>
            <ul class="md-toolbar clearfix">
                <li class="tb-btn">
                    <a title="加粗(Ctrl + B)"><i class="glyphicon glyphicon-bold" ></i></a>
                </li>
                <li class="tb-btn">
                    <a title="斜体(Ctrl + I)"><i class="glyphicon glyphicon-italic" ></i></a>
                </li>
                <li class="tb-btn spliter"></li>
                <li class="tb-btn">
                    <a title="链接(Ctrl + L)"><i class="glyphicon glyphicon-link" ></i></a>
                </li>
                <li class="tb-btn">
                    <a title="引用(Ctrl + Q)"><i class="glyphicon glyphicon-comment" ></i></a>
                </li>
                <li class="tb-btn">
                    <a title="代码段(Ctrl + K)"><i class="glyphicon glyphicon-console" ></i></a>
                </li>
                <li class="tb-btn">
                    <a title="图片(Ctrl + G)"><i class="glyphicon glyphicon-picture" ></i></a>
                </li>
                <li class="tb-btn spliter"></li>
                <li class="tb-btn">
                    <a title="有序列表(Ctrl + O)"><i class="glyphicon glyphicon-list-alt" ></i></a>
                </li>
                <li class="tb-btn">
                    <a title="无序列表(Ctrl + U)"><i class="glyphicon glyphicon-list" ></i></a>
                </li>
                <li class="tb-btn">
                    <a title="标题(Ctrl + H)"><i class="glyphicon glyphicon-header" ></i></a>
                </li>
                <li class="tb-btn spliter"></li>
                <li class="tb-btn">
                    <a title="插入 more 标签(Ctrl + M)"><i class="glyphicon glyphicon-pushpin" ></i></a>
                </li>
            </ul>
        </div>
        <div class="md-editor expand"><textarea name="content"></textarea></div>
        <div class="md-preview markdown shrink"></div>
        <div class="md-spliter"></div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
  props:{
    shouldTipShow: Boolean,
    type: String,
    text: String,
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limi t CSS to this component only -->
<style scoped>
@import './style.css';
</style>
