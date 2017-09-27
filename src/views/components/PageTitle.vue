<template>
    <div class="pagetitle">
        <Breadcrumb>
            <Breadcrumb-item v-for="item in data" :href="item.to" :key="item.index">{{item.name}}</Breadcrumb-item>
        </Breadcrumb>
    </div>
</template>
<script>
export default {
    props:['BreadData'],
    data(){
        return{
            data:this.BreadData
        }
    }
}
</script>
<style scoped>
.pagetitle{
    clear: both;
}
</style>
