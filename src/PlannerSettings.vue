<template>
  <div class="no-print settings">
    <n-form-item label="Number of columns">
      <n-input-number
        :value="store.columns"
        @update:value="(value) => store.setNumberOfColumns(Number(value))"
        max="8"
        min="1"
      />
    </n-form-item>

    <div class="column-definitions">
      <div v-for="index in store.columns">
        <strong>{{ `Column ${index}` }}</strong>

        <n-form-item label="Image">
          <image-input @input:data="(data) => store.setColumnImage(index, data)"></image-input>
        </n-form-item>

        <n-form-item label="Name">
          <n-input
            :value="store.getColumnDefinition(index).name"
            @update:value="(value) => store.setColumnName(index, String(value))"
          />
        </n-form-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useBaseStore } from './store';
import {
  NInput,
  NInputNumber,
  NFormItem,
  NButtonGroup,
  NButton,
  NUpload,
  NUploadTrigger,
  NCard,
  NUploadFileList
} from 'naive-ui';
import { ref } from 'vue';
import ImageInput from './ImageInput.vue';

const store = useBaseStore();
const fileList = ref();
</script>

<style lang="scss" scoped>
.settings {
  background: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  column-gap: 20px;
}

.column-definitions {
  display: flex;
  column-gap: 20px;
}
</style>