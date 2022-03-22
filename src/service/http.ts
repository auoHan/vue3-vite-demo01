import axios, {AxiosRequestConfig} from 'axios'
import nProgress from 'nprogress'

// 设置请求头和请求路径
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use((config): AxiosRequestConfig<any> => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      // @ts-ignore
      config.headers.token = token
    }
    return config
  },
  (error => {
    return error
  })
)

// 响应拦截
axios.interceptors.response.use((res) => {
  if (res.data.code === 111) {
    sessionStorage.setItem('token', '')
    // token过期操作
  }
  return res
})

interface ResType<T> {
  code: number
  data?: T
  msg: string
  err?: string
}

interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>

  post<T>(url: string, params?: unknown): Promise<ResType<T>>

  upload<T>(url: string, params?: unknown): Promise<ResType<T>>

  download(url: string): void
}

const http: Http = {
  async get(url, params) {
    nProgress.start()
    try {
      const result = await axios.get(url, {params})
      nProgress.done()
      return result.data
    } catch (e: any) {
      nProgress.done()
      return e.msg
    }
  },
  async post(url, params) {
    nProgress.start()
    try {
      const result = await axios.post(url, JSON.stringify(params))
      nProgress.done()
      return result.data
    } catch (e:any) {
      nProgress.done()
      return e.msg
    }
  },
  async upload(url,file){
    nProgress.start()
    try {
      const result = await axios.post(url,file,{headers:{'Content-Type':'multipart/form-data'}})
      nProgress.done()
      return result.data
    }catch (e:any) {
      return e.msg
    }
  },
  async download(url){
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  }
}
export default http