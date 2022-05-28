import {post} from '@/service/http'
import {ILoginApi} from './types'

const loginApi: ILoginApi = {
  login(data) {
    return post('/login', data)
  }
}
export default loginApi
