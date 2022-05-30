<template>
  <div class="menu">
    <n-button @click="emitTitle">emitTitle</n-button>
  </div>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
import {NButton} from 'naive-ui'
type Props = {
  title?: string,
  age?: number
}
const dataList = reactive<number[]>([4,5,6])
withDefaults(defineProps<Props>(), {
  title: '我是默认值',
  age: 12
})
defineExpose({dataList})
const emit = defineEmits(['onTitle'])
const emitTitle = () => {
  emit('onTitle',dataList)
}
</script>
<style scoped>

</style>
