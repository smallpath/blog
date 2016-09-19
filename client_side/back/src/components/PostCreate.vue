<template>
    <div class="fk-content-wrap">
        <top :current-route="currentRoute"></top>
        <div class="manage-container">
            <form action="#" class="post-create clearfix">
                <div class="row">
                    <div class="col-xs-9">
                        <div class="form-group"><label class="control-label"><span >撰写文章</span></label>
                            <input name="title" placeholder="标题" label="撰写文章" value="" class="form-control" type="text"></div>
                        <div class="pathname"><span>https://smallpath.me/post/</span>
                            <div class="form-group"><input name="pathname" value="" class="form-control" type="text"></div><span>.html</span></div>
                        <div class="form-group">
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
                            <p style="line-height:30px;"><span>文章使用 markdown 格式，格式说明请见</span><a href="https://guides.github.com/features/mastering-markdown/"
                                    target="_blank">这里</a></p>
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <div class="button-group"><button type="submit" class="btn btn-default">保存草稿</button>
                            <span> </span><button type="submit" class="btn btn-primary">发布文章</button></div>
                        <div style="margin-bottom:15px;"><label>发布日期</label>
                            <div>
                                <div class="rdt "><input class="form-control" value="" type="text">
                                    <div class="rdtPicker">
                                        <div class="rdtDays">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th class="rdtPrev"><button type="button">‹</button></th>
                                                        <th class="rdtSwitch" colspan="5" data-value="8">九月 2016</th>
                                                        <th class="rdtNext"><button type="button">›</button></th>
                                                    </tr>
                                                    <tr>
                                                        <th class="dow">一</th>
                                                        <th class="dow">二</th>
                                                        <th class="dow">三</th>
                                                        <th class="dow">四</th>
                                                        <th class="dow">五</th>
                                                        <th class="dow">六</th>
                                                        <th class="dow">日</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td data-value="29" class="rdtDay rdtOld">29</td>
                                                        <td data-value="30" class="rdtDay rdtOld">30</td>
                                                        <td data-value="31" class="rdtDay rdtOld">31</td>
                                                        <td data-value="1" class="rdtDay">1</td>
                                                        <td data-value="2" class="rdtDay">2</td>
                                                        <td data-value="3" class="rdtDay">3</td>
                                                        <td data-value="4" class="rdtDay">4</td>
                                                    </tr>
                                                    <tr>
                                                        <td data-value="5" class="rdtDay">5</td>
                                                        <td data-value="6" class="rdtDay">6</td>
                                                        <td data-value="7" class="rdtDay">7</td>
                                                        <td data-value="8" class="rdtDay">8</td>
                                                        <td data-value="9" class="rdtDay">9</td>
                                                        <td data-value="10" class="rdtDay">10</td>
                                                        <td data-value="11" class="rdtDay">11</td>
                                                    </tr>
                                                    <tr>
                                                        <td data-value="12" class="rdtDay">12</td>
                                                        <td data-value="13" class="rdtDay">13</td>
                                                        <td data-value="14" class="rdtDay">14</td>
                                                        <td data-value="15" class="rdtDay">15</td>
                                                        <td data-value="16" class="rdtDay">16</td>
                                                        <td data-value="17" class="rdtDay">17</td>
                                                        <td data-value="18" class="rdtDay">18</td>
                                                    </tr>
                                                    <tr>
                                                        <td data-value="19" class="rdtDay rdtToday">19</td>
                                                        <td data-value="20" class="rdtDay">20</td>
                                                        <td data-value="21" class="rdtDay">21</td>
                                                        <td data-value="22" class="rdtDay">22</td>
                                                        <td data-value="23" class="rdtDay">23</td>
                                                        <td data-value="24" class="rdtDay">24</td>
                                                        <td data-value="25" class="rdtDay">25</td>
                                                    </tr>
                                                    <tr>
                                                        <td data-value="26" class="rdtDay">26</td>
                                                        <td data-value="27" class="rdtDay">27</td>
                                                        <td data-value="28" class="rdtDay">28</td>
                                                        <td data-value="29" class="rdtDay">29</td>
                                                        <td data-value="30" class="rdtDay">30</td>
                                                        <td data-value="1" class="rdtDay rdtNew">1</td>
                                                        <td data-value="2" class="rdtDay rdtNew">2</td>
                                                    </tr>
                                                    <tr>
                                                        <td data-value="3" class="rdtDay rdtNew">3</td>
                                                        <td data-value="4" class="rdtDay rdtNew">4</td>
                                                        <td data-value="5" class="rdtDay rdtNew">5</td>
                                                        <td data-value="6" class="rdtDay rdtNew">6</td>
                                                        <td data-value="7" class="rdtDay rdtNew">7</td>
                                                        <td data-value="8" class="rdtDay rdtNew">8</td>
                                                        <td data-value="9" class="rdtDay rdtNew">9</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td colspan="7" class="rdtTimeToggle">00:00:00</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group"><label class="control-label">分类</label>
                            <ul>
                                <li><label><input name="cate" value="1"  type="checkbox"><span style="font-weight:normal;" >前端</span></label></li>
                                <li><label><input name="cate" value="2"  type="checkbox"><span style="font-weight:normal;" >Node.js</span></label></li>
                                <li><label><input name="cate" value="3"  type="checkbox"><span style="font-weight:normal;" >后期</span></label></li>
                                <li><label><input name="cate" value="4"  type="checkbox"><span style="font-weight:normal;" >三维</span></label></li>
                            </ul>
                        </div>
                        <div class="form-group"><label class="control-label">标签</label>
                            <div><span style="width:100%;" class="rc-select rc-select-enabled"><span class="rc-select-selection rc-select-selection--multiple" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false" ><ul class="rc-select-selection__rendered" ><li class="rc-select-search rc-select-search--inline" ><span class="rc-select-search__field__wrap" ><input value="" class="rc-select-search__field" role="textbox" ></span></li>
                                </ul>
                                </span>
                                </span>
                            </div>
                        </div>
                        <div class="form-group"><label class="control-label">公开度</label>
                            <div class="col-xs-12 is-public-radiogroup">
                                <div class="">
                                    <div class="radio"><label class=""><input value="1" label="公开" checked="" name="is_public" class=""  type="radio"><span >公开</span></label></div>
                                </div>
                                <div class="">
                                    <div class="radio"><label class=""><input value="0" label="不公开" name="is_public" class=""  type="radio"><span >不公开</span></label></div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group"><label class="control-label">权限控制</label>
                            <div><label><input name="allow_comment" checked=""  type="checkbox"><span >允许评论</span></label></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Top from './Top';

export default {

  components: {
    Top,
  },
  props:{
    shouldTipShow: Boolean,
    type: String,
    text: String,
    currentRoute: String,
  },
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limi t CSS to this component only -->
<style scoped>
    h1 {
        color: #42b983;
    }
</style>