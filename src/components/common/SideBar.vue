<template>
  <div class="sidebar">
   <Menu :theme="themedata" @on-select="change">
        <MenuGroup title="项目">
            <MenuItem name="首页">
                <Icon type="document-text"></Icon>
                首页
            </MenuItem>
            <MenuItem name="申请">
                <Icon type="chatbubbles"></Icon>
                申请
            </MenuItem>
            <MenuItem name="立项待审批">
                <Icon type="chatbubbles"></Icon>
                立项待审批
            </MenuItem>
            <MenuItem name="我的项目">
                <Icon type="chatbubbles"></Icon>
                我的项目
            </MenuItem>
            <MenuItem name="归档项目">
                <Icon type="chatbubbles"></Icon>
                归档项目
            </MenuItem>
            <MenuItem name="驳回项目">
                <Icon type="chatbubbles"></Icon>
                驳回项目
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="统计">
            <MenuItem name="项目统计">
                <Icon type="heart"></Icon>
                项目统计
            </MenuItem>
             <MenuItem name="日报">
                <Icon type="heart"></Icon>
                日报
            </MenuItem>
        </MenuGroup>
   </Menu>
  </div>
</template>
<script>
export default {
  data(){
      return{
          themedata:'dark'
      }
  },
  methods:{
      change(name){
          this.$router.push({name:name});
      }
  }
}
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 240px;
        left: 0;
        top:66px;
        bottom: 0;
        background: #495060;
        overflow-y: auto;
    }
</style>
