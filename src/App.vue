<template>
  <div class="outer-container">
    <div class="app-container">
      <div class="action-buttons">
        <CreateActivity @getList="getActivityList" />
        <ViewResult :data="exampleData" :isViewExample="true" />
      </div>
      <el-empty
        v-if="activityList.length === 0"
        description="暂无已保存的活动"
      />
      <el-table v-else :data="activityList" style="width: 100%">
        <el-table-column prop="title" label="活动标题" />
        <el-table-column prop="time" label="时间" width="160" />
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <ViewResult :data="scope.row" />
            <el-button
              @click="removeActivity(scope.$index)"
              type="danger"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import CreateActivity from './components/CreateActivity.vue';
import ViewResult from './components/ViewResult.vue';

// 示例数据
const exampleData = {
  title: '示例活动',
  joiners: [
    '胡晗滢',
    '花晓忆',
    '秋驰陵',
    '秋驰陵',
    '诸冶园',
    '龚壮珍',
    '符朔鼎',
    '廉嫱眉',
    '梅莺望',
    '惠日琴',
  ],
  time: '2024-02-12 17:45',
};
const activityList = ref([]);
// 获取（刷新活动列表）
function getActivityList() {
  let result = localStorage.getItem('activityList') || [];
  if (typeof result === 'string') {
    result = JSON.parse(result);
  }
  activityList.value = result;
}
getActivityList();

// 删除活动
function removeActivity(targetIndex) {
  activityList.value = activityList.value.filter((item, index) => {
    return index != targetIndex;
  });
  localStorage.setItem('activityList', JSON.stringify([...activityList.value]));
}
</script>

<style lang="scss" scoped>
.outer-container {
  height: 100vh;
  padding: 10px 0;
  box-sizing: border-box;
}

.app-container {
  width: 80%;
  max-width: 720px;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: white;
  box-sizing: border-box;
  height: 100%;
  border-radius: 8px;

  .action-buttons {
    display: flex;
    justify-content: space-around;
    margin: 20px 0 40px 0;
  }
}
</style>

<style>
body {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
