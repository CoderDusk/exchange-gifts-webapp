<template>
  <div class="outer-container" :class="{ desktop: !isMobile }">
    <div class="app-container">
      <div class="action-buttons">
        <CreateActivity @getList="getActivityList" />
        <ViewResult :data="exampleData" :isViewExample="true" />
      </div>
      <el-empty
        v-if="activityList.length === 0"
        :description="$t('tips.noSaved')"
      />
      <el-table v-else :data="activityList" style="width: 100%">
        <el-table-column prop="title" :label="$t('list.title')" />
        <el-table-column prop="time" :label="$t('list.time')" width="160" />
        <el-table-column :label="$t('list.action')" width="160">
          <template #default="scope">
            <ViewResult :data="scope.row" />
            <el-button
              @click="removeActivity(scope.$index)"
              type="danger"
              size="small"
              >{{ $t('list.delete') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import CreateActivity from './components/CreateActivity.vue';
import ViewResult from './components/ViewResult.vue';

const { t } = useI18n();

const userAgent = navigator.userAgent;
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );

// 示例数据
const exampleData = {
  title: t('exampleData.title'),
  joiners: JSON.parse(t('exampleData.joiners')),
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
  box-sizing: border-box;
}

.app-container {
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

.desktop {
  padding: 10px 0;

  .app-container {
    width: 80%;
    max-width: 720px;
    margin: 0 auto;
  }
}
</style>

<style>
body {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
