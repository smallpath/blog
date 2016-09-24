<template>
      <Select
          combobox
          style={{width: '100%'}}
          placeholder="请输入文章标题"
          notFoundContent="暂无结果"
          onChange={this.fetchData}
          onSelect={this.props.onSelect}
          filterOption={false}
          showArrow={false}
          dropdownStyle={{zIndex: 10000}}
      >
        <Option v-for="opt in options" value={opt.pathname}>{{opt.title}}</Option>
      </Select>
</template>

<script>
/* eslint-disable */
export default {
  props:{
    shouldTipShow: Boolean,
    tipType: String,
    tipInfo: String,
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
