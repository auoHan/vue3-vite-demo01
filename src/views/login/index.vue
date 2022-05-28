<template>
  <div>用户名:{{ name }}<br/>长度:{{ nameLength }}</div>
  <hr/>
  <el-button @click="updateName">修改store中的name</el-button>
</template>

<script setup lang="ts">
import {useLoginStore} from '@/store/login'

const {name, nameLength} = storeToRefs(useLoginStore())
const {setName} = useLoginStore()
const updateName = () => {
  // 修改 store 中的数据
  setName('名称被修改了,nameLength也随之改变了')
}
console.log(import.meta.env.VITE_APP_WEB_URL)
</script>

<style scoped>

</style>
