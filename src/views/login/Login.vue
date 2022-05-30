<template>
  <div class="login">
    <Menu title="我是menu" @onTitle="onTitle" ref="menus"></Menu>
  </div>
  <hr/>
  <ul>
    <li v-for="(item,index) in data.list" :key="index">
      {{ item }}
    </li>
  </ul>
  <n-button @click="updateName">
    <!--    <a href="https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.exe" download="jpg">修改store中的name</a>-->
    修改store中的name
  </n-button>
</template>

<script setup lang="ts">
import {NButton} from 'naive-ui'
import {useMainStore} from '@/store/main'
import Menu from '@/components/Menu.vue'
import {reactive, ref} from 'vue'

const mainStore = useMainStore()
const updateName = () => {
  // $patch 修改 store 中的数据
  mainStore.$patch({
    name: '名称被修改了,nameLength也随之改变了'
  })
  //window.open('https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg','haohao')
}
const menus = ref(null)
console.log(menus.value)
type Menu = {
  list?: number[],
  addList?: number[]
}
const data = reactive<Menu>({
  list: [1, 2, 3]
})
const onTitle = (dataList: number[]) => {
  data.list = dataList
  console.log(data.list)
}
</script>

<style scoped>

</style>
