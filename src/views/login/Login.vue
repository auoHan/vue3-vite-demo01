<template>
  <div>{{ mainStore.name }}</div>
</template>

<script setup lang="ts">
import {useMainStore} from '@/store/main'
const mainStore = useMainStore()
</script>

<style scoped>

</style>