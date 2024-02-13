<template>
  <el-button @click="createActivityDialogVisible = true" type="primary"
    >创建活动</el-button
  >

  <el-dialog v-model="createActivityDialogVisible" title="创建活动" width="500">
    <el-form :model="createActivityForm" label-width="80px">
      <el-form-item label="活动标题">
        <el-input
          v-model="createActivityForm.title"
          placeholder="请输入活动标题"
        />
      </el-form-item>
      <el-form-item label="参与人">
        <div class="joiners-input">
          <div class="input">
            <el-input
              v-model="createActivityForm.joinerInput"
              placeholder="请输入参与人"
              @keyup.enter="addJoiner"
            />
            <el-button @click="addJoiner" class="button" type="primary"
              >添加</el-button
            >
          </div>
          <el-empty
            v-if="createActivityForm.joiners.length === 0"
            :image-size="100"
            description="请添加活动参与者"
          />
          <div v-else class="list">
            <el-tag
              v-for="(joiner, index) in createActivityForm.joiners"
              :key="index"
              closable
              @close="removeJoiner(index)"
              class="joiner-item"
            >
              {{ joiner }}
            </el-tag>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createActivity">创建</el-button>
        <el-button @click="cancelSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { dayjs } from 'element-plus';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const emit = defineEmits(['getList']);

// 创建活动
const createActivityDialogVisible = ref(false);
const createActivityForm = ref({
  title: '',
  joiners: [],
  id: '',
  joinerInput: '',
  time: '',
});

function createActivity() {
  if (createActivityForm.value.joiners.length <= 2) {
    return ElMessage.error('参与者至少要有三人');
  }

  delete createActivityForm.value.joinerInput;
  if (createActivityForm.value.title.trim() === '') {
    createActivityForm.value.title =
      dayjs().format('YYYY-MM-DD HH:mm') + ' 创建的活动';
  }
  createActivityForm.value.id = dayjs().valueOf();
  createActivityForm.value.time = dayjs().format('YYYY-MM-DD HH:mm');
  createActivityForm.value.joiners = createActivityForm.value.joiners.sort(
    () => Math.random() - 0.5
  );
  let activityList = localStorage.getItem('activityList') || [];
  if (typeof activityList === 'string') {
    activityList = JSON.parse(activityList);
  }
  activityList.push(createActivityForm.value);
  localStorage.setItem('activityList', JSON.stringify(activityList));
  emit('getList');
  resetFrom();
  createActivityDialogVisible.value = false;
}

function cancelSubmit() {
  resetFrom();
  createActivityDialogVisible.value = false;
}

function addJoiner() {
  if (createActivityForm.value.joinerInput.trim() === '') {
    return ElMessage.error('请输入参与人');
  }

  const isIncluded = createActivityForm.value.joiners.includes(
    createActivityForm.value.joinerInput
  );
  if (isIncluded) {
    createActivityForm.value.joinerInput = '';
    return ElMessage.error('请勿重复添加');
  }
  createActivityForm.value.joiners.push(createActivityForm.value.joinerInput);
  createActivityForm.value.joinerInput = '';
}

function removeJoiner(index) {
  createActivityForm.value.joiners.splice(index, 1);
}

function resetFrom() {
  createActivityForm.value.title = '';
  createActivityForm.value.joiners = [];
  createActivityForm.value.id = '';
  createActivityForm.value.joinerInput = '';
  createActivityForm.value.time = '';
}
</script>

<style lang="scss" scoped>
.joiners-input {
  width: 100%;

  .input {
    display: flex;
    justify-content: space-between;

    .button {
      margin-left: 10px;
    }
  }

  .list {
    margin-top: 10px;

    .joiner-item {
      margin-right: 10px;
    }
  }
}
</style>
