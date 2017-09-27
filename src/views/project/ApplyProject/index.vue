<template>
  <div>
      <PageTitle :BreadData="breadData"></PageTitle>
      <Form :label-width="80">
        <Tabs class="apply-baseinfo" >
            <TabPane label="基本信息" name="0">
            <FormItem label="项目名称：">
              <Input placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="项目类型：">
              <Select placeholder="请选择产品类型">
                  <Option value="1">产品</Option>
                  <Option value="2">活动</Option>
              </Select>
            </FormItem>
             <FormItem label="上线时间：">
                  <DatePicker type="datetime" :options="dateOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择上线时间" :transfer="true"></DatePicker>
            </FormItem>
            <FormItem label="下线时间：">
                <DatePicker type="datetime" :options="dateOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择下线时间" :transfer="true"></DatePicker>
            </FormItem>
            <FormItem label="项目概况：">
              <Input type="textarea" :rows="3" placeholder="请输入..."></Input>
            </FormItem>
            </TabPane>
        </Tabs>
        <Tabs class="apply-baseinfo">
            <TabPane label="参与部门" name="0">
              <Button type="primary">添加</Button>
              <Button type="primary">删除</Button>
              <FormItem label="上传附件：">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                  </Upload>
              </FormItem>
            </TabPane>
        </Tabs>
        <Button type="primary">提交</Button>
      </Form>
      <Modal
        v-model="addshow"
        title="普通的Modal对话框标题"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>对话框内容</p>
        <p>对话框内容</p>
        <p>对话框内容</p>
      </Modal>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle';
export default {
  components:{
    PageTitle
  },
  data(){
    return{
        breadData:[{
            name:'申请',
            to:''
        }],
        dateOptions:{
          disabledDate (date) {
              return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        addshow:false
    }
  }
  
}
</script>
<style scoped>
.apply-baseinfo{
  margin-top: 10px;
}
</style>

