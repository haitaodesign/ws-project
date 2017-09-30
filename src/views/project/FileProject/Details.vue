<template>
  <div>
     <PageTitle :BreadData="breadData"></PageTitle>
      <Row :gutter='32'>
        <Col span='12'>
            <Tabs class="home-push">
                <TabPane label="基本信息" name="0" style="padding:10px;">
                  <ul class='wrap'>
                    <li>项目类型：<span></span></li>
                    <li>项目标题：<span></span></li>
                    <li>项目概况：<span></span></li>
                  </ul>    
                </TabPane>
            </Tabs>
        </Col>
        <Col span='12'> 
            <Tabs class="home-push">
                <TabPane label="项目信息" name="0" style="padding:10px;">
                  <ul class='wrap'>
                    <li>项目编号：<span></span></li>
                    <li>创建时间：<span></span></li>
                    <li>发起人：<span></span></li>
                    <li>项目状态：<span></span></li>
                    <li>预计上线时间：<span></span></li>
                    <li>预计下线时间：<span></span></li>
                    <li>预计工期：<span></span></li>

                  </ul>    
                </TabPane>
            </Tabs>
      </Col>
    </Row> 
    <!-- <Row :gutter='32'>
        <Col span='12'>
            <Tabs class="home-push">
                <TabPane label="日志记录" name="0" style="padding:10px;">
                 <Table border :columns="columns1" :data="log"></Table>
                </TabPane>
            </Tabs>
        </Col>
        <Col span='12'> 
            <Tabs class="home-push">
                <TabPane label="参与组" name="0" style="padding:10px;">
                 <Table border :columns="columns2" :data="RecProInfo"></Table>
                </TabPane>
            </Tabs>
      </Col>
    </Row>      -->
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import {getselectRecPro} from '../../../api/requestdata'
export default {
  components:{
    PageTitle
  },
  data(){
    return{
      breadData:[{
        name:'归档项目详情页'
      }],
      columns1:[
        {

        }
      ]
    }
  },
  created(){
    this.initData()
  },
  methods:{
    initData(){
      getselectRecPro().then(res=>{
        console.log(res.data)
        if(res.data.code === 200){
          console.log(res.data)
        }
      })
    }
  }
}
</script>

