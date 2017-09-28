<template>
<div class="home">
    <vHeader></vHeader>
    <vSideBar></vSideBar>
    <div class="content">
        <Card shadow>
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
</style>
