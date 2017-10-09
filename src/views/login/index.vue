<template>
    <div class="login-layout">
        <Form ref="loginForm" :model="loginForm" :rules="loginRules"  class="login-form" inline>
            <h1 class="login-title">系统登录</h1>
            <Form-item prop="username">
                <Input type="text" name="username" v-model="loginForm.username"  placeholder="请输入用户名" size="large">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="password">
                <Input type="password" name="password" v-model="loginForm.password" placeholder="请输入密码" size="large">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button type="primary" size="large" :loading="isLoading" @click="handleSubmit('loginForm')">
                    <span v-if="!isLoading">登录</span>
                    <span v-else>Loading...</span>
                </Button>
            </Form-item>
        </Form>  
    </div>
</template>
<script>
import {login} from '../../api/requestdata';
export default {
  data(){
      return{
          loginForm:{
              username:'',
              password:'',
          },
          isLoading:false,
          loginRules:{
              username:[
                  {required:true,message:'请填写用户名',trigger:'blur'}
                  ],
              password:[
                  {required:true,message:'请填写密码',trigger:'blue'},
                  {type:'string',min:5,message:'密码长度不能少于5位',trigger:'blue'}
              ]
          }
      }
  },
  methods:{
        handleSubmit(name){
            this.$refs[name].validate((valid)=>{
                if(valid){
                    this.isLoading=true;
                        login(this.loginForm).then(res=>{
                            this.isLoading=false;
                            let username = res.data.data.userName;
                            sessionStorage.setItem('userName','李海涛');
                            this.$router.push('/');
                        }).catch(err=>{
                            this.$Message.error('系统异常，请重试！');
                        })
                    
                }else{
                    this.$Message.error('表单验证失败！');
                }
            })
        }
  }
}
</script>
<style scoped>
.login-layout{
    width: 100%;
    height: 100%;
    background-color: #495060;
}
.login-form{
    position: absolute;
    width: 525px;
    height: 120px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
}
.login-title{
    color: #fff;
    font-size: 36px;
    margin-bottom: 20px;
}
</style>
