<template>
    <div>
        <PageTitle :BreadData="breadData"></PageTitle>
    </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
export default {
   data(){
       return{
         breadData:[{
           name:'首页',
           to:'/'
         }]
       }
   },
   components:{
        PageTitle
   }
}
</script>
<style scoped>

</style>

