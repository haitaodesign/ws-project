<template>
    <div>
        <PageTitle :BreadData="breadData"></PageTitle>
        <Tabs class="home-push">
            <TabPane label="项目推送" name="0">
                <Row>
                    <Col span="4">
                        <Card dis-hover>
                            <p slot="title" class="home-center">我申请的项目</p>
                            <div class="home-center">
                                 <span></span>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
         <Tabs class="home-tip">
            <TabPane label="逾期提醒" name="0">
                <Row>
                    <Col>
                        
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
        
    </div>
</template>
<script>
import PageTitle from '../../components/PageTitle';
import {getHomeData} from '../../../api/requestdata';
export default {
    components:{
        PageTitle
    },
    data(){
        return{
            breadData:[{
            name:'首页',
            to:'/'
            }],
            homeData:null
        }
    },
    created(){
        getHomeData().then(res=>{
            if(res.data.code==200){
                this.homeData=res.data.data[0];
            }
        })
    }
}
</script>
<style scoped>
.home-push{
    margin-top: 10px;
}
.home-center{
    text-align: center;
}
</style>

