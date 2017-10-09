<template>
    <div  v-if='row.proLogs != 0'>
        <Row class="expand-row">
            
            <Col> 
                <span class="expand-key">动态:</span>
            </Col> 
            <Col span="24" v-for='item in row.subtaskLogs' :key='item.index'>
                <span class="expand-value">{{ item.Emp }}</span>
                <span class="expand-value">{{ item.type }}</span>
            </Col>
        </Row>
    </div>
</template>

<style scoped>
.expand-row{
    margin-bottom: 16px;
}
</style>
<script>
export default {
    props: {
        row: Object
    },
    
};
</script>