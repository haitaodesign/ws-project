<template>
<div class="home">
    <vHeader></vHeader>
    <vSideBar></vSideBar>
    <div class="content">
        <Card class="content-card" shadow>
            <router-view></router-view>
        </Card>
    </div>
</div>
</template>
<script>
import vHeader from './Header'
import vSideBar from './SideBar'
export default {
    name:'home',
    data(){
        return{
        }
    },
    components:{
        vHeader,vSideBar
    }
    
}
</script>
<style scoped>
.content-card{
    height: 100%;
}
</style>
