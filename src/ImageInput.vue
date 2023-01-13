<template>
  <div class="image-input" :style="{ 'background-image': `url(${imageData})` }" @click="chooseImage">
    <span v-if="!imageData" class="placeholder">Choose an Image</span>

    <input
      class="file-input"
      ref="fileInput"
      type="file"
      @input="onSelectFile"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fileInput = ref<HTMLInputElement>();
const imageData = ref();
const emit = defineEmits(['input', 'input:data']);

const chooseImage = () => {
  fileInput.value?.click();
};

const onSelectFile = () => {
  const input = fileInput.value!;
  const files = input.files;

  if (files && files[0]) {
    const reader = new FileReader;

    reader.onload = e => {
      imageData.value = e.target?.result;
      emit('input:data', imageData.value);
    };

    reader.readAsDataURL(files[0]);
    emit('input', files[0]);
  }
};
</script>

<style scoped>
.image-input {
  display: block;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.placeholder {
  background: #F0F0F0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
}

.placeholder:hover {
  background: #E0E0E0
}

.file-input {
  display: none;
}
</style>