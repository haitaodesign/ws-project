立项待审批
<template>
  <div>
    <PageTitle :BreadData="breadData"></PageTitle>
    <Row>
      <Col span="4" offset="8">
      <Button type="primary" @click='comit'>通过</Button>
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

    <!-- <Modal v-model="isUpDown" :styles="{top: '200px'}" @on-ok="ok" @on-cancel="cancel" width="600">
      <h2 style='color:#000;margin-bottom:10px;'>项目驳回</h2>
      <Form  :model="params"  :label-width="110">
          <FormItem label="请输入驳回的原因">
              <Input v-model="params.explain" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
          </FormItem>

      </Form>
  </Modal>
  <Modal v-model="isOk" :styles="{top: '200px'}" @on-ok="ok" @on-cancel="cancel" width="600">

    <h2 style='color:#000;margin-bottom:10px;'>项目通过</h2>
    <Form  :model="params"  :label-width="110">
       <FormItem label="请输入通过的原因">
            <Input v-model="params.explain" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </FormItem>

    </Form>
  </Modal> -->

  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import { getUpDetails } from '../../../api/requestdata'
import {getUpProjectList} from '../../../api/requestdata'
import {getpassOrReject} from '../../../api/requestdata'
export default {
  components: {
    PageTitle
  },
  data() {

    return {
      isUpDown: false,
      isOk: false,
      breadData: [{
        name: '立项待审批详情页'
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
      objectId:{
        proid:'',
        id:'',
        creatName:'小',
        explain:'',
        prostate:''
      },
      params:[]
    }
  },
  created() {
    console.log(this.$route);
    this.initData()
    console.log(this.params)
  },
  methods: {
    initData() {
      const params = {
        id:this.$route.params.id,
        proId:this.$route.query.proId
      }
      getUpDetails(params).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.RecProInfo = res.data.data[0].taskList;
          this.baseInfo = res.data.data[0].projectInfo;
          this.log = res.data.data[0].logRecordList;
          this.baseInfo.prostate = res.data.data[0].projectInfo.prostate;
          this.params.push({
            prostate:res.data.data[0].projectInfo.prostate,
            id:res.data.data[0].projectInfo.id,
            proId:res.data.data[0].projectInfo.proid
          })
          // console.log(this.params)
          // this.objectId = {
          //   proid: res.data.data[0].projectInfo.proid,
          //   prostate: res.data.data[0].projectInfo.prostate,
          //   id:res.data.data[0].projectInfo.id
          // }
          // console.log(this.objectId)
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
      // this.isUpDown = true;
      
     
     
       this.$Modal.confirm({
        
        
        onOk: () => {
          this.$Message.info('点击了确定');
          console.log(this.params)
           getUpDetails(this.params).then(res => {
              if(res.data.code === 200){
                console.log(res.data)
              }
          })
        },
        onCancel: () => {
          this.$Message.info('点击了取消');
        },
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              autofocus: true,
              type: 'textarea',
              rows: 4,
              placeholder: '请输入驳回的理由...'
            },
            on: {
              input: (val) => {
                this.params.explain = val;
               

              }

            },
            cancel: {
              input: (val) => {
                this.params.explain = val;
              }
            }
          })
        }
      });

    },
    comit() {
      
      
       this.$Modal.confirm({
        
        
        onOk: () => {
          this.$Message.info('点击了确定');
        },
        onCancel: () => {
          this.$Message.info('点击了取消');
        },
         render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              autofocus: true,
              type: 'textarea',
              rows: 4,
              placeholder: '请输入通过的理由...'
            },
            on: {
              input: (val) => {
                this.params.explain = val;
               

              }

            },
            cancel: {
              input: (val) => {
                this.params.explain = val;
              }
            }
          })
        }
      });
      
    },
    sure(name) {
      getUpProjectList(this.objectId).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          // window.location.href = '/setupapprvalproject'
          // console.log(this.objectId.proid)
          // if(this.objectId.proid === 1){
          //   this.$router.push('/setupapprvalproject');
          // }else{
          //   console.log("数据异常")
          // }
         
          this.initData();
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
      getUpProjectList(this.objectId).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          // window.location.href = '/setupapprvalproject'
          this.$router.push('/setupapprvalproject');
          this.$Message.info('已确定通过');
        }
      })
    },
    ok() {
      this.$Message.info('点击了确定');
      getpassOrReject(this.objectId).then(res => {
        console.log(res.data)
        
        if (res.data.code === 200) {
          // window.location.href = '/setupapprvalproject'
          // console.log(this.objectId.proid)
          // if(this.objectId.proid === 1){
          //   this.$router.push('/setupapprvalproject');
          // }else{
          //   console.log("数据异常")
          // }
          // this.$router.push('/setupapprvalproject');
          // this.isOk = false;

          this.initData();

        }
      })
    },
    cancel() {
      this.$Message.info('点击了取消');
    }
  
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
