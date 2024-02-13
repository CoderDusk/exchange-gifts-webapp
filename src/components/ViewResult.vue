<template>
  <el-button
    @click="dialogVisible = true"
    :plain="isViewExample"
    type="primary"
    :size="isViewExample ? 'default' : 'small'"
    >{{ isViewExample ? '查看示例' : '查看' }}</el-button
  >
  <el-dialog v-model="dialogVisible" append-to-body>
    <el-descriptions
      :border="true"
      :column="1"
      :title="isViewExample ? '查看示例' : '查看结果'"
    >
      <el-descriptions-item label="活动标题" label-class-name="desc-label">{{
        data.title
      }}</el-descriptions-item>
      <el-descriptions-item label="创建时间" label-class-name="desc-label">{{
        data.time
      }}</el-descriptions-item>
      <el-descriptions-item label="匹配结果" label-class-name="desc-label">
        <div class="result">
          <div class="result1">{{ result1 }}</div>
          <hr />
          <div class="result2" v-for="(item, index) in result2" :key="index">
            {{ item }}
          </div>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
const { data, isViewExample } = defineProps({
  data: Object,
  isViewExample: {
    type: Boolean,
    default: false,
  },
});
const dialogVisible = ref(false);

const result1 = data.joiners.join(' -> ');
let result2 = [];
for (let i = 0; i < data.joiners.length; i++) {
  result2.push(
    data.joiners[i] +
      ' -> ' +
      (i === data.joiners.length - 1 ? data.joiners[0] : data.joiners[i + 1])
  );
}
</script>

<style lang="scss">
.desc-label {
  width: 80px;
}
</style>
