<template>
<div class="header">
    <div class="header-logo">
        <span>项目管理系统</span>
    </div>
    <div class="header-right">
        <Dropdown @on-click="handleLogout()">
            <a href="javascript:void(0)">
                {{userName}}
                <Icon type="arrow-down-b"></Icon>
            </a>
            <Dropdown-menu slot="list" >
                <Dropdown-item>修改密码</Dropdown-item>
                <Dropdown-item name="Logout">退出登录</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
    </div>
</div>
  
</template>
<script>
export default {
    data(){
        return{
            userName:sessionStorage.getItem('userName')
        }
    },
    mounted(){
    },
    methods:{
        handleLogout(name){
            sessionStorage.clear();
            this.$router.push('/Login');
        }
    }
}
</script>
<style scoped>
.header{
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: 66px;
    border-bottom: 1px solid #fff;
    background: #495060;
    z-index: 1000;
}
.header-logo{
    width: 240px;
    height: 66px;
    float: left;
    text-align: center;
    line-height: 66px;
    color: rgba(255, 255, 255, .8);
    font-size: 24px;
}

.header-right{
    display: block;
    float: right;
    line-height: 66px;
    margin-right: 40px;
    font-size: 16px;
}
</style>
