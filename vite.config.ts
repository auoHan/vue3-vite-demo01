import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import viteCompression from 'vite-plugin-compression'
import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
// https://vitejs.dev/config/
export default defineConfig({
  base: './', //打包路径
  plugins: [
    vue(),
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // 自动引入
    autoImport({
      imports: ['vue', 'vue-router', 'pinia'], // 自动导入vue和vue-router和pinia相关函数
      resolvers: [
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
          importStyle: 'sass',
        }),
      ],
      dts: 'src/auto-import.d.ts', // 生成 `auto-import.d.ts` 全局声明
    }),
    // 自动引入组件，包括element和components的组件
    Components({
      dts: true,
      // 因为使用了 unplugin-vue-components 插件，
      // 要写上这个，组件里才能用<router-link/> <router-view/>,其他配置看插件npm用法
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      resolvers: [
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式
          importStyle: 'sass',
        }),
      ],
    }),
    // svg插件
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    //css预处理
    preprocessorOptions: {
      scss: {
        /*
        引入var.scss全局预定义变量，
        如果引入多个文件，
        可以使用
        '@import "@/assets/styles/globalVariable1.scss";@import "@/assets/styles/globalVariable2.scss";'
        这种格式

        scss团队推荐使用@use "@/assets/styles/variables.scss" as *; 这种引入,不推荐@import ,是因为scss将来会删除@import这种引入方法
        as * 代表全局,可以直接写$xxx
        as v代表定义命名空间,v是名字,使用的时候需要c.$xxx或者c.xxx等等
         */
        additionalData: `@use "@/assets/styles/variables.scss" as v;@use "@/assets/styles/mixins.scss" as m;@use "@/assets/styles/element/index.scss" as *;`,
      },
    },
  },
  //启动服务配置
  server: {
    host: '0.0.0.0',
    port: 8000,
    open: true,
    https: false,
    proxy: {}
  },
  // 生产环境打包配置
  //去除 console debugger
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
