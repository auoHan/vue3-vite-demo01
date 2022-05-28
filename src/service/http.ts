//http.ts
import axios, {AxiosRequestConfig} from 'axios'

/*if (process.env.NODE_ENV==='development'){
  axios.defaults.baseURL = 'http://110.42.184.111'
}else if (process.env.NODE_ENV==='production'){
  axios.defaults.baseURL = 'http://110.42.184.111'
}*/
// 设置请求头和请求路径
// 此处写/api或者别的
// 开发环境在vite.config.ts里配置了proxy
// 生产环境在nginx 里配置了 /api ...
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截
axios.interceptors.response.use((response) => {
  return response.data
}, error => {
  return Promise.reject(error)
})

interface ResType<T> {
  code: number
  data?: T
  msg: string
  err?: string
}

export const get = <T>(url: string, params?: unknown): Promise<ResType<T>> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {params})
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

export const post = <T>(url: string, data?: unknown): Promise<ResType<T>> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, JSON.stringify(data))
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

export const upload = <T>(url: string, file: unknown): Promise<ResType<T>> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, file, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

export const download = (url: string): void => {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}


/*
// 默认全部导出写法
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>

  post<T>(url: string, data?: unknown): Promise<ResType<T>>

  upload<T>(url: string, file: unknown): Promise<ResType<T>>

  download(url: string): void
}


const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {params})
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, JSON.stringify(data))
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, file, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },
  download(url) {
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = url
    iframe.onload = function () {
      document.body.removeChild(iframe)
    }
    document.body.appendChild(iframe)
  },
}
export default http
*/
