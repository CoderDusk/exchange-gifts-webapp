<template>
  <el-button @click="createActivityDialogVisible = true" type="primary">{{
    $t('create.title')
  }}</el-button>

  <el-dialog
    v-model="createActivityDialogVisible"
    :title="$t('create.title')"
    width="500"
    :fullscreen="isMobile"
  >
    <el-form :model="createActivityForm" label-width="100px">
      <el-form-item :label="$t('create.form.title')">
        <el-input
          v-model="createActivityForm.title"
          :placeholder="$t('create.form.titlePlaceholder')"
        />
      </el-form-item>
      <el-form-item :label="$t('create.form.joiners')">
        <div class="joiners-input">
          <div class="input">
            <el-input
              v-model="createActivityForm.joinerInput"
              :placeholder="$t('create.form.joinersPlaceholder')"
              @keyup.enter="addJoiner"
            />
            <el-button @click="addJoiner" class="button" type="primary">{{
              $t('create.form.add')
            }}</el-button>
          </div>
          <el-empty
            v-if="createActivityForm.joiners.length === 0"
            :image-size="100"
            :description="$t('create.form.noJoinerTips')"
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
        <el-button type="primary" @click="createActivity">{{
          $t('create.form.create')
        }}</el-button>
        <el-button @click="cancelSubmit">{{
          $t('create.form.cancel')
        }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { dayjs } from 'element-plus';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['getList']);
const { t } = useI18n();

const userAgent = navigator.userAgent;
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );

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
    return ElMessage.error(t('tips.atLeastThreeJoiners'));
  }

  delete createActivityForm.value.joinerInput;
  if (createActivityForm.value.title.trim() === '') {
    createActivityForm.value.title =
      dayjs().format('YYYY-MM-DD HH:mm') + t('create.titlePadding');
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
    return ElMessage.error(t('tips.inputJoner'));
  }

  const isIncluded = createActivityForm.value.joiners.includes(
    createActivityForm.value.joinerInput
  );
  if (isIncluded) {
    createActivityForm.value.joinerInput = '';
    return ElMessage.error(t('tips.duplicateJoiner'));
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
