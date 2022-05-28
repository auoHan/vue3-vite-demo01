import {PersistOptions} from 'pinia-plugin-persist'

// setup写法
const storeSetup = () => {
  // state
  const name = ref('')
  // getters
  const nameLength = computed(() => {
    return name.value.length
  })
  // action
  const setName = (data: string) => {
    name.value = data
  }
  return {name, nameLength, setName}
}
// 实现持久化缓存
/*
enabled: true 是否开启持久化
strategies: 三个值，
key?: string; 自定义key
storage?: Storage; 存储到哪，可选localStorage和sessionStorage
paths?: string[]; 存储哪些字段，不写则存储所有字段，例如：['name','age']
* */
const storePersist: PersistOptions = {enabled: true, strategies: [{storage: localStorage, paths: ['name']}]}

export const useLoginStore = defineStore('user', storeSetup, {persist: storePersist})


/*
  // 普通常规写法
  export const useLoginStore = defineStore('login', {
  state: () => ({
    name: '超级管理员'
  }),
  // getters
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    async insertPost(data: string) {
      // 可以做异步
      // await doAjaxRequest(data);
      this.name = data
    }
  },
  // 实现持久化缓存
  /!*
  enabled: true 是否开启持久化
  strategies: 三个值，
  key?: string; 自定义key
  storage?: Storage; 存储到哪，可选localStorage和sessionStorage
  paths?: string[]; 存储哪些字段，不写则存储所有字段，例如：['name','age']
  * *!/
  persist: {
    enabled: true,
    strategies: [{storage: localStorage, paths: ['name']}]
  }
})*/
