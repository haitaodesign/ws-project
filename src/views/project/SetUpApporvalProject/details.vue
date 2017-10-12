立项待审批
<template>
  <div>
    <PageTitle :BreadData="breadData"></PageTitle>
    <Row>
      <Col span="4" offset="8">
      <Button type="primary" @click='ok'>通过</Button>
      </Col>
      <Col span="4">
      <Button type="primary" @click="upDown">驳回</Button>
      </Col>
    </Row>
    <Row :gutter='32'>
      <Col span='12'>
      <Tabs class="home-push">
        <TabPane label="基本信息" name="0" style="padding:10px;">
          <ul class='wrap'>
            <li>项目类型：
              <span>{{baseInfo.protype}}</span>
            </li>
            <li>项目标题：
              <span>{{baseInfo.proname}}</span>
            </li>
            <li>项目概况：
              <span>{{baseInfo.prodeclare}}</span>
            </li>
          </ul>
        </TabPane>
      </Tabs>
      </Col>
      <Col span='12'>
      <Tabs class="home-push">
        <TabPane label="项目信息" name="0" style="padding:10px;">
          <ul class='wrap'>
            <li>项目编号：
              <span>{{baseInfo.proid}}</span>
            </li>
            <li>创建时间：
              <span>{{baseInfo.createdate}}</span>
            </li>
            <li>发起人：
              <span>{{baseInfo.creater}}</span>
            </li>
            <li>项目状态：
              <span>{{baseInfo.prostate}}</span>
            </li>
            <li>预计上线时间：
              <span>{{baseInfo.planedate}}</span>
            </li>
            <li>预计下线时间：
              <span>{{baseInfo.plansdate}}</span>
            </li>
            <li>预计工期：
              <span>{{baseInfo.workTatalDay}}</span>
            </li>

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
    <Modal v-model="isUpDown" width="360" :styles="{top: '200px'}">

      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>是否确认驳回</span>
      </p>
      <div style='text-align: center' class='btn'>
        <Button type="primary" style='margin-right: 50px;width:80px;' v-on:click='sure(objectId)'>确定</Button>
        <Button type="error" style='width: 80px;' v-on:click='del()'>取消</Button>
      </div>
      <div slot="footer">

      </div>
    </Modal>
    <modal v-model="isOk" width="360" :styles="{top: '200px'}" >
      <p slot="header" style="color:#666;text-align:center">
        <span>是否确认通过</span>
      </p>
      <div style='text-align: center' class='btn'>
        <Button type="primary" style='margin-right: 50px;width:80px;' v-on:click='confirm(objectId)'>确定</Button>
        <Button type="error" style='width: 80px;' v-on:click='del()'>取消</Button>
      </div>
      <div slot="footer">

      </div>
    </modal>

  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import { getUpDetails } from '../../../api/requestdata'
export default {
  components: {
    PageTitle
  },
  data() {
    return {
      isUpDown: false,
      isOk: false,
      breadData: [{
        name: '项目驳回详情页'
      }],
      columns1: [
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
          key: 'emp'
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
      columns2: [
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
      RecProInfo: [],
      log: [],
      baseInfo: [],
      objectId: []
    }
  },
  created() {
    console.log(this.$route);
    this.initData()
  },
  methods: {
    initData() {
      getUpDetails().then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.RecProInfo = res.data.data[0].taskList;
          this.baseInfo = res.data.data[0].projectInfo;
          this.log = res.data.data[0].logRecordList;
          this.baseInfo.prostate = res.data.data[0].projectInfo.prostate
          this.objectId = {
            proid: res.data.data[0].projectInfo.proid,
            prodeclare: res.data.data[0].projectInfo.prodeclare
          }
          console.log(this.objectId)
          switch(this.baseInfo.prostate){
            case '1':
            this.baseInfo.prostate = '立项待审批';
            break;
             case '2':
            this.baseInfo.prostate = '开发中';
            break;
             case '3':
            this.baseInfo.prostate = '上线待审批';
            break;
             case '4':
            this.baseInfo.prostate = '完成';
            break;
             case '5':
            this.baseInfo.prostate = '驳回';
            break;
             case '6':
            this.baseInfo.prostate = '作废';
            break;
            default:
            this.baseInfo.prostate = '状态数据异常';
          }
        }
      })
    },
    geturl() {
      console.log(this.$route);
    },
    upDown() {
      this.isUpDown = true;

    },
    ok() {
      this.isOk = true;
    },
    sure(name) {
      getUpDetails(this.objectId).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          // window.location.href = '/setupapprvalproject'
          // console.log(this.objectId.proid)
          // if(this.objectId.proid === 1){
          //   this.$router.push('/setupapprvalproject');
          // }else{
          //   console.log("数据异常")
          // }
          this.$router.push('/setupapprvalproject');
          this.$Message.info('已确定驳回');
        }
      })
    },
    del(name) {
      this.isUpDown = false;
      this.isOk = false
      this.$Message.info('点击了取消');
    },
    confirm(name) {
      getUpDetails(this.objectId).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          // window.location.href = '/setupapprvalproject'
          this.$router.push('/setupapprvalproject');
          this.$Message.info('已确定通过');
        }
      })
    },
  
  },

}
</script>
<style scoped>
.wrap li {
  height: 30px;
  line-height: 30px;
  ;
}
</style>
