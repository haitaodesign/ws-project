<template>
  <div>
      <PageTitle :BreadData="breadData"></PageTitle>
      <Row :gutter='32'>
        <Col span='12'>
            <Tabs class="home-push">
                <TabPane label="基本信息" name="0" style="padding:10px;">
                  <ul class='wrap'>
                    <li>项目类型：<span>{{baseInfo.protype}}</span></li>
                    <li>项目标题：<span>{{baseInfo.proname}}</span></li>
                    <li>项目概况：<span>{{baseInfo.prodeclare}}</span></li>
                  </ul>    
                </TabPane>
            </Tabs>
        </Col>
        <Col span='12'> 
            <Tabs class="home-push">
                <TabPane label="项目信息" name="0" style="padding:10px;">
                  <ul class='wrap'>
                    <li>项目编号：<span>{{baseInfo.proid}}</span></li>
                    <li>创建时间：<span>{{baseInfo.createdate}}</span></li>
                    <li>发起人：<span>{{baseInfo.creater}}</span></li>
                    <li>项目状态：<span>{{baseInfo.prostate}}</span></li>
                    <li>预计上线时间：<span>{{baseInfo.planedate}}</span></li>
                    <li>预计下线时间：<span>{{baseInfo.plansdate}}</span></li>
                    <li>预计工期：<span>{{baseInfo.workTatalDay}}</span></li>

                  </ul>    
                </TabPane>
            </Tabs>
      </Col>
    </Row> 
    <Row :gutter='32'>
        <Col span='12'>
            <Tabs class="home-push">
                <TabPane label="日志记录" name="0" style="padding:10px;">
                 <Table border :columns="columns1" :data="log" height="230"></Table>
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
    </Row>     
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import {getselectRecProInfo} from '../../../api/requestdata'

export default {
  components:{
    PageTitle
  },
  data(){
    return{
      breadData:[{
        name:'项目驳回详情页'
      }],
      columns1:[
        {
          title: '类型',
          key: 'proid'
        },
        {
          title: '时间',
          key: 'date'
        },
        {
          title: '操作部门/人',
          key: 'squadid'
        },
        {
          title: '说明',
          key: 'explain'
        },
        {
          title: '附件',
          key: 'filepath'
        },
       ],
      columns2:[
         {
          title: '编号',
          key: 'proid'
        },
        {
          title: '组名称',
          key: 'squadId'
        },
        {
          title: '任务名称',
          key: 'taskname'
        },
        {
          title: '开始时间',
          key: 'sdate'
        },
        {
          title: '结束时间',
          key: 'edate'
        },
        {
          title: '预计工期',
          key: 'workDate'
        }
      ],
      RecProInfo:[],
      log:[],
      baseInfo:[
      ]
    }
  },
  created(){
    console.log(this.$route.params);
    this.initData();
  },
  methods:{
    initData(){
      getselectRecProInfo().then(res=>{
        if(res.data.code === 200){
          this.RecProInfo = res.data.data[0].ProTask;
          this.baseInfo = res.data.data[0].ProInfo;
          this.log = res.data.data[0].ProLogRecord
          console.log(res.data)
        }
      })
    }
  }
}
</script>
<style scoped>
.wrap li{
height: 30px;
line-height: 30px;;
}
</style>

