import http from '@/service/http'
import * as types from './types'

const loginApi: types.ILoginApi = {
  login(params) {
    return http.post('/login',params)
  }
}
export default loginApi